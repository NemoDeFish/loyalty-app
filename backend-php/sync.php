<?php
header('Content-Type: application/json');

$remote_conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($remote_conn->connect_error) {
    echo json_encode(["error" => "Remote DB connection failed: " . $remote_conn->connect_error]);
    exit;
}

// Step 2: Get Data from Request (Expecting JSON)
$input_data = json_decode(file_get_contents("php://input"), true);

if (!isset($input_data['phone_number']) || !isset($input_data['points'])) {
    echo json_encode(["error" => "Invalid or missing data"]);
    exit;
}

$phone = $input_data['phone_number'];
$points = $input_data['points'];

// Step 3: Insert Data into Remote Database
$remote_query = "INSERT INTO users (phone_number, points) VALUES ('$phone', '$points')
                 ON DUPLICATE KEY UPDATE points = VALUES(points)";

if ($remote_conn->query($remote_query)) {
    echo json_encode(["success" => "Data uploaded successfully", "phone_number" => $phone]);
} else {
    echo json_encode(["error" => "Failed to upload data for phone: $phone"]);
}

// Close connection
$remote_conn->close();
?>
