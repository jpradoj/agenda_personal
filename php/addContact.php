<?php
namespace php;

header("Content-Type: application/json");
include 'funciones.php';
use php\funciones;

$funciones = new funciones();

$post=json_decode(file_get_contents('php://input'), true);
$fields='';
$values='';
foreach ($post as $field=>$value) {
   if(strlen($fields)>0){
        $fields.=",`{$field}`";
        $values.=",'{$value}'";
   }else{
        $fields.="`{$field}`";
        $values.="'{$value}'";
   }
}
$data = $funciones->insert($fields,$values,'Contacts');
echo json_encode($data);