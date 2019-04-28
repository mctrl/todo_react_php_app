<?php 

// session_start()
// get the user id from the logged in user
//but for now, hard coded
$user = 1;

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

include_once 'connection.php';
include_once 'todos.php';

$database = new Database();
$db = $database->getConnection();

$todo = new Todo($db);

$data = json_decode(file_get_contents("php://input"));

if(!empty($data->description)){

   $todo->title = $data->title;
   $todo->description = $data->description;
   $todo->user = $user; //ToDo: comes from logged in user

   if($todo->createTodo()){

       http_response_code(201);
       echo json_encode(array("message" => "todo was created."));

   } else{

       http_response_code(503);
       echo json_encode(array("message" => "Unable to create todo."));
   
    }
} else{

   http_response_code(400);
   echo json_encode(array("message" => "Unable to create todo. Description must be present."));

}

?>