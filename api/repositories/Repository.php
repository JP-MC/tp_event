<?php
abstract class Repository
{
    protected $pdo;

    function __construct($pdo)
    {
        $this->pdo = $pdo;
    }
}