<?php

    session_start();
    require("controller/AppController.php");
    require("controller/ApiUserController.php");
    require("controller/ApiModelKitController.php");
    require_once('model/bd.php');
    require_once('model/bdUsuarios.php');
    require_once('model/bdModelKit.php');
        
    $appController = new AppController;
    $apiUserController = new ApiUserController;
    $apiModelKitController = new ApiModelKitController;
    $home = "/mygunplalist/index.php/";
    $ruta = str_replace($home, "", $_SERVER["REQUEST_URI"]);
    $array_ruta = array_filter(explode("/",$ruta));

    if (isset($array_ruta[0]) && $array_ruta[0] == "login") {
        $appController->login();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "home") { //PAGINA PRINCIPAL
        $appController->home();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "modelKits") { //PAGINA PRINCIPAL
        $appController->modelKits();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuarios") { //Usuarios  API 
        $apiUserController->getUsuarios($_POST["pagina"], $_POST["cantidadRegistros"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuario") {
        $apiUserController->getUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoUsuario") {
        $apiUserController->newUsuario($_POST["username"], password_hash($_POST["password"], PASSWORD_DEFAULT), $_POST["email"]);
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
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "addToMisGunplas") {
        $idModelKit = $_POST["idModelKit"];
        $apiUserController->addToMisGunplas($idModelKit);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "patchEstadoMisGunplas") {
        $idModelKit = $_POST["idModelKit"];
        $estado = $_POST["estado"];
        $apiUserController->patchEstadoMisGunplas($idModelKit, $estado);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "ponerNota") {
        $idModelKit = $_POST["idModelKit"];
        $notaDificultad = $_POST["notaDificultad"];
        $notaOOB = $_POST["notaOOB"];
        $notaPersonalizacion = $_POST["notaPersonalizacion"];
        $notaCalidad = $_POST["notaCalidad"];
        $notaPoses = $_POST["notaPoses"];
        $apiUserController->ponerNota($idModelKit, $notaDificultad, $notaOOB, $notaPersonalizacion, $notaCalidad, $notaPoses);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getUserList") {
        $estado = $_POST["estado"];
        $idUsuario = $_POST["idUsuario"];
        $apiUserController->getUserList($idUsuario, $estado);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoModelKit") {                                  //MODEL KITS
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
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getModificacionesModelKit") {
        $idModelKit = $array_ruta[2];
        $apiModelKitController->getModificacionesModelKit($idModelKit);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getAllModelKits") {
        $pagina = $_POST["pagina"];
        $orden = $_POST["orden"];
        $notaMinima = $_POST["notaMinima"];
        $notaMaxima = $_POST["notaMaxima"];
        $textoBuscador = $_POST["textoBuscador"];
        $grado = $_POST["grado"];
        $apiModelKitController->getAllModelKits($pagina, $orden, $notaMinima, $notaMaxima, $textoBuscador, $grado);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getModelKitById") {
        $apiModelKitController->getModelKitById($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getTopModelKitsByDate") {
        $numeroRegistros = $_POST["numeroRegistros"];
        $orden = $_POST["orden"];
        $dias = $_POST["dias"];
        $apiModelKitController->getTopModelKitsByDate($numeroRegistros, $orden, $dias);
    }else if(count($array_ruta)==0){ //Pagina mostrada por defecto
        header("Location: ".$_SERVER["REQUEST_URI"]."home");
    }else{
        header("Location: ".$_SERVER["REQUEST_URI"]."index.php/home");
    }