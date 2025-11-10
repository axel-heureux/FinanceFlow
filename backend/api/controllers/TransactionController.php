<?php
class TransactionController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        try {
            $query = "SELECT t.id, t.title, t.amount, t.transaction_date as date, t.location, t.description, t.category_id, t.subcategory_id, c.name as category_name, s.name as subcategory_name 
                     FROM transactions t 
                     LEFT JOIN categories c ON t.category_id = c.id 
                     LEFT JOIN subcategories s ON t.subcategory_id = s.id 
                     ORDER BY t.transaction_date DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return ["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }

    public function create($data) {
        try {
            $this->conn->beginTransaction();

            $query = "INSERT INTO transactions 
                     (user_id, title, amount, transaction_date, location, description, category_id, subcategory_id) 
                     VALUES (:user_id, :title, :amount, :transaction_date, :location, :description, :category_id, :subcategory_id)";

            $stmt = $this->conn->prepare($query);

            // Utilise l'utilisateur 1 par défaut (à adapter si multi-utilisateur)
            $user_id = 1;
            $stmt->bindParam(":user_id", $user_id);
            $stmt->bindParam(":title", $data['title']);
            $stmt->bindParam(":amount", $data['amount']);
            $stmt->bindParam(":transaction_date", $data['date']);
            $stmt->bindParam(":location", $data['location']);
            $stmt->bindParam(":description", $data['description']);
            $stmt->bindParam(":category_id", $data['category_id']);
            $stmt->bindParam(":subcategory_id", $data['subcategory_id']);

            // Met à jour le solde dans account_balance
            $updateBalance = "UPDATE account_balance 
                            SET current_balance = current_balance + :amount 
                            WHERE user_id = :user_id";
            $updateStmt = $this->conn->prepare($updateBalance);
            $updateStmt->bindParam(":amount", $data['amount']);
            $updateStmt->bindParam(":user_id", $user_id);

            if ($stmt->execute() && $updateStmt->execute()) {
                $lastId = $this->conn->lastInsertId();
                // fetch the inserted row to return to client
                $select = "SELECT t.id, t.title, t.amount, t.transaction_date as date, t.location, t.description, t.category_id, t.subcategory_id, c.name as category_name, s.name as subcategory_name
                           FROM transactions t
                           LEFT JOIN categories c ON t.category_id = c.id
                           LEFT JOIN subcategories s ON t.subcategory_id = s.id
                           WHERE t.id = :id";
                $s = $this->conn->prepare($select);
                $s->bindParam(':id', $lastId);
                $s->execute();
                $row = $s->fetch(PDO::FETCH_ASSOC);
                
                $this->conn->commit();

                return [
                    "success" => true,
                    "message" => "Transaction créée avec succès",
                    "data" => $row
                ];
            }
            
            $this->conn->rollBack();
            return ["success" => false, "message" => "Erreur lors de la création de la transaction"];
        } catch (PDOException $e) {
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }
            return ["success" => false, "message" => $e->getMessage()];
        }
    }

    public function delete($id) {
        try {
            $this->conn->beginTransaction();

            // Récupérer le montant de la transaction avant de la supprimer
            $getQuery = "SELECT amount FROM transactions WHERE id = :id";
            $getStmt = $this->conn->prepare($getQuery);
            $getStmt->bindParam(":id", $id);
            $getStmt->execute();
            $transaction = $getStmt->fetch(PDO::FETCH_ASSOC);

            if (!$transaction) {
                return ["success" => false, "message" => "Transaction non trouvée"];
            }

            // Supprimer la transaction
            $deleteQuery = "DELETE FROM transactions WHERE id = :id";
            $deleteStmt = $this->conn->prepare($deleteQuery);
            $deleteStmt->bindParam(":id", $id);

            // Mettre à jour le solde (soustraire le montant supprimé)
            $updateBalance = "UPDATE account_balance 
                            SET current_balance = current_balance - :amount 
                            WHERE user_id = 1";
            $updateStmt = $this->conn->prepare($updateBalance);
            $updateStmt->bindParam(":amount", $transaction['amount']);

            if ($deleteStmt->execute() && $updateStmt->execute()) {
                $this->conn->commit();
                return [
                    "success" => true,
                    "message" => "Transaction supprimée avec succès"
                ];
            }

            $this->conn->rollBack();
            return ["success" => false, "message" => "Erreur lors de la suppression de la transaction"];
        } catch (PDOException $e) {
            if ($this->conn->inTransaction()) {
                $this->conn->rollBack();
            }
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}