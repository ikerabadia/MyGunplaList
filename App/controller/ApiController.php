<?php
class ApiController
{

    function __construct()
    {
    }

    
    //----------------------------------------
    //USUARIOS
    //----------------------------------------    
    
    public function getUsuarios($pagina, $cantidadRegistros)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["usuarios"] = array();
        $usuariosbd = Conexion::getUsuarios($pagina, $cantidadRegistros);
        foreach ($usuariosbd as $usuario) {
            $aux = array();
            $aux["id_usuario"] = $usuario["id_usuario"];
            $aux["username"] = $usuario["username"];
            $aux["password"] = $usuario["password"];
            $aux["img_usuario"] = $usuario["img_usuario"];
            $aux["email"] = $usuario["email"];
            array_push($array["usuarios"], $aux);
        }
        echo json_encode($array);
    }
    
   
    public function getUsuario($idUsuario)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["usuarios"] = array();
        $usuariosbd = Conexion::getUser($idUsuario);
        foreach ($usuariosbd as $usuario) {
            $aux = array();
            $aux["id_usuario"] = $usuario["id_usuario"];
            $aux["username"] = $usuario["username"];
            $aux["password"] = $usuario["password"];
            $aux["img_usuario"] = $usuario["img_usuario"];
            $aux["email"] = $usuario["email"];
            array_push($array["usuarios"], $aux);
        }
        echo json_encode($array);
    }
   
    public function newUsuario($username, $password, $email)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["usuario"] = array();
        $usuariosbd = Conexion::newUsuario($username, $password, $email);
        
        echo json_encode($usuariosbd);
    }
    
    
    public function deleteUsuario($idUsuario)
    {
        //if (isset($_SESSION["usuarioActual"]) and $_SESSION["usuarioActual"]["admin"] == 1) {
            header("Content-Type: application/json', 'HTTP/1.1 200 OK");
            $array = array();
            $array["usuario"] = array();
            $reseñasbd = Conexion::deleteUsuario($idUsuario);
                
            echo json_encode($reseñasbd);
        /* }else{
            $error = "operacion reservada exclusivamente a administradores";
            echo json_encode($error);
            
        } */
        
        
    }
    
    
    public function updateUsuario($idUsuario, $username, $password, $img_usuario, $email)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["usuario"] = array();
        $usuariosbd = Conexion::updateUsuario($idUsuario, $username, $password, $img_usuario, $email);
        
        echo json_encode($usuariosbd);
    }
    
    
    
    public function guardarImagenUsuario($idUsuario,$imagen)
    {
        $ruta ="http://localhost/mygunplalist/backend/imagenes/usuarios/".$idUsuario."/".$imagen["name"];

        if (!file_exists("./imagenes/usuarios/".$idUsuario)) {
            mkdir("./imagenes/usuarios/".$idUsuario, 0777, true);
        }
        if (!file_exists("./imagenes/usuarios/".$idUsuario."/".$imagen["name"])) {

            move_uploaded_file($imagen["tmp_name"], "./imagenes/usuarios/".$idUsuario."/".$imagen["name"]);
        }
        
        Conexion::guardarImagenUsuario($idUsuario, $ruta);
    }
    
    /**
     * getImagenUsuario
     *
     * @param  mixed $idUsuario
     * @return void
     */
    public function getImagenUsuario($idUsuario) //Hay que ponerlo bien
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["imagenes"] = array();
        $imagenesbd = Conexion::getImagenUsuario($idUsuario);
        foreach ($imagenesbd as $imagen) {
            $aux = array();
            $aux["id"] = $imagen["id"];
            $aux["fk_usuario"] = $imagen["fk_usuario"];
            $aux["imagen"] = $imagen["imagen"];
            array_push($array["imagenes"], $aux);
        }
        echo json_encode($array);
    }
    
    /**
     * deleteImagenUsuario
     *
     * @param  mixed $idUsuario
     * @return void
     */
    public function deleteImagenUsuario($idUsuario)
    {
        
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $imagenbd = Conexion::deleteImagenUsuario($idUsuario);
                
        echo json_encode($imagenbd);        
        
    }
    

    public function bajaUsuario(){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        

        $array = array();
        $array["resultado"] = "";

        
        /* echo $_SESSION["usuarioActual"]["idUsuario"]; */

        if (isset($_SESSION["usuarioActual"])) {
            $idUsuario = $_SESSION["usuarioActual"]["idUsuario"];
            Conexion::deleteUsuario($idUsuario);
            $array["resultado"] = "Usuario dado de baja correctamente";
            session_destroy();
        }else{
            $array["resultado"] = "No existe un usuario logueado";
        }

        echo json_encode($array);
    }

    public function getUsuarioLogueado(){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");

        if(isset($_SESSION["usuarioActual"])){
            $array = array();
            $array["usuarios"] = array();
            $usuario = array();

            $usuariosbd = Conexion::getUser($_SESSION["usuarioActual"]["id_usuario"]);
            foreach ($usuariosbd as $usuariobd) {
                $aux = array();
                $aux["id_usuario"] = $usuariobd["id_usuario"];
                $aux["username"] = $usuariobd["username"];
                $aux["password"] = $usuariobd["password"];
                $aux["img_usuario"] = $usuariobd["img_usuario"];
                $aux["email"] = $usuariobd["email"];

                //$aux["imagen"] ="";
                /* $imagenesbd = Conexion::getImagenUsuario($usuariobd["idUsuario"]);
                foreach ($imagenesbd as $imagen) {
                    $aux["imagen"] = $imagen["imagen"];
                } */
                /* array_push($array["usuarios"], $aux); */
                $usuario = $aux;
            }

            /* $usuario["idUsuario"] = $_SESSION["usuarioActual"]["idUsuario"];
            $usuario["nombre"] = $_SESSION["usuarioActual"]["nombre"];
            $usuario["apellido1"] = $_SESSION["usuarioActual"]["apellido1"];
            $usuario["apellido2"] = $_SESSION["usuarioActual"]["apellido2"];
            $usuario["correoElectronico"] = $_SESSION["usuarioActual"]["correoElectronico"];
            $usuario["user"] = $_SESSION["usuarioActual"]["user"];
            $usuario["password"] = $_SESSION["usuarioActual"]["password"];
            $usuario["admin"] = $_SESSION["usuarioActual"]["admin"]; */

            

            /* array_push($array["usuarios"], $usuario); */

            echo json_encode($usuario);
        }else{
            echo json_encode("false");
        }
    }

    public function loginFront($user, $password){

        $login = Conexion::getLogin($user, $password);

        if ($login->rowCount() == 1) {
            $_SESSION["usuarioActual"] = $login->fetch();

            echo json_encode("true");
        } else {
            echo json_encode("false");
        }

    }

    public function logout(){
        session_destroy();
    }

    //-------------------------------------
    //GENERICAS
    //-------------------------------------
    public function getImagenesSlider(){

        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["mejorValorados"] = array();
        $mejorValoradosbd = Conexion::getImagenesMejorValorados();
        foreach ($mejorValoradosbd as $imagen) {
            $aux = array();
            $aux["imagen"] = $imagen["imagen"];

            array_push($array["mejorValorados"], $aux);
        }

        $idUsuario = 0;

        if (isset($_SESSION["usuarioActual"])) {
            $idUsuario = $_SESSION["usuarioActual"]["idUsuario"];
        }

        $array["preferidos"] = array();
        $preferidos = Conexion::getImagenesPreferidos($idUsuario);
        foreach ($preferidos as $imagen) {
            $aux = array();
            $aux["imagen"] = $imagen["imagen"];

            array_push($array["preferidos"], $aux);
        }

        echo json_encode($array);

    }

    public function buscadorBaresPinchos($textoBuscador)
    {

        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        $array["bares"] = array();
        $baresbd = Conexion::getBaresFiltradosNombreDescripcion($textoBuscador);

        foreach ($baresbd as $bar) {

            $aux = array();
            $aux["idRestaurante"] = $bar["idRestaurante"];
            $aux["nombre"] = $bar["nombre"];
            $aux["descripcion"] = $bar["descripcion"];
            $aux["localizacion"] = $bar["localizacion"];
            $aux["nota"] = $bar["Puntuacion"];
            array_push($array["bares"], $aux);           
            
        }

        $array["pinchos"] = array();        
        $pinchosbd = Conexion::getPinchosFiltradosNombreDescripcionTextoResena($textoBuscador, 0, 100, 0, 10);

        foreach($pinchosbd as $pincho){
            $aux = array();
            $aux["idPincho"] = $pincho["idPincho"];
            $aux["nombre"] = $pincho["nombre"];
            $aux["precio"] = $pincho["precio"];
            $aux["fkBar"] = $pincho["fkBar"];
            $aux["nombreBar"] = $pincho["nombreBar"];
            $aux["descripcion"] = $pincho["descripcion"];
            $aux["nota"] = $pincho["notaPincho"];
            $aux["imagen1"] = $pincho["imagen1"];
            $aux["imagen2"] = $pincho["imagen2"];
            $aux["imagen3"] = $pincho["imagen3"];

            array_push($array["pinchos"], $aux);
        }
        echo json_encode($array);
    }

}