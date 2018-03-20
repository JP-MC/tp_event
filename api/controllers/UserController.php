<?php
use RepositoryManager as RM;
class UserController
{
    public function response($status)
    {
        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Headers: Content-type");
        header("Access-Control-Allow-Methods: GET,PUT,POST,DELETE,OPTIONS");
        header("Content-type: application/json");
        echo json_encode($status);
    }
    public function preflight()
    {
        $this->response(["success"=>true]);
    }

    public function login()
    {
        $userRepository = RM::getInstance()->getUserRepository();
        $login = Flight::request()->data->login;
        $pass = Flight::request()->data->pass;
        $id_user = $userRepository->login($login,$pass);
        $success = ($id_user) ? true : false;
        
        if($success)
        {
            $_SESSION["user"] = $id_user;
        }
       
        $status = [
            "success" => $success,
            "id" => $id_user
        ];
        $this->response($status);
    }

    public function logout($id)
    {
        $success = false;

        if(isset($_SESSION["user"]) && $_SESSION["user"] == $id)
        {
            unset($_SESSION["user"]);
            $success = true;
        }
       
        $status = [
            "success" => $success
        ];
        $this->response($status);
    }

    public function isLogged($id)
    {
        $success = false;
        
        if(isset($_SESSION["user"]) && $_SESSION["user"] == $id)
        {
            $success = true;
        }
       
        $status = [
            "success" => $success
        ];
        $this->response($status);
    }

    public function create()
    {
        
    }

    public function getById($id)
    {
        
    }
    
    public function getAll()
    {
        
    }

    public function update($id)
    {
        
    }

    public function delete($id)
    {
        
    }
}