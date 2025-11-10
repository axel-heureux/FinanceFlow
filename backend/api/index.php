<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Pour les requêtes OPTIONS (pre-flight CORS)
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Inclure les fichiers nécessaires
require_once __DIR__ . "/../config/Database.php";

// Obtenir l'URL demandée
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = str_replace('/FinanceFlow/backend/api/', '', $path);
$method = $_SERVER['REQUEST_METHOD'];

// Extraire l'ID depuis l'URL si présent (ex: transactions/123)
$pathParts = explode('/', trim($path, '/'));
$resource = $pathParts[0];
$id = isset($pathParts[1]) ? $pathParts[1] : null;

// Récupérer les données envoyées
$data = json_decode(file_get_contents("php://input"), true);

// Connexion à la base de données
$database = new Database();
$db = $database->getConnection();

// Router les requêtes
switch ($resource) {
    case 'transactions':
        require_once __DIR__ . "/controllers/TransactionController.php";
        $controller = new TransactionController($db);
        
        switch ($method) {
            case 'GET':
                echo json_encode($controller->getAll());
                break;
            case 'POST':
                echo json_encode($controller->create($data));
                break;
            case 'DELETE':
                if ($id) {
                    echo json_encode($controller->delete($id));
                } else {
                    http_response_code(400);
                    echo json_encode(["message" => "ID de transaction requis"]);
                }
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Méthode non autorisée"]);
        }
        break;

    case 'categories':
        require_once __DIR__ . "/controllers/CategoryController.php";
        $controller = new CategoryController($db);
        
        switch ($method) {
            case 'GET':
                echo json_encode($controller->getAll());
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Méthode non autorisée"]);
        }
        break;

    case 'subcategories':
        require_once __DIR__ . "/controllers/SubcategoryController.php";
        $controller = new SubcategoryController($db);
        
        switch ($method) {
            case 'GET':
                $category_id = isset($_GET['category_id']) ? $_GET['category_id'] : null;
                echo json_encode($controller->getByCategory($category_id));
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Méthode non autorisée"]);
        }
        break;

    case 'balance':
        require_once __DIR__ . "/controllers/BalanceController.php";
        $controller = new BalanceController($db);
        
        switch ($method) {
            case 'GET':
                echo json_encode($controller->getBalance());
                break;
            default:
                http_response_code(405);
                echo json_encode(["message" => "Méthode non autorisée"]);
        }
        break;

    default:
        http_response_code(404);
        echo json_encode(["message" => "Route non trouvée"]);
        break;
}
