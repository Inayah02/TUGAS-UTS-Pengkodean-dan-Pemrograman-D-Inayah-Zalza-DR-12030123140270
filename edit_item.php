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

$id = $_POST['id'];
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
    if (!file_exists($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $image_name = time() . '_' . basename($_FILES['image']['name']);
    $image = $target_dir . $image_name;
    if (move_uploaded_file($_FILES['image']['tmp_name'], $image)) {
        $image = "images/items/" . $image_name;
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload image']);
        exit;
    }
}

if ($image) {
    $sql = "UPDATE items SET image='$image', code='$code', name='$name', category='$category', unit='$unit', stock=$stock, price=$price WHERE id=$id";
} else {
    $sql = "UPDATE items SET code='$code', name='$name', category='$category', unit='$unit', stock=$stock, price=$price WHERE id=$id";
}

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
}

$conn->close();
?>