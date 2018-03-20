<?php
class RepositoryManager
{
    private $userRepository;
    private $eventRepository;
    private $categoryRepository;
    
    private static $instance = null;

    public static function getInstance() : RepositoryManager
    {
        if(!self::$instance)
        {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function getUserRepository(){
        return $this->userRepository;
    }
    public function getEventRepository(){
        return $this->eventRepository;
    }
    public function getCategoryRepository(){
        return $this->categoryRepository;
    }

    private function __construct()
    {
        $pdo = (new Bdd())->getPdo();
        $this->userRepository = new UserRepository($pdo);
        $this->eventRepository = new EventRepository($pdo);
        $this->categoryRepository = new CategoryRepository($pdo);
    }
}