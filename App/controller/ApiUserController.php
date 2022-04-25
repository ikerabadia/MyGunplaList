<?php
class ApiUserController
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
        $usuariosbd = BdUsuarios::getUsuarios($pagina, $cantidadRegistros);
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
        $usuariosbd = BdUsuarios::getUser($idUsuario);
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
        $usuariosbd = BdUsuarios::newUsuario($username, $password, $email);
        
        echo json_encode($usuariosbd);
    }
    
    
    public function deleteUsuario($idUsuario)
    {
        //if (isset($_SESSION["usuarioActual"]) and $_SESSION["usuarioActual"]["admin"] == 1) {
            header("Content-Type: application/json', 'HTTP/1.1 200 OK");
            $array = array();
            $array["usuario"] = array();
            $reseñasbd = BdUsuarios::deleteUsuario($idUsuario);
                
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
        $usuariosbd = BdUsuarios::updateUsuario($idUsuario, $username, $password, $img_usuario, $email);
        
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
        
        BdUsuarios::guardarImagenUsuario($idUsuario, $ruta);
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
        $imagenesbd = BdUsuarios::getImagenUsuario($idUsuario);
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
        $imagenbd = BdUsuarios::deleteImagenUsuario($idUsuario);
                
        echo json_encode($imagenbd);        
        
    }
    

    public function bajaUsuario(){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        

        $array = array();
        $array["resultado"] = "";

        
        /* echo $_SESSION["usuarioActual"]["idUsuario"]; */

        if (isset($_SESSION["usuarioActual"])) {
            $idUsuario = $_SESSION["usuarioActual"]["idUsuario"];
            BdUsuarios::deleteUsuario($idUsuario);
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

            $usuariosbd = BdUsuarios::getUser($_SESSION["usuarioActual"]["id_usuario"]);
            foreach ($usuariosbd as $usuariobd) {
                $aux = array();
                $aux["id_usuario"] = $usuariobd["id_usuario"];
                $aux["username"] = $usuariobd["username"];
                $aux["password"] = $usuariobd["password"];
                $aux["img_usuario"] = $usuariobd["img_usuario"];
                $aux["email"] = $usuariobd["email"];
                if ($usuariobd["moderador"] == 1) {
                    $aux["moderador"] = true;
                }else{
                    $aux["moderador"] = false;
                }
                

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

        $login = BdUsuarios::getLogin($user, $password);

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
        $mejorValoradosbd = BdUsuarios::getImagenesMejorValorados();
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
        $preferidos = BdUsuarios::getImagenesPreferidos($idUsuario);
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
        $baresbd = BdUsuarios::getBaresFiltradosNombreDescripcion($textoBuscador);

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
        $pinchosbd = BdUsuarios::getPinchosFiltradosNombreDescripcionTextoResena($textoBuscador, 0, 100, 0, 10);

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

    public function addToMisGunplas($idModelKit){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {

            $idUsuario = $_SESSION["usuarioActual"]["id_usuario"];
            $bdUsuarios = BdUsuarios::addToMisGunplas($idModelKit, $idUsuario);

            if ($bdUsuarios == true) {
                $array["status"] = true;
                $array["mensaje"] = "Model Kit añadido a tus gunplas correctamente";
            }else{
                $array["status"] = false;
                $array["mensaje"] = "El model kit ya esta entre tus gunplas";
            }    

        }else{
            $array["status"] = false;
            $array["mensaje"] = "debes estar logueado para añadir un model kit a tus gunplas";
        }

        echo json_encode($array);
    }

    public function patchEstadoMisGunplas($idModelKit, $estado){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {

            if ($estado < 0 || $estado > 3) {
                $array["status"] = false;
                $array["mensaje"] = "El estado introducido no es un estado valido, el estado debe ser un numero entre el 0 y el 3, ambos incluidos";
            }else{

                $idUsuario = $_SESSION["usuarioActual"]["id_usuario"];
                $bdUsuarios = BdUsuarios::patchEstadoMisGunplas($idModelKit, $idUsuario, $estado);    

                if ($bdUsuarios == true) {
                    $array["status"] = true;
                    $array["mensaje"] = "El estado del model kit se ha modificado correctamente";
                }else{
                    $array["status"] = false;
                    $array["mensaje"] = "ha ocurrido un error al modificar el estado del model kit";
                } 

            }

        }else{
            $array["status"] = false;
            $array["mensaje"] = "Debes estar logueado para modificar el estado de uno de tus gunplas";
        }

        echo json_encode($array);
    }

    //poner nota a partir de las puntuaciones recibidas del index.php
    public function ponerNota($idModelKit, $notaDificultad, $notaOOB, $notaPersonalizacion, $notaCalidad, $notaPoses){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {

            $idUsuario = $_SESSION["usuarioActual"]["id_usuario"];
            $notaMedia = ($notaDificultad + $notaOOB + $notaPersonalizacion + $notaCalidad + $notaPoses) / 5;
            $bdUsuarios = BdUsuarios::ponerNota($idModelKit, $idUsuario, $notaDificultad, $notaOOB, $notaPersonalizacion, $notaCalidad, $notaPoses, $notaMedia);

            if ($bdUsuarios == true) {
                $array["status"] = true;
                $array["mensaje"] = "La nota se ha modificado correctamente";
            }else{
                $array["status"] = false;
                $array["mensaje"] = "ha ocurrido un error al modificar la nota";
            }    

        }else{
            $array["status"] = false;
            $array["mensaje"] = "Debes estar logueado para modificar la nota de uno de tus gunplas";
        }

        echo json_encode($array);
    }


}
