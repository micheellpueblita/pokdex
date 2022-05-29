<?php
    require "config.php";

    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema);

    $id = $_POST['id']; //Aqui saca el id del form con el POST

    //Buscar las tablas y sus relaciones para poder elimanrlos correctamente
    /* 
    base_stats
    pokemon_moves
    pokemon_types
    pokemon_evolution_matchup
    pokemon_abilities
    pokemon, la mayor
    */

    $sql = "DELETE FROM pokemon_types WHERE pok_id = $id";
    mysqli_query($con, $sql);

    $sql = "DELETE FROM pokemon_moves WHERE pok_id = $id";
    mysqli_query($con, $sql);

    $sql = "DELETE FROM base_stats WHERE pok_id = $id";
    mysqli_query($con, $sql);
    $sql = "DELETE FROM pokemon_abilities WHERE pok_id = $id";
    mysqli_query($con, $sql);

    $sql = "DELETE FROM pokemon_evolution_matchup WHERE pok_id = $id";
    mysqli_query($con, $sql);

    $sql = "DELETE FROM pokemon WHERE pok_id=$id";
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
