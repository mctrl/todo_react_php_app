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

if(!empty($data->description)){

    $todo->id = $data->id;
    $todo->title = $data->title;
    $todo->description = $data->description;
    $todo->created = date('Y-m-d H:i:s'); 
 
    if($todo->updateTodo()){

        http_response_code(201);
        echo json_encode(array("message" => "todo was updated."));

    } else{

        http_response_code(503);
        echo json_encode(array("message" => "Unable to update todo."));

    }
} else{

    http_response_code(400);
    echo json_encode(array("message" => "Unable to update todo. Description must be present."));
 
}
?>