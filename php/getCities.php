<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();
$idCountry = $_GET['idCountry'];
$idState = $_GET['idState'];

$data = $funciones->getCities($idCountry,$idState);

echo json_encode($data);