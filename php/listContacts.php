<?php
namespace php;

header("Content-Type: application/json");

include 'funciones.php';
use php\funciones;
$start = $_GET['start'];
$limit = $_GET['limit'];
$funciones = new funciones();

$data = $funciones->ListContact($start,$limit);
echo json_encode($data);