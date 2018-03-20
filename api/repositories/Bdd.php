<?php
class Bdd
{
    const DSN = "mysql:host=localhost;dbname=jpmc_event_tp;charset=UTF8";
    const USER = "root";
    const PASS = "root";
    const PARAMS = [
        PDO::ATTR_DEFAULT_FETCH_MODE    => PDO::FETCH_ASSOC,
        PDO::ATTR_ERRMODE               => PDO::ERRMODE_EXCEPTION
    ];

    private $pdo;

    public function getPdo() : PDO
    {
        return $this->pdo;
    }

    public function __construct()
    {
        try
        {
            $this->pdo = new PDO(self::DSN,self::USER,self::PASS,self::PARAMS);
        }
        catch(PDOException $e)
        {
            echo "Erreur lors de la connexion : ".$e->getMessage();
            die();
        }
    }
}