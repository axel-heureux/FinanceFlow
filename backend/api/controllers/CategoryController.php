<?php
class CategoryController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getAll() {
        try {
            $query = "SELECT * FROM categories ORDER BY name";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();

            return ["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}