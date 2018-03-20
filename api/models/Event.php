<?php
class Event extends Model implements JsonSerializable
{
    private $label;
    private $date_start;
    private $date_end;
    private $position;
    private $id_category;

    public function jsonSerialize()
    {
        return [
            "id"=>$this->id,
            "label"=>$this->label,
            "date_start"=>$this->date_start,
            "date_end"=>$this->date_end,
            "position"=>$this->position,
            "id_category"=>$this->id_category
        ];
    }

    public function getLabel(){return $this->label;}
    public function getDate_start(){return $this->date_start;}
    public function getDate_end(){return $this->date_end;}
    public function getPosition(){return $this->position;}
    public function getId_category(){return $this->id_category;}

    public function setLabel($label){
        $this->label = $label;
    }
    public function setDate_start($date_start){
        $this->date_start = $date_start;
    }
    public function setDate_end($date_end){
        $this->date_end = $date_end;
    }
    public function setPosition($position){
        $this->position = $position;
    }
    public function setId_category($id_category){
        $this->id_category = $id_category;
    }
}