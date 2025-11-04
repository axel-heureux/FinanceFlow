<?php
class TransactionController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        try {
            $query = "SELECT t.*, c.name as category_name, s.name as subcategory_name 
                     FROM transactions t 
                     LEFT JOIN categories c ON t.category_id = c.id 
                     LEFT JOIN subcategories s ON t.subcategory_id = s.id 
                     ORDER BY t.date DESC";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return ["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }

    public function create($data) {
        try {
            $query = "INSERT INTO transactions 
                     (title, amount, date, location, description, category_id, subcategory_id) 
                     VALUES (:title, :amount, :date, :location, :description, :category_id, :subcategory_id)";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":title", $data['title']);
            $stmt->bindParam(":amount", $data['amount']);
            $stmt->bindParam(":date", $data['date']);
            $stmt->bindParam(":location", $data['location']);
            $stmt->bindParam(":description", $data['description']);
            $stmt->bindParam(":category_id", $data['category_id']);
            $stmt->bindParam(":subcategory_id", $data['subcategory_id']);

            if ($stmt->execute()) {
                return [
                    "success" => true,
                    "message" => "Transaction créée avec succès",
                    "id" => $this->conn->lastInsertId()
                ];
            }
            
            return ["success" => false, "message" => "Erreur lors de la création de la transaction"];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}