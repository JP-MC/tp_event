<?php
use RepositoryManager as RM;
class EventController
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
        $eventRepository = RM::getInstance()->getEventRepository();
        $event = new Event(Flight::request()->data->getData());
        $success = $eventRepository->create($event);

        $status = [
            "success" => $success,
            "id" => $event->getId(),
            "message" => "L'évènement ".$event->getId()." a bien été créé"
        ];
        $this->response($status);
    }

    public function getById($id)
    {
        if(!$id){$id = 0;}
        $eventRepository = RM::getInstance()->geteventRepository();
        $event = $eventRepository->getById($id);
        $success = ($event) ? true : false;
       
        $status = [
            "success" => $success,
            "event" => $event
        ];
        $this->response($status);
    }
    
    public function getAll()
    {
        $eventRepository = RM::getInstance()->getEventRepository();
        $event_list = $eventRepository->getAll();
        $success = ($event_list) ? true : false;

        $status = [
            "success" => $success,
            "event_list" => $event_list
        ];
        $this->response($status);
    }

    public function update($id)
    {
        $eventRepository = RM::getInstance()->getEventRepository();
        $event = new Event(Flight::request()->data->getData());
        $event->setId($id);
        $success = $eventRepository->update($event);
    
        $status = [
            "success" => $success,
            "event" => $event
        ];
        $this->response($status);
    }

    public function delete($id)
    {
        $eventRepository = RM::getInstance()->getEventRepository();
        $success = $eventRepository->delete($id);

        $status = ["success" => $success];
        $this->response($status);
    }
}