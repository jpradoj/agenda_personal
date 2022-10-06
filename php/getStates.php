<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();
$filter = "`id_country` = ".$_GET['idCountry'];
$fields="`id`,`id_country`,`name`";
$data = $funciones->getData($fields,'states',$filter,'`name` ASC');

echo json_encode($data);