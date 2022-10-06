<?php
namespace php;

class conexion{
	public $server='';
	public $user='';
	public $pass='';
	public $db='';
    private $cnn=false;


	public function __construct($optional = array()){
		$default = (object)$optional;
		$this->resetParam($default);
    }


    public function resetParam($param){
    	$this->server = isset($param->server) ? $param->server  : 'localhost';
    	$this->user = isset($param->user) ? $param->user  : 'development';
    	$this->pass = isset($param->pass) ? $param->pass  : 'password';
    	$this->db = isset($param->db) ? $param->db  : 'agenda_personal';
    }

    public function Conectar(){
    	$this->cnn = new \mysqli($this->server, $this->user, $this->pass, $this->db);
    	if($this->cnn->connect_errno){
    		echo "Fallo la conexion".PHP_EOL;
    		echo "Fallo la conexion a mysql, Error:".$this->cnn->connect_errno.", ".$this->cnn->connect_error.PHP_EOL;
    	}
	}


    public function query($query){

        if ($result= $this->cnn->query($query)) {
            return $result;
        }
        return false;
    }


    public function Cerrar(){
        if($this->cnn){
            mysqli_close($this->cnn);
            echo PHP_EOL. "session cerrada";
        }else{
            echo PHP_EOL."No hay session abierta a la base de datos";
        }
    }

}


 ?>