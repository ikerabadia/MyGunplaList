<?php

    session_start();
    require("controller/UserController.php");
    require("controller/ApiUserController.php");
    require("controller/ApiModelKitController.php");
    require_once('model/bd.php');
    require_once('model/bdUsuarios.php');
    require_once('model/bdModelKit.php');
        
    $userController = new UserController;
    $apiUserController = new ApiUserController;
    $apiModelKitController = new ApiModelKitController;
    $home = "/mygunplalist/index.php/";
    $ruta = str_replace($home, "", $_SERVER["REQUEST_URI"]);
    $array_ruta = array_filter(explode("/",$ruta));

    if (isset($array_ruta[0]) && $array_ruta[0] == "login") {
        $userController->index();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "home") { //PAGINA PRINCIPAL
        $userController->home();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuarios") { //Usuarios  API 
        $apiUserController->getUsuarios($_POST["pagina"], $_POST["cantidadRegistros"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuario") {
        $apiUserController->getUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoUsuario") {
        $apiUserController->newUsuario($_POST["username"], $_POST["password"], $_POST["email"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteUsuario") {
        $apiUserController->deleteUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "updateUsuario") {
        $apiUserController->updateUsuario($array_ruta[2], $_POST["username"], $_POST["password"], $_POST["img_usuario"], $_POST["email"]);
    } else if (isset($array_ruta[0]) && $array_ruta[0]=="api" && $array_ruta[1] == "guardarImagenUsuario") { //Esto lo dejo aqui para saber como se guarda la imagen
        $idUsuario = $_POST["usuario"];
        $imagen = $_FILES["imagen"];
        $apiUserController->guardarImagenUsuario($idUsuario,$imagen);
    }/* else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getImagenUsuario") {
        $apiController->getImagenUsuario($array_ruta[2]);
    } else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteImagenUsuario") {
        $apiController->deleteImagenUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "bajaUsuario") {
        $apiController->bajaUsuario();
    }*/else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getUsuarioLogueado") {
        $apiUserController->getUsuarioLogueado();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "loginFront") {
        $user = $_POST["user"];
        $password = $_POST["password"];
        $apiUserController->loginFront($user, $password);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "logout") {
        $apiUserController->logout();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoModelKit") { //MODEL KITS
        $nombre = $_POST["nombre"];
        $grado = $_POST["grado"];
        $escala = $_POST["escala"];
        $descripcion = $_POST["descripcion"];
        $fechaSalida = $_POST["fechaSalida"];
        $imgPoseBaseDelante = $_POST["imgPoseBaseDelante"];
        $imgPoseBaseDetras = $_POST["imgPoseBaseDetras"];
        $imgCaja = $_POST["imgCaja"];
        $imgPose1 = $_POST["imgPose1"];
        $imgPose2 = $_POST["imgPose2"];
        $apiModelKitController->newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "updateModelKit") {
        $idModelKit = $array_ruta[2];
        $nombre = $_POST["nombre"];
        $grado = $_POST["grado"];
        $escala = $_POST["escala"];
        $descripcion = $_POST["descripcion"];
        $fechaSalida = $_POST["fechaSalida"];
        $imgPoseBaseDelante = $_POST["imgPoseBaseDelante"];
        $imgPoseBaseDetras = $_POST["imgPoseBaseDetras"];
        $imgCaja = $_POST["imgCaja"];
        $imgPose1 = $_POST["imgPose1"];
        $imgPose2 = $_POST["imgPose2"];
        $apiModelKitController->updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2);
    }else if(count($array_ruta)==0){ //Pagina mostrada por defecto
        header("Location: ".$_SERVER["REQUEST_URI"]."home");
    }else{
        header("Location: ".$_SERVER["REQUEST_URI"]."index.php/home");
    }