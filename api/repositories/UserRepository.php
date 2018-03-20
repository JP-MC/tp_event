<?php
class UserRepository extends Repository
{
    function login($login,$pass)
    {
        $sql = 'SELECT id FROM user 
                WHERE login=:login
                AND pass=:pass';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':login',$login);
        $stmt->bindValue(':pass',$pass);
        $stmt->execute();
        
        $id_user = null;
        if($stmt->rowCount()){
            $id_user = $stmt->fetch();
        }
        return $id_user;
    }

    //CREATE
    public function create()
    {
        
    }

    //READ
    public function getById($id)
    {
        
    }

    //UPDATE
    public function update($id)
    {
        
    }
    
    //DELETE
    public function delete($id)
    {
        
    }

    //READ ALL
    public function getAll()
    {
        
    }
}