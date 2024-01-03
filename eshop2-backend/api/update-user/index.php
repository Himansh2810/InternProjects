<?php 

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: *");

include "connect.php";
    
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $req_body = file_get_contents('php://input');
    $data = json_decode($req_body, true);

        
    $uname = $data['username'];
    $name = $data['name'];
    $pswd = $data['password'];
    $new_pswd = $data['new_password'];
    
    
    if(authUser($uname,$pswd,$con)){
         $res = updateUser($uname,$name,$new_pswd,$con);

         if($res)
         {
            echo json_encode(["status"=>200,"response"=>"Your details updated successfully."]);
         }
         else{
             echo json_encode(["status"=>500,"response"=>"Unable to update details , Try agian."]);
         }
        
    }
    else{
        echo json_encode(["status"=>404,"response"=>"Please enter correct old password"]);
    }     
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

  function updateUser($un,$nm,$np,$cn)
  {

    $updateQuery ="UPDATE `users` SET `name`='$nm',`password`='$np' WHERE username='$un'";
   
    $res = mysqli_query($cn,$updateQuery);

    if (!$res) {
      die("Query failed: " . mysqli_error($cn));
      return false;
    }
    else{
        return true;
    }
    // Close the database connection
    mysqli_close($cn);
  }

?>