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
}