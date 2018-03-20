<?php
require "flight/Flight.php";
require 'autoload.php';

//read
Flight::route('/',function(){
    echo "Hello";
});

require 'routes/user_route.php';
require 'routes/event_route.php';
require 'routes/category_route.php';

Flight::start();