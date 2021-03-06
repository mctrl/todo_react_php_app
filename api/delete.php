<?php 

// session_start()

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");


include_once 'connection.php';
include_once 'todos.php';

$database = new Database();
$db = $database->getConnection();

$todo = new Todo($db);

$data = json_decode(file_get_contents("php://input"));

$todo->id = $data->id;

if($todo->deleteTodo()){
   
   http_response_code(200);
   echo json_encode(array("message" => "Todo was deleted."));

} else{

   http_response_code(503);
   echo json_encode(array("message" => "Unable to delete todo."));
}

?>