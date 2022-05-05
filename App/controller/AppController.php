<?php
use mailer\mailer;
class AppController
{
    public function login()
    {
        require("view/loginRegister/loginRegister.html");
    }

    public function home(){
        require("view/home/home.html");
    }

    public function modelKits(){
        require("view/modelKits/modelKits.html");
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
