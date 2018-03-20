<?php
spl_autoload_register(function($className)
{
    $dir_list = [
        "controllers/",
        "models/",
        "repositories/"
    ];
    
    foreach($dir_list as $dir)
    {
        $file = $dir.$className.".php";
        if(file_exists($file))
        {
            require_once $file;
            break;
        }
    }
});