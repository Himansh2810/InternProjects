<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

include "connect.php";
    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $req_body = file_get_contents('php://input');
    $data = json_decode($req_body, true);

        
    $uname = $data['username'];
    $pswd = $data['password'];
    
    
    if(authUser($uname,$pswd,$con)){
        echo json_encode(["status"=>200]);
    }
    else{
        echo json_encode(["status"=>404]);
    }     
}
elseif ($_SERVER['REQUEST_METHOD'] === 'GET')
{   
     $uname = $_GET['username'];

    getUserData($uname,$con);

    //echo json_encode($resp);
}



function authUser($un, $ps, $cn)
{
    if($un == null || $ps == null){ return false; }

        // Use prepared statements to prevent SQL injection
    $searchUnameQuery = "SELECT `password` FROM `users` WHERE username=?";
    $stmt = mysqli_prepare($cn, $searchUnameQuery);
    mysqli_stmt_bind_param($stmt, 's', $un);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_store_result($stmt);

     // Check if any rows were returned
    $rows = mysqli_stmt_num_rows($stmt);

    if($rows > 0){
        mysqli_stmt_bind_result($stmt, $password_from_db);

        // Fetch the result
        mysqli_stmt_fetch($stmt);

        if($ps === $password_from_db)
        {
            mysqli_stmt_close($stmt);
            return true;
        }
        else{
            mysqli_stmt_close($stmt);
            return false;
        }
    }
    else{
        mysqli_stmt_close($stmt);
        return false;
    }       
  }

  function getUserData($un,$cn)
  {
    $searchUserQuery = "SELECT `name`,`password`,`username` FROM `users` WHERE username='$un'";
   
    $res = mysqli_query($cn,$searchUserQuery);

    if (!$res) {
      die("Query failed: " . mysqli_error($cn));
    }

    $userData = array();
    while ($row = mysqli_fetch_assoc($res)) {
       $userData[] = $row;
    }

    echo json_encode($userData);

    // Close the database connection
    mysqli_close($cn);
  }

?>