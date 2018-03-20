<?php
class CategoryRepository extends Repository
{
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
        $sql = "SELECT id,label FROM category";
        $query = $this->pdo->query($sql);
        $data_list = $query->fetchAll();

        $category_list = [];
        foreach($data_list as $data)
        {
            $category_list[] = new Category($data);
        }
        return $category_list;
    }
}