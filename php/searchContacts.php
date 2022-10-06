<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();
$search = $_GET['search'];
$search = explode(' ', $search);

$data = $funciones->searchContacts($search);
echo json_encode($data);