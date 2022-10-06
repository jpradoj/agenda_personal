<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();
$fields="`id`,`name`";
$data = $funciones->getData($fields,'countries','','`name` ASC');

echo json_encode($data);