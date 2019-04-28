<?php 
class Todo {
    private $conn;
    private $table_name = "todos";

    public $title;
    public $description;
    public $created;
    public $user;

    public function __construct($db_conn)
    {
        $this->conn = $db_conn;
    }

    public function getTodos() {
        $query = "SELECT t.id, t.title, t.description, t.created, u.username 
                FROM " .$this->table_name. " as t 
                INNER JOIN users AS u 
                ON t.user=u.id
                ORDER BY t.created DESC";
                //ToDo: when log in is in use, return only the todos from the logged in user
        $stmt = $this->conn->prepare($query);

        $stmt->execute();

        return $stmt;
    }

    public function createTodo(){
        
        $query = "INSERT INTO " . $this->table_name . "
        SET title=:title, description=:description, user=:user ";

        $stmt = $this->conn->prepare($query);

         // sanitize
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->description=htmlspecialchars(strip_tags($this->description));
        
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":user", $this->user);

        var_dump($stmt) ;

        if($stmt->execute()){

            return true;
        }

        return false;

    }

    public function deleteTodo() {
        $query = "DELETE FROM " .$this->table_name. " 
                WHERE id = ? LIMIT 1";
        
       $stmt = $this->conn->prepare($query);
  
       $this->id=htmlspecialchars(strip_tags($this->id));
  
       $stmt->bindParam(1, $this->id);

       if($stmt->execute()){
           return true;
       }
  
       return false;
    }

    public function updateTodo() {

        $query = "UPDATE " . $this->table_name . "
                SET title=:title, description=:description, created=:created 
                WHERE id=:id
                LIMIT 1";
                //ToDo: probably add userId to the query to narrow the research
        $stmt = $this->conn->prepare($query);

        $this->id=htmlspecialchars(strip_tags($this->id));
        $this->title=htmlspecialchars(strip_tags($this->title));
        $this->description=htmlspecialchars(strip_tags($this->description));
        $this->created=htmlspecialchars(strip_tags($this->created));

        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":title", $this->title);
        $stmt->bindParam(":description", $this->description);
        $stmt->bindParam(":created", $this->created);

        if($stmt->execute()){

            return true;
        }

        return false;

    }

    //ToDo: add method to return only todo with specific ID
}

?>