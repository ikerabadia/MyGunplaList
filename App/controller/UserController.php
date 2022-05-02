<?php
use mailer\mailer;
class UserController
{
    public function login()
    {
        require("view/loginRegister/loginRegister.html");
    }
    //LOGIN RESPUESTA    
    /**
     * loginRespuesta
     *
     * @return void
     */
    public function loginRespuesta()
    {

        //Obtengo los datos y los guardo en variables
        $usuario = $_POST['user'];
        $contraseña = $_POST['password'];

        $login = Conexion::getLogin($usuario, $contraseña);

        if ($login->rowCount() == 1) {
            $_SESSION["usuarioActual"] = $login->fetch();
            $_SESSION["login"] = "";

            //var_dump($_SESSION["usuarioActual"]["admin"]);

            $rutaDestino = UserController::getRuta("restaurantes", "loginRespuesta");
            header('location: ' . $rutaDestino);
        } else {
            $_SESSION["login"] = "Login incorrecto";

            //var_dump($login->rowCount());

            $rutaDestino = UserController::getRuta("login", "loginRespuesta");
            header('location: ' . $rutaDestino);
        }
    }

    /*----------------------------------------------------------------------------------------------------------*/
    //RESTAURANTES
    /*----------------------------------------------------------------------------------------------------------*/
    public function restaurantes()
    {
        require("view/listadoRestaurantes/restaurantes.html");
    }
    public function restaurante(){
        require("view/fichaRestaurante/restaurante.html");
    }


    /*----------------------------------------------------------------------------------------------------------*/
    //PINCHOS
    /*----------------------------------------------------------------------------------------------------------*/
    public function pinchos()
    {
        require("view/listadoPinchos/pinchos.html");
    }
    public function pincho(){
        require("view/fichaPincho/pincho.html");
    }

    /*----------------------------------------------------------------------------------------------------------*/
    //RESEÑAS
    /*----------------------------------------------------------------------------------------------------------*/
    public function reseñas()
    {
        require("view/listadoReseñas/reseñas.html");
    }

    /*----------------------------------------------------------------------------------------------------------*/
    //USUARIOS
    /*----------------------------------------------------------------------------------------------------------*/
    public function usuarios()
    {
        require("view/listadoUsuarios/listadoUsuarios.html");
    }
    public function usuario(){
        require("view/fichaUsuario/usuario.html");
    }

    /*----------------------------------------------------------------------------------------------------------*/
    //PAGINAS ERROR
    /*----------------------------------------------------------------------------------------------------------*/
    public function error404()
    {
        require("view/paginasError/error404/404.html");
    }
    public function error500()
    {
        require("view/paginasError/error500/500.html");
    }


    /*----------------------------------------------------------------------------------------------------------*/
    //ZONA DE FRONT / PAGINA PRINCIPAL
    /*----------------------------------------------------------------------------------------------------------*/
    public function home(){
        require("view/home/home.html");
    }
    /*----------------------------------------------------------------------------------------------------------*/
    //LOGIN REGISTER
    /*----------------------------------------------------------------------------------------------------------*/
    public function frontLoginRegister(){
        require("viewFrontal/loginRegister/loginRegister.html");
    }
    /*----------------------------------------------------------------------------------------------------------*/
    //MAPA
    /*----------------------------------------------------------------------------------------------------------*/
    public function mapa(){
        require("viewFrontal/mapa/mapa.html");
    }

    /* ZONA DE USUARIO */
    public function infoPersonal(){
        require("viewFrontal/pagUsuario/infoPersonal/infoPersonal.html");
    }
    public function reseñasLikeadas(){
        require("viewFrontal/pagUsuario/reseñasLikeadas/reseñasLikeadas.html");
    }
    public function reseñasPublicadas(){
        require("viewFrontal/pagUsuario/reseñasPublicadas/reseñasPublicadas.html");
    }

    /*BARES FRONT*/
    public function baresFront(){
        require("viewFrontal/bares/bares.html");
    }
    public function barFront(){
        require("viewFrontal/bar/bar.html");
    }
    /*PINCHOS FRONT*/
    public function pinchoFront(){
        require("viewFrontal/pincho/pincho.html");
    }
    public function pinchosFront(){
        require("viewFrontal/pinchos/pinchos.html");
    }

    /*----------------------------------------------------------------------------------------------------------*/
    /*GET RUTA*/
    /*----------------------------------------------------------------------------------------------------------*/    
    /**
     * getRuta
     *
     * @param  mixed $accionDestino
     * @param  mixed $accionActual
     * @return accion
     */
    static function getRuta($accionDestino, $accionActual)
    {
        $rutaActual = "http://" . $_SERVER["HTTP_HOST"] . $_SERVER["REQUEST_URI"];
        $ruta = str_replace($accionActual, "", $rutaActual);
        $accion =  $ruta . $accionDestino;
        return $accion;
    }
}
