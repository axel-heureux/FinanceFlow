<?php
class SubcategoryController {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function getByCategory($category_id) {
        try {
            $query = "SELECT * FROM subcategories WHERE category_id = :category_id ORDER BY name";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":category_id", $category_id);
            $stmt->execute();

            return ["success" => true, "data" => $stmt->fetchAll(PDO::FETCH_ASSOC)];
        } catch (PDOException $e) {
            return ["success" => false, "message" => $e->getMessage()];
        }
    }
}