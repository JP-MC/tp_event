<?php
use RepositoryManager as RM;
class CategoryController
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

    public function create()
    {
        
    }

    public function getById($id)
    {
        
    }
    
    public function getAll()
    {
        $categoryRepository = RM::getInstance()->getCategoryRepository();
        $category_list = $categoryRepository->getAll();
        $success = ($category_list) ? true : false;

        $status = [
            "success" => $success,
            "category_list" => $category_list
        ];
        $this->response($status);
    }

    public function update($id)
    {
        
    }

    public function delete($id)
    {
        
    }
}