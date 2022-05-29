<?php
    require "config.php";

    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema);

    

    $sql = "DELETE FROM pokemon_types WHERE pok_id = $id";//elimina primero registros
    mysqli_query($con, $sql);
    

    $sql = "DELETE FROM pokemon WHERE pok_id=$id";//elimina el pokemon
    $res = mysqli_query($con, $sql);

    if($res == true)
    {
        $respuesta = array("ok" => true);   
    }else
    {
        //echo mysqli_error($con);
        $respuesta = array("ok"=>false);
    }
    
    echo json_encode($respuesta); 

