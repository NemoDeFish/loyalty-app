<?php
require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$host = $_ENV['DB_HOST'];
$dbname = $_ENV['DB_NAME'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];

require 'db.php';

$corsOrigin = $_ENV['CORS_ORIGIN'];

header("Access-Control-Allow-Origin: $corsOrigin");
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$requestUri = $_SERVER['REQUEST_URI'];

// Simple routing
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $requestUri === '/api/users/login') {
    require 'routes/user.php';
    loginUser();
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST' && $requestUri === '/api/sync') {
    require 'sync.php';  // Include sync script
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Not Found']);
}
?>
