<?php
class EventRepository extends Repository
{
    //CREATE
    public function create(Event $event)
    {
        $sql = "INSERT INTO event 
                SET label = :label,
                    date_start=:date_start,
                    date_end=:date_end,
                    position=:position,
                    id_category=:id_category";
        
        $params = [
            "label"=>$event->getLabel(),
            "date_start"=>$event->getDate_start(),
            "date_end"=>$event->getDate_end(),
            "position"=>$event->getPosition(),
            "id_category"=>$event->getId_category()
        ];

        $stmt = $this->pdo->prepare($sql);
        $result = $stmt->execute($params);
        
        $id = false;
        if($result){
            $id = $this->pdo->lastInsertId();
            $event->setId($id);
        }
        return (bool) $id;
    }

    //READ
    public function getById($id)
    {
        $sql = 'SELECT * FROM event 
                WHERE id=:id';

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id',$id,PDO::PARAM_INT);
        $result = $stmt->execute();
        
        $event = null;
        if($stmt->rowCount()){
            $data = $stmt->fetch();
            $event = new Event($data);
        }
        return $event;
    }

    //UPDATE
    public function update(Event $event)
    {
        $sql = "UPDATE event 
                SET label=:label,
                    date_start=:date_start,
                    date_end=:date_end,
                    position=:position,
                    id_category=:id_category
                WHERE id=:id";

        $params = [
            "id"=>$event->getId(),
            "label"=>$event->getLabel(),
            "date_start"=>$event->getDate_start(),
            "date_end"=>$event->getDate_end(),
            "position"=>$event->getPosition(),
            "id_category"=>$event->getId_category()
        ];

        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id',$params["id"]);
        $stmt->bindValue(':label',$params["label"]);
        $stmt->bindValue(':date_start',$params["date_start"]);
        $stmt->bindValue(':date_end',$params["date_end"]);
        $stmt->bindValue(':position',$params["position"]);
        $stmt->bindValue(':id_category',$params["id_category"],PDO::PARAM_INT);
        $result = $stmt->execute($params);

        return (bool) $stmt->rowCount();
    }
    
    //DELETE
    public function delete($id)
    {
        $sql = "DELETE FROM event 
                WHERE id=:id";
        
        $stmt = $this->pdo->prepare($sql);
        $stmt->bindValue(':id',$id,PDO::PARAM_INT);
        $result = $stmt->execute();
        
        return (bool) $stmt->rowCount();
    }

    //READ ALL
    public function getAll()
    {
        $sql = "SELECT * FROM event";
        $stmt = $this->pdo->query($sql);
        $data_list = $stmt->fetchAll();

        $event_list = [];
        foreach($data_list as $data)
        {
            $event_list[] = new Event($data);
        }
        return $event_list;
    }
}