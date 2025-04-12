<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "inventory_db";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

$username = $_POST['username'];
$password = password_hash($_POST['password'], PASSWORD_DEFAULT);

// Handle image upload
$photo = '';
if (isset($_FILES['photo']) && $_FILES['photo']['error'] == 0) {
    $target_dir = "../images/users/";
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $photo = $target_dir . basename($_FILES['photo']['name']);
    move_uploaded_file($_FILES['photo']['tmp_name'], $photo);
}

$sql = "INSERT INTO users (username, password, photo) VALUES ('$username', '$password', '$photo')";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>