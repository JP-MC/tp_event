<?php
abstract class Model
{
    protected $id;

    public function getId(){return $this->id;}
    public function setId($id){$this->id = (int) $id;}

    private function hydrate(array $data)
    {
        foreach($data as $key => $value)
        {
            $method = "set".ucfirst($key);
            if(method_exists($this,$method))
            {
                $this->$method($value);
            }
        }
    }

    public function __construct(array $data = [])
    {
        $this->hydrate($data);
    }
}