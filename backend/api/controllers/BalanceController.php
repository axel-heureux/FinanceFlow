<?php
class BalanceController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getBalance() {
        try {
            // Récupère le solde initial et courant depuis la base
            $query = "SELECT initial_balance, current_balance FROM account_balance WHERE user_id = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            $balanceRow = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$balanceRow) {
                return [
                    "success" => false,
                    "message" => "Solde non trouvé"
                ];
            }

            return [
                "success" => true,
                "data" => floatval($balanceRow['current_balance']),
                "initial_balance" => floatval($balanceRow['initial_balance'])
            ];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }

    public function updateInitialBalance($data) {
        try {
            $this->conn->beginTransaction();

            $newInitialBalance = $data['initial_balance'];
            
            // Récupérer l'ancien solde initial
            $getQuery = "SELECT initial_balance, current_balance FROM account_balance WHERE user_id = 1";
            $getStmt = $this->conn->prepare($getQuery);
            $getStmt->execute();
            $currentData = $getStmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$currentData) {
                // Si aucun enregistrement n'existe, on le crée
                $insertQuery = "INSERT INTO account_balance (user_id, initial_balance, current_balance) VALUES (1, :initial_balance, :initial_balance)";
                $insertStmt = $this->conn->prepare($insertQuery);
                $insertStmt->bindParam(':initial_balance', $newInitialBalance);
                
                if ($insertStmt->execute()) {
                    $this->conn->commit();
                    return [
                        "success" => true,
                        "message" => "Solde initial défini avec succès",
                        "data" => [
                            "initial_balance" => floatval($newInitialBalance),
                            "current_balance" => floatval($newInitialBalance)
                        ]
                    ];
                }
            } else {
                // Calculer la différence pour ajuster le solde courant
                $oldInitialBalance = floatval($currentData['initial_balance']);
                $currentBalance = floatval($currentData['current_balance']);
                $difference = $newInitialBalance - $oldInitialBalance;
                $newCurrentBalance = $currentBalance + $difference;

                // Mettre à jour les soldes
                $updateQuery = "UPDATE account_balance 
                              SET initial_balance = :initial_balance, 
                                  current_balance = :current_balance 
                              WHERE user_id = 1";
                $updateStmt = $this->conn->prepare($updateQuery);
                $updateStmt->bindParam(':initial_balance', $newInitialBalance);
                $updateStmt->bindParam(':current_balance', $newCurrentBalance);

                if ($updateStmt->execute()) {
                    $this->conn->commit();
                    return [
                        "success" => true,
                        "message" => "Solde initial mis à jour avec succès",
                        "data" => [
                            "initial_balance" => floatval($newInitialBalance),
                            "current_balance" => floatval($newCurrentBalance)
                        ]
                    ];
                }
            }

            $this->conn->rollBack();
            return ["success" => false, "message" => "Erreur lors de la mise à jour du solde initial"];
        } catch (PDOException $e) {
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}