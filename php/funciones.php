<?php
namespace php;

include 'conexion.php';
use php\conexion;

$test = new funciones();


class funciones{
	public $cnn=false;


	public function __construct(){
		$this->cnn= new conexion();
		$this->cnn->Conectar();
	}

	public function ListContact($start,$limit){
		$query  = 	"SELECT
						ct.idContact,
						ct.firstName,
						ct.lastName,
						ct.birthDate,
						ct.sex,
						ct.Address,
						co.`name` Country,
						st.`name` State,
						ci.`name` City,
						ct.HomePhone,
						ct.MobilePhone,
						ct.Email
					FROM Contacts ct
					LEFT JOIN countries co ON co.id = ct.country
					LEFT JOIN states st ON st.id_country=ct.Country and st.id=ct.State
					LEFT JOIN cities ci ON ci.id = ct.City
					ORDER BY ct.firstName ASC, ct.lastName ASC
					LIMIT {$start},{$limit} ";
		$result=$this->cnn->query($query);
		$data=array();
		while ($datos = $result->fetch_array()) {
			$registro=[
				'idContacto'=>$datos['idContact'],
				'firstName'=>$datos['firstName'],
				'lastName'=>$datos['lastName'],
				'birthDate'=>$datos['birthDate'],
				'sex'=>$datos['sex'],
				'Address'=>$datos['Address'],
				'Country'=>$datos['Country'],
				'State'=>$datos['State'],
				'City'=>$datos['City'],
				'HomePhone'=>$datos['HomePhone'],
				'MobilePhone'=>$datos['MobilePhone'],
				'Email'=>$datos['Email']
			];
			array_push($data,$registro);
		}
		return $data;
	}

	public function searchContacts($values){
		$where='';
		foreach ($values as $value) {
			if(strlen(trim($value))>0){
				if(strlen($where)==0){
					$where=" (ct.firstName like '%{$value}%' OR ct.lastName like '%{$value}%' OR ct.Address like '%{$value}%' OR co.`name` like '%{$value}%' OR st.`name` like '%{$value}%' OR ci.`name` like '%$value%' OR ct.MobilePhone like '%{$value}%' OR ct.Email like '%{$value}%') ";
				}else{
					$where.=" AND (ct.firstName like '%{$value}%' OR ct.lastName like '%{$value}%' OR ct.Address like '%{$value}%' OR co.`name` like '%{$value}%' OR st.`name` like '%{$value}%' OR ci.`name` like '%$value%' OR ct.MobilePhone like '%{$value}%' OR ct.Email like '%{$value}%') ";
				}
			}
		}
		$query  = 	"SELECT
						ct.idContact,
						ct.firstName,
						ct.lastName,
						ct.birthDate,
						ct.sex,
						ct.Address,
						co.`name` Country,
						st.`name` State,
						ci.`name` City,
						ct.HomePhone,
						ct.MobilePhone,
						ct.Email
					FROM Contacts ct
					LEFT JOIN countries co ON co.id = ct.country
					LEFT JOIN states st ON st.id_country=ct.Country and st.id=ct.State
					LEFT JOIN cities ci ON ci.id = ct.City
					WHERE {$where}
					ORDER BY ct.firstName ASC, ct.lastName ASC";

		$result=$this->cnn->query($query);
		$data=array();
		while ($datos = $result->fetch_array()) {
			$registro=[
				'idContacto'=>$datos['idContact'],
				'firstName'=>$datos['firstName'],
				'lastName'=>$datos['lastName'],
				'birthDate'=>$datos['birthDate'],
				'sex'=>$datos['sex'],
				'Address'=>$datos['Address'],
				'Country'=>$datos['Country'],
				'State'=>$datos['State'],
				'City'=>$datos['City'],
				'HomePhone'=>$datos['HomePhone'],
				'MobilePhone'=>$datos['MobilePhone'],
				'Email'=>$datos['Email']
			];
			array_push($data,$registro);
		}
		return $data;
	}

	public function insert($fields,$values,$table){
		$query = "INSERT INTO {$table}({$fields}) VALUES({$values})";
		if(!$this->cnn->query($query)){
			return false;
		}
		return true;
	}

	public function update($fieldsValues=array(), $condition='', $table=''){
		$set='';
		foreach ($fieldsValues as $field=>$value) {
		   if(strlen($set)>0){
		        $set.=", `{$field}` = '{$value}' ";
		   }else{
		        $set= "`{$field}` = '{$value}' ";
		   }
		}

		if(strlen($set) > 0 && strlen($table) > 0 && strlen($condition) > 0){
			$query 	= 	"UPDATE {$table}
						SET {$set}
						WHERE {$condition}";
			echo $query;
			if(!$this->cnn->query($query)){
				echo "Error:".$this->cnn->error;
				return false;
			}
			return true;
		}else{
			echo "faltan parametros";
			return false;
		}
	}

	public function delete($field,$value,$table){
		$query = "DELETE FROM `{$table}` WHERE `{$field}`='{$value}'";
		if(!$this->cnn->query($query)){
			echo "Error:".$this->cnn->error;
			return false;
		}
		return true;
	}

	public function getData($fields,$table,$condition='',$order='',$group='',$limit=''){
		$where=$orderBy=$groupBy=$limite='';
		if($condition!=''){
			$where=' WHERE '.$condition;
		}
		if($order!=''){
			$orderBy=' ORDER BY '.$order;
		}
		if($group!=''){
			$groupBy=' GROUP BY'.$group;
		}
		if($limit!=''){
			$limite=' LIMIT '.$limit;
		}
		$query="SELECT {$fields} FROM `{$table}` {$where} {$groupBy} {$orderBy} {$limit}";
		$result=$this->cnn->query($query);
		$data = array();
		$fields=str_replace("`", "", $fields);
		$fields=explode(",", $fields);
		while($dato = $result->fetch_array()){
			$registros=[];
			foreach ($fields as $field) {
				if($registros==''){
					$registros[$field]= $dato[$field];
				}else{
					$registros[$field]=$dato[$field];
				}
			}
			array_push($data, $registros);
		}
		return $data;
	}


	function getCities($idCountry,$idState){
		$query="SELECT ci.id,ci.name
				FROM cities ci
				INNER JOIN states st ON st.id=ci.id_state
				INNER JOIN countries ct ON ct.id=st.id_country
				WHERE ct.id={$idCountry} AND st.id={$idState}
				ORDER BY ci.name ASC";
		$result=$this->cnn->query($query);
		$data=array();
		while ($datos = $result->fetch_array()) {
			$registro=[
				'id'=>$datos['id'],
				'name'=>$datos['name']
			];
			array_push($data,$registro);
		}
		return $data;
	}

	public function getTotalPage(){
		$query  = 	"SELECT count(*) totalRows
					FROM Contacts ct";
		$result=$this->cnn->query($query);
		$data=array();
		$datos = $result->fetch_array();
		$totalPage=1;
		if($datos['totalRows']>0){
			$totalPage = ceil($datos['totalRows']/10);
		}
		array_push($data,array('totalPage'=>$totalPage));
		return $data;
	}

}