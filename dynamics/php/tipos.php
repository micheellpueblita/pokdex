<?php

require "config.php";
$con = mysqli_connect($db_host, $db_user, $db_pass, $db_schema);

if(!$con)
{
    echo "No se pudo conectar a la base de datos";
}
else
{
  $sql = "SELECT * FROM types";
  $res = mysqli_query($con, $sql);
  $resultados = [];
  while($row = mysqli_fetch_assoc($res))
  {
    $resultados[] = array("id" => $row["type_id"], "nombre" => $row["type_name"]);
  }

  echo json_encode($resultados);
}