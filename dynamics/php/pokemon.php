<?php
  require "config.php";

  $con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema);
  
  if(!$con)
  {
    echo "No se pudo conectar a la base de datos";
  }
  else
  {
    if(isset($_GET['q']))
    {
      $query = $_GET['q'];
      $sql = "SELECT pok_id, pok_name FROM pokemon WHERE pok_name LIKE '%".$query."%'";
      $res = mysqli_query($con, $sql);
      $resultados = [];
      while($row = mysqli_fetch_assoc($res))
      {
        $resultados[] = $row;
      }
      echo json_encode($resultados);
    }
    else if(isset($_GET['id']))
    {
      $query = $_GET['id'];
      $sql = "SELECT pok_id, pok_name, pok_height, pok_weight, pok_base_experience, type_name 
              FROM pokemon NATURAL JOIN pokemon_types NATURAL JOIN types 
              WHERE pok_id = '$query' AND slot=1";

      $res = mysqli_query($con, $sql);
      $row = mysqli_fetch_assoc($res);
      
      $datos = array("id"=>$row['pok_id'], "nombre"=>$row['pok_name'], "altura"=>$row['pok_height'], "peso"=>$row['pok_weight'], "tipo"=>$row['type_name']);

      $respuesta = array("ok"=>true, "datos"=>$datos);

      echo json_encode($respuesta);
    }


  }