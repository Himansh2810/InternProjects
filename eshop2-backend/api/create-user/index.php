<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers:*");

include "connect.php";


function userExists($un, $cn)
{
    // Use prepared statements to prevent SQL injection
    $searchUnameQuery = "SELECT `username` FROM `users` WHERE username=?";
    $stmt = mysqli_prepare($cn, $searchUnameQuery);
    mysqli_stmt_bind_param($stmt, 's', $un);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

    // Check if any rows were returned
    $rows = mysqli_stmt_num_rows($stmt);

    // Close the statement
    mysqli_stmt_close($stmt);

    return $rows > 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $req_body = file_get_contents('php://input');
    $data = json_decode($req_body, true);

    $uname = $data['username'];
    $name = $data['name'];
    $pswd = $data['password'];

    // Check if the username exists

    if (userExists($uname, $con)) {
        // Username exists
        echo json_encode(["status" => 404]);
    } else {
        // Username does not exist
        $insertQuery = "INSERT INTO `users`(`username`, `name`, `password`) VALUES ('$uname','$name','$pswd')";
        $res = mysqli_query($con, $insertQuery);

        if ($res) {
            echo json_encode(["status" => 200]);
        }
        else{
            echo json_encode(["status" => 500]);
        }
        
    }
}
?>


