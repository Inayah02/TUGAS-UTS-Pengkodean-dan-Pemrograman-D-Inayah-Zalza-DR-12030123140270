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

$code = $_POST['code'];
$name = $_POST['name'];
$category = $_POST['category'];
$unit = $_POST['unit'];
$stock = $_POST['stock'];
$price = $_POST['price'];

// Handle image upload
$image = '';
if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
    $target_dir = "../images/items/";
    // Pastikan folder ada
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    // Gunakan nama file yang unik untuk menghindari overwrite
    $image_name = time() . '_' . basename($_FILES['image']['name']);
    $image = $target_dir . $image_name;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $image)) {
        // Path relatif untuk disimpan di database
        $image = "images/items/" . $image_name;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
        exit;
    }
}

$sql = "INSERT INTO items (image, code, name, category, unit, stock, price) VALUES ('$image', '$code', '$name', '$category', '$unit', $stock, $price)";
if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>