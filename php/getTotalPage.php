<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();
$data = $funciones->getTotalPage();
echo json_encode($data);