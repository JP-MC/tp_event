<?php
$controller = new CategoryController();

//read all
Flight::route('GET /category',[$controller,"getAll"]);