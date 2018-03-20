<?php
class Category extends Model implements JsonSerializable
{
    private $label;

    public function jsonSerialize()
    {
        return [
            "id"=>$this->id,
            "label"=>$this->label
        ];
    }

    public function getLabel(){return $this->label;}
    public function setLabel($label){
        $this->label = $label;
    }
}