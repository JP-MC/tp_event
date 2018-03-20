<?php
$controller = new EventController();

//read all
Flight::route('GET /event',[$controller,"getAll"]);

//create
Flight::route('POST /event',[$controller,"create"]);

//read
Flight::route('GET /event/@id:[0-9]+',[$controller,"getById"]);

//update
Flight::route('PUT /event/@id:[0-9]+',[$controller,"update"]);

//delete
Flight::route('DELETE /event/@id:[0-9]+',[$controller,"delete"]);

//OPTION
Flight::route('OPTIONS /event/@id:[0-9]+',[$controller,"preflight"]);