<?php
    require "config.php";

    $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema);

    $alturaActualizada = (isset($_POST['alturaActualizada'])&& $_POST['alturaActualizada']!='')? $_POST['alturaActualizada']: false;
    $pesoActualizada = (isset($_POST['pesoActualizada'])&& $_POST['pesoActualizada']!='')? $_POST['pesoActualizada']: false;
    $exp_baseActualizada = (isset($_POST['exp_baseActualizada'])&& $_POST['exp_baseActualizada']!='')? $_POST['exp_baseActualizada']: false;
    $tipoActualizada = (isset($_POST['tipoActualizada'])&& $_POST['tipoActualizada']!='')? $_POST['tipoActualizada']: false;

    $id = $_POST['id'];

    $sql = "UPDATE pokemon SET pok_height=$alturaActualizada pok_weight=$pesoActualizada pok_base_experience=$exp_baseActualizada WHERE pok_id=$id";
    $res = mysqli_query($con, $sql);

    if($res == false)
    {
        $respuesta = array("ok" => false, "texto" => "No se pudo ingresar");
        echo json_encode($respuesta);
    }
    else
    {

        $sql = "UPDATE pokemon_types SET type_id = $tipoActualizada =  WHERE pok_id = $id";
        mysqli_query($con, $sql);

        $respuesta = array("ok" => true, "id" => $id, "texto" => "Se pudo ingresar, vivaa");
        echo json_encode($respuesta);
    }