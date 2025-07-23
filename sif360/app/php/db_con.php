<?php

    $dsn = 'pgsql:host=localhost port=5432 dbname=SIF360 user=sif360 password=password360';
    
    try{
     // create a PostgreSQL database connection
     $db = new PDO($dsn);

     // display a message if connected to the PostgreSQL successfully
     if($db){
        $db->exec('SET search_path TO sif360');
     }
    }catch (PDOException $e){
     // report error message
     echo $e->getMessage();
    }


?>