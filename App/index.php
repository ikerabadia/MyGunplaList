<?php

    session_start();
    require("controller/UserController.php");
    require("controller/ApiController.php");
    require_once('model/bd.php');
        
    $userController = new UserController;
    $apiController = new ApiController;
    $home = "/mygunplalist/index.php/";
    $ruta = str_replace($home, "", $_SERVER["REQUEST_URI"]);
    $array_ruta = array_filter(explode("/",$ruta));

    if (isset($array_ruta[0]) && $array_ruta[0] == "login") {
        $userController->index();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "home") { //PAGINA PRINCIPAL
        $userController->home();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuarios") { //Usuarios  API API API API
        $apiController->getUsuarios($_POST["pagina"], $_POST["cantidadRegistros"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuario") {
        $apiController->getUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoUsuario") {
        $apiController->newUsuario($_POST["username"], $_POST["password"], $_POST["email"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteUsuario") {
        $apiController->deleteUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "updateUsuario") {
        $apiController->updateUsuario($array_ruta[2], $_POST["username"], $_POST["password"], $_POST["img_usuario"], $_POST["email"]);
    } else if (isset($array_ruta[0]) && $array_ruta[0]=="api" && $array_ruta[1] == "guardarImagenUsuario") { //Esto lo dejo aqui para saber como se guarda la imagen
        $idUsuario = $_POST["usuario"];
        $imagen = $_FILES["imagen"];
        $apiController->guardarImagenUsuario($idUsuario,$imagen);
    }/* else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getImagenUsuario") {
        $apiController->getImagenUsuario($array_ruta[2]);
    } else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteImagenUsuario") {
        $apiController->deleteImagenUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "bajaUsuario") {
        $apiController->bajaUsuario();
    }*/else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getUsuarioLogueado") {
        $apiController->getUsuarioLogueado();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "loginFront") {
        $user = $_POST["user"];
        $password = $_POST["password"];
        $apiController->loginFront($user, $password);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "logout") {
        $apiController->logout();
    }else if(count($array_ruta)==0){ //Pagina mostrada por defecto
        header("Location: ".$_SERVER["REQUEST_URI"]."home");
    }else{
        header("Location: ".$_SERVER["REQUEST_URI"]."index.php/home");
    }