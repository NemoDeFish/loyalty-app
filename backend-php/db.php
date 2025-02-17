<?php
require_once __DIR__ . '/config.php'; // Ensures .env is loaded only once
$host = getenv('LOCAL_DB_HOST');
$dbname = getenv('LOCAL_DB_NAME');
$username = getenv('LOCAL_DB_USER');
$password = getenv('LOCAL_DB_PASS');

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>