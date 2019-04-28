<?php 

// session_start()

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once 'connection.php';
include_once 'todos.php';

$database = new Database();
$db = $database->getConnection();

$todo = new Todo($db);

$stmt = $todo->getTodos();

$num = $stmt->rowCount();

if($num>0){
   // products array
   $todos_arr=array();
   $todos_arr["records"]=array();

   while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
       
       extract($row);
       $todo_item=array(
           "id" => $id,
           "title" => $title,
           "description" => $description,
           "created" => $created,
           "user" => $username
       );
       array_push($todos_arr["records"], $todo_item);
   }
  
   http_response_code(200);
   
   echo json_encode($todos_arr);
} else{
   http_response_code(404);
   echo json_encode(
       array("message" => "No todos found.")
   );
}

?>