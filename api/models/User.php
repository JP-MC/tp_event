<?php
class User extends Model implements JsonSerializable
{
    private $id;
    private $login;
    private $pass;

    public function jsonSerialize()
    {
        return [
            "id"=>$this->id,
            "login"=>$this->login,
            "pass"=>$this->pass
        ];
    }

    public function getId(){return $this->id;}
    public function getLogin(){return $this->login;}
    public function getPass(){return $this->pass;}

    public function setId($id){
        $this->id = $id;
    }
    public function setLogin($login){
        $this->login = $login;
    }
    public function setPass($pass){
        $this->pass = $pass;
    }
}