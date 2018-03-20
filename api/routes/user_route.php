<?php
$controller = new UserController();

//login
Flight::route('POST /userlogin',[$controller,"login"]);

//logout
Flight::route('GET /userlogout/@id:[0-9]+',[$controller,"logout"]);

//is logged
Flight::route('GET /islogged/@id:[0-9]+',[$controller,"isLogged"]);

//read all
Flight::route('GET /user',[$controller,"getAll"]);

//create
Flight::route('POST /user',[$controller,"create"]);

//read
Flight::route('GET /user/@id:[0-9]+',[$controller,"getById"]);

//update
Flight::route('PUT /user/@id:[0-9]+',[$controller,"update"]);

//delete
Flight::route('DELETE /user/@id:[0-9]+',[$controller,"delete"]);

//OPTION
Flight::route('OPTIONS /user/@id:[0-9]+',[$controller,"preflight"]);