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

    if (isset($array_ruta[0]) && $array_ruta[0] == "login") { //Login
        $appController->login();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "home") { //PAGINA PRINCIPAL
        $appController->home();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "modelKits") { //Pagina de busqueda de model kits
        $appController->modelKits();
    }else if (isset($array_ruta[0]) && preg_match('/modelKit/', $array_ruta[0])) { //Ficha de model kit
        $appController->modelKit();
    }else if (isset($array_ruta[0]) && preg_match('/usuario/', $array_ruta[0])) { //Ficha de model kit
        $appController->usuario();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "top") { //Top model kits
        $appController->top();
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuarios") { //Usuarios  API 
        $apiUserController->getUsuarios($_POST["pagina"], $_POST["cantidadRegistros"]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "usuario") {
        $apiUserController->getUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoUsuario") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        $email = $_POST["email"];
        $linkInstagram = "";
        if (isset($_POST["link_instagram"])) {
            $linkInstagram = $_POST["link_instagram"];
        }
        $linkYoutube = "";
        if (isset($_POST["link_youtube"])) {
            $linkYoutube = $_POST["link_youtube"];
        }        
        
        $apiUserController->newUsuario($username, password_hash($password, PASSWORD_DEFAULT), $email, $linkInstagram, $linkYoutube);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteUsuario") {
        $apiUserController->deleteUsuario($array_ruta[2]);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "updateUsuario") {
        $username = $_POST["username"];
        $password = $_POST["password"];
        
        if ($password != "null" && $password != null && $password != "") {
            $password = password_hash($password, PASSWORD_DEFAULT);
        }
        $email = $_POST["email"];
        $linkInstagram = $_POST["link_instagram"];
        $linkYoutube = $_POST["link_youtube"];
        if (isset($_FILES["img_usuario"])) {
            $img_usuario = $_FILES["img_usuario"];
        }else{
            $img_usuario = null;
        }
        $apiUserController->updateUsuario($array_ruta[2], $username, $password, $img_usuario, $email, $linkInstagram, $linkYoutube);
    } else if (isset($array_ruta[0]) && $array_ruta[0]=="api" && $array_ruta[1] == "guardarImagenUsuario") { //Esto lo dejo aqui para saber como se guarda la imagen
        $idUsuario = $_POST["usuario"];
        $imagen = $_FILES["imagen"];
        $apiUserController->guardarImagenUsuario($idUsuario,$imagen);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getUsuarioLogueado") {
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
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "deleteFromMisGunplas") {
        $idModelKit = $_POST["idModelKit"];
        $apiUserController->deleteFromMisGunplas($idModelKit);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "patchEstadoMisGunplas") {
        $idModelKit = $_POST["idModelKit"];
        $estado = $_POST["estado"];
        $apiUserController->patchEstadoMisGunplas($idModelKit, $estado);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "ponerNota") {
        $idModelKit = $_POST["idModelKit"];
        $notaDificultad = $_POST["notaDificultad"];
        $notaOOB = $_POST["notaOOB"];
        $notaCalidad = $_POST["notaCalidad"];
        $notaPoses = $_POST["notaPoses"];
        $notaGeneral = $_POST["notaGeneral"];
        $apiUserController->ponerNota($idModelKit, $notaDificultad, $notaOOB, $notaCalidad, $notaPoses, $notaGeneral);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getUserList") {
        $estado = $_POST["estado"];
        $idUsuario = $_POST["idUsuario"];
        $textoBuscador = $_POST["textoBuscador"];
        $apiUserController->getUserList($idUsuario, $estado, $textoBuscador);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "nuevoModelKit") {                                  //MODEL KITS
        $nombre = $_POST["nombre"];
        $grado = $_POST["grado"];
        $escala = $_POST["escala"];
        $descripcion = $_POST["descripcion"];
        $fechaSalida = $_POST["fechaSalida"];

        if (isset($_FILES["imgPoseBaseDelante"])) {
            $imgPoseBaseDelante = $_FILES["imgPoseBaseDelante"];
        }else{
            $imgPoseBaseDelante = null;
        }

        if (isset($_FILES["imgPoseBaseDetras"])) {
            $imgPoseBaseDetras = $_FILES["imgPoseBaseDetras"];
        }else{
            $imgPoseBaseDetras = null;
        }

        if (isset($_FILES["imgCaja"])) {
            $imgCaja = $_FILES["imgCaja"];
        }else{
            $imgCaja = null;
        }
        
        if (isset($_FILES["imgPose1"])) {
            $imgPose1 = $_FILES["imgPose1"];
        }else{
            $imgPose1 = null;
        }

        if (isset($_FILES["imgPose2"])) {
            $imgPose2 = $_FILES["imgPose2"];
        }else{
            $imgPose2 = null;
        }
        
        $linkGunplaWiki = $_POST["linkGunplaWiki"];

        $apiModelKitController->newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki);
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "updateModelKit") {
        $idModelKit = $array_ruta[2];
        $nombre = $_POST["nombre"];
        $grado = $_POST["grado"];
        $escala = $_POST["escala"];
        $descripcion = $_POST["descripcion"];
        $fechaSalida = $_POST["fechaSalida"];
        if (isset($_FILES["imgPoseBaseDelante"])) {
            $imgPoseBaseDelante = $_FILES["imgPoseBaseDelante"];
        }else{
            $imgPoseBaseDelante = null;
        }

        if (isset($_FILES["imgPoseBaseDetras"])) {
            $imgPoseBaseDetras = $_FILES["imgPoseBaseDetras"];
        }else{
            $imgPoseBaseDetras = null;
        }

        if (isset($_FILES["imgCaja"])) {
            $imgCaja = $_FILES["imgCaja"];
        }else{
            $imgCaja = null;
        }
        
        if (isset($_FILES["imgPose1"])) {
            $imgPose1 = $_FILES["imgPose1"];
        }else{
            $imgPose1 = null;
        }

        if (isset($_FILES["imgPose2"])) {
            $imgPose2 = $_FILES["imgPose2"];
        }else{
            $imgPose2 = null;
        }
        $linkGunplaWiki = $_POST["linkGunplaWiki"];
        $apiModelKitController->updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki);
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
    }else if (isset($array_ruta[0]) && $array_ruta[0] == "api" && $array_ruta[1] == "getTopModelKitsOrdered") {
        $numeroRegistros = $_POST["numeroRegistros"];
        $orden = $_POST["orden"];
        $dias = $_POST["dias"];
        $apiModelKitController->getTopModelKitsOrdered($numeroRegistros, $orden, $dias);
    }else if(count($array_ruta)==0){ //Pagina mostrada por defecto
        header("Location: ".$_SERVER["REQUEST_URI"]."home");
    }else{
        header("Location: ".$_SERVER["REQUEST_URI"]."index.php/home");
    }