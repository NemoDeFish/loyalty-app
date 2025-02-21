<?php
function loginUser() {
    global $pdo;

    // Get the request body
    $data = json_decode(file_get_contents('php://input'), true);
    $phoneNumber = $data['phoneNumber'];

    if (empty($phoneNumber)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Phone number is required']);
        return;
    }

    try {
        // Fetch user from the database
        $stmt = $pdo->prepare('SELECT points FROM users WHERE phone_number = ?');
        $stmt->execute([$phoneNumber]);
        $user = $stmt->fetch();

        if ($user) {
            echo json_encode(['success' => true, 'points' => $user['points']]);
        } else {
            // User does not exist, return an error instead of adding them
            http_response_code(404);
            echo json_encode(['success' => false, 'message' => 'User not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
}
?>