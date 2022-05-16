<?php
class ApiModelKitController
{
    function __construct()
    {
    }

    //----------------------------------------
    //MODEL KITS
    //----------------------------------------    

    public function newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki){

        //Guardado en base de datos
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        
        if (isset($_SESSION["usuarioActual"])) {

            $modelKitsBd = BdModelKit::newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $_SESSION["usuarioActual"]["id_usuario"], $linkGunplaWiki);
            
                        
            if ($modelKitsBd != false) {

                

                self::guardarImagenesModelKit($modelKitsBd, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2);
                
                $rutaBase ="http://localhost/mygunplalist/imagenes/modelKits/".$modelKitsBd;
                if ($imgPoseBaseDelante != null) {
                    $rutaImgPoseBaseDelante = $rutaBase."/imgDelante/".$imgPoseBaseDelante["name"];
                }else{
                    $rutaImgPoseBaseDelante = "";
                }
                if ($imgPoseBaseDetras != null) {
                    $rutaImgPoseBaseDetras = $rutaBase."/imgDetras/".$imgPoseBaseDetras["name"];
                }else{
                    $rutaImgPoseBaseDetras = "";
                }
                if ($imgCaja != null) {
                    $rutaImgCaja = $rutaBase."/imgCaja/".$imgCaja["name"];
                }else{
                    $rutaImgCaja = "";
                }
                if ($imgPose1 != null) {
                    $rutaImgPose1 = $rutaBase."/imgPose1/".$imgPose1["name"];
                }else{
                    $rutaImgPose1 = "";
                }
                if ($imgPose2 != null) {
                    $rutaImgPose2 = $rutaBase."/imgPose2/".$imgPose2["name"];
                }else{
                    $rutaImgPose2 = "";
                }

                BdModelKit::updateModelKit($modelKitsBd, null, null, null, null, null, $rutaImgPoseBaseDelante, $rutaImgPoseBaseDetras, $rutaImgCaja, $rutaImgPose1, $rutaImgPose2, $_SESSION["usuarioActual"]["id_usuario"], null);

                $array["status"] = true;
                $array["mensaje"] = "Model Kit creado correctamente";
            }else{
                $array["status"] = false;
                $array["mensaje"] = "Ha ocurrido un error al crear su model kit";
            }
            
            echo json_encode($array);
        }else{
            $array["status"] = false;
            $array["mensaje"] = "debes estar logueado para crear un nuevo model kit";
            echo json_encode($array);

        }

    }

    public function guardarImagenesModelKit($idModelKit, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2){

        $rutaBase ="localhost/mygunplalist/imagenes/modelKits/".$idModelKit;

        //Se guarda la imagen de la caja
        if ($imgCaja != null) {
            if (file_exists("./imagenes/modelKits/".$idModelKit."/imgCaja")) {
            
                self::rrmdir("./imagenes/modelKits/".$idModelKit."/imgCaja");            
    
            }
    
            mkdir("./imagenes/modelKits/".$idModelKit."/imgCaja", 0777, true);
            move_uploaded_file($imgCaja["tmp_name"], "./imagenes/modelKits/".$idModelKit."/imgCaja/".$imgCaja["name"]);
        }
        

        //Se guarda la imagen de la pose base delante
        if ($imgPoseBaseDelante != null) {
            if (file_exists("./imagenes/modelKits/".$idModelKit."/imgDelante")) {
                
                self::rrmdir("./imagenes/modelKits/".$idModelKit."/imgDelante");            

            }
            mkdir("./imagenes/modelKits/".$idModelKit."/imgDelante", 0777, true);
            move_uploaded_file($imgPoseBaseDelante["tmp_name"], "./imagenes/modelKits/".$idModelKit."/imgDelante/".$imgPoseBaseDelante["name"]);
        }
        
        

        //Se guarda la imagen de la pose base detras
        if ($imgPoseBaseDetras != null) {
            if (file_exists("./imagenes/modelKits/".$idModelKit."/imgDetras")) {
                
                self::rrmdir("./imagenes/modelKits/".$idModelKit."/imgDetras");            

            }
            mkdir("./imagenes/modelKits/".$idModelKit."/imgDetras", 0777, true);
            move_uploaded_file($imgPoseBaseDetras["tmp_name"], "./imagenes/modelKits/".$idModelKit."/imgDetras/".$imgPoseBaseDetras["name"]);
        }

        //Se guarda la imagen de la pose 1
        if ($imgPose1 != null) {
            if (file_exists("./imagenes/modelKits/".$idModelKit."/imgPose1")) {
                
                self::rrmdir("./imagenes/modelKits/".$idModelKit."/imgPose1");            

            }
            mkdir("./imagenes/modelKits/".$idModelKit."/imgPose1", 0777, true);
            move_uploaded_file($imgPose1["tmp_name"], "./imagenes/modelKits/".$idModelKit."/imgPose1/".$imgPose1["name"]);
        }

        //Se guarda la imagen de la pose 2
        if ($imgPose2 != null) {
            if (file_exists("./imagenes/modelKits/".$idModelKit."/imgPose2")) {
                
                self::rrmdir("./imagenes/modelKits/".$idModelKit."/imgPose2");            

            }
            mkdir("./imagenes/modelKits/".$idModelKit."/imgPose2", 0777, true);
            move_uploaded_file($imgPose2["tmp_name"], "./imagenes/modelKits/".$idModelKit."/imgPose2/".$imgPose2["name"]);
        }

    }

    public function rrmdir($dir) {
        if (is_dir($dir)) {
          $objects = scandir($dir);
          foreach ($objects as $object) {
            if ($object != "." && $object != "..") {
              if (filetype($dir."/".$object) == "dir") self::rrmdir($dir."/".$object); else unlink($dir."/".$object);
            }
          }
          reset($objects);
          rmdir($dir);
        }
     }

    public function updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {
            
            self::guardarImagenesModelKit($idModelKit, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2);
                
                $rutaBase ="http://localhost/mygunplalist/imagenes/modelKits/".$idModelKit;
                if ($imgPoseBaseDelante != null) {
                    $rutaImgPoseBaseDelante = $rutaBase."/imgDelante/".$imgPoseBaseDelante["name"];
                }else{
                    $rutaImgPoseBaseDelante = "";
                }
                if ($imgPoseBaseDetras != null) {
                    $rutaImgPoseBaseDetras = $rutaBase."/imgDetras/".$imgPoseBaseDetras["name"];
                }else{
                    $rutaImgPoseBaseDetras = "";
                }
                if ($imgCaja != null) {
                    $rutaImgCaja = $rutaBase."/imgCaja/".$imgCaja["name"];
                }else{
                    $rutaImgCaja = "";
                }
                if ($imgPose1 != null) {
                    $rutaImgPose1 = $rutaBase."/imgPose1/".$imgPose1["name"];
                }else{
                    $rutaImgPose1 = "";
                }
                if ($imgPose2 != null) {
                    $rutaImgPose2 = $rutaBase."/imgPose2/".$imgPose2["name"];
                }else{
                    $rutaImgPose2 = "";
                }

                $modelKitsBd = BdModelKit::updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $rutaImgPoseBaseDelante, $rutaImgPoseBaseDetras, $rutaImgCaja, $rutaImgPose1, $rutaImgPose2, $_SESSION["usuarioActual"]["id_usuario"], $linkGunplaWiki);

            if ($modelKitsBd == true) {
                $array["status"] = true;
                $array["mensaje"] = "Model Kit actualizado correctamente";
                
            }else{
                $array["status"] = false;
                $array["mensaje"] = "Ha ocurrido un error al actualizar su model kit";
            }
        }else{
            $array["status"] = false;
            $array["mensaje"] = "debes estar logueado para modificar un model kit";
        }

        echo json_encode($array);
        
    }

    public function getModificacionesModelKit($idModelKit){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        $modelKitsBd = BdModelKit::getModificacionesModelKit($idModelKit);

        if ($modelKitsBd != false) {
            $array["status"] = true;
            $array["mensaje"] = "Cambios del Model Kit obtenidos correctamente";
            $array["modificaciones"] = array();
            foreach ($modelKitsBd as $modelKitBd) {
                $aux = array();

                $aux["fk_model_kit"] = $modelKitBd["fk_model_kit"];
                $aux["fk_usuario"] = $modelKitBd["fk_usuario"];
                $aux["username"] = $modelKitBd["username"];
                $aux["fecha_modificacion"] = $modelKitBd["fecha_modificacion"];                


                array_push($array["modificaciones"], $aux);
            } 
        }else{
            $array["status"] = false;
            $array["mensaje"] = "Ha ocurrido un error al obtener las modificaciones de su model kit";
        }

        echo json_encode($array);
    }

    

    public function getAllModelKits($pagina, $orden, $notaMinima, $notaMaxima, $textoBuscador, $grado){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        $modelKitsBd = BdModelKit::getAllModelKits($pagina, $orden, $notaMinima, $notaMaxima, $textoBuscador, $grado);

        if ($modelKitsBd != false) {
            $array["status"] = true;
            $array["mensaje"] = "Model Kits obtenidos correctamente";
            $array["modelKits"] = array();
            foreach ($modelKitsBd as $modelKitBd) {
                $aux = array();

                $aux["id_model_kit"] = $modelKitBd["id_model_kit"];
                $aux["nombre"] = $modelKitBd["nombre"];
                $aux["grado"] = $modelKitBd["grado"];
                $aux["escala"] = $modelKitBd["escala"];
                $aux["descripcion"] = $modelKitBd["descripcion"];
                $aux["fecha_salida"] = $modelKitBd["fecha_salida"];
                $aux["nota"] = $modelKitBd["nota"];
                if (isset($_SESSION["usuarioActual"])) {
                    $modelKitLista = BdUsuarios::getUserListModelKit($_SESSION["usuarioActual"]["id_usuario"], $modelKitBd["id_model_kit"]);
                    if ($modelKitLista){
                        $aux["modelKitUserData"] = array();
                        foreach ($modelKitLista as $modelKitListaBd) {
                            $aux["modelKitUserData"]["estado"] = $modelKitListaBd["estado"];
                            $aux["modelKitUserData"]["nota_dificultad"] = $modelKitListaBd["nota_dificultad"];
                            $aux["modelKitUserData"]["nota_acabado_OOB"] = $modelKitListaBd["nota_acabado_OOB"];
                            $aux["modelKitUserData"]["nota_calidad"] = $modelKitListaBd["nota_calidad"];
                            $aux["modelKitUserData"]["nota_poses"] = $modelKitListaBd["nota_poses"];
                            $aux["modelKitUserData"]["nota_media_usuario"] = $modelKitListaBd["nota_media_usuario"];
                        }
                    }else{
                        $aux["modelKitUserData"] = null;
                    }
                }else{
                    $aux["modelKitUserData"] = null;
                }
                $aux["puesto_nota"] = $modelKitBd["puesto_nota"];
                $aux["popularidad"] = $modelKitBd["popularidad"];
                $aux["puesto_popularidad"] = $modelKitBd["puesto_popularidad"];
                $aux["link_gunpla_wiki"] = $modelKitBd["link_gunpla_wiki"];
                $aux["img_pose_base_delante"] = $modelKitBd["img_pose_base_delante"];
                $aux["img_pose_base_detras"] = $modelKitBd["img_pose_base_detras"];
                $aux["img_caja"] = $modelKitBd["img_caja"];
                $aux["img_pose1"] = $modelKitBd["img_pose1"];
                $aux["img_pose2"] = $modelKitBd["img_pose2"];

                array_push($array["modelKits"], $aux);
            }
            $array["totalElements"] = BdModelKit::getCountAllModelKits($notaMinima, $notaMaxima, $textoBuscador, $grado);

        }else{
            $array["status"] = false;
            $array["mensaje"] = "Ha ocurrido un error al obtener los model kits";
        }

        echo json_encode($array);

    }

    public function getModelKitById($idModelKit){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        $modelKitsBd = BdModelKit::getModelKitById($idModelKit);

        if ($modelKitsBd != false) {
            $array["status"] = true;
            $array["mensaje"] = "Model Kit obtenido correctamente";
            $array["modelKits"] = array();
            foreach ($modelKitsBd as $modelKitBd) {
                $aux = array();

                $aux["id_model_kit"] = $modelKitBd["id_model_kit"];
                $aux["nombre"] = $modelKitBd["nombre"];
                $aux["grado"] = $modelKitBd["grado"];
                $aux["escala"] = $modelKitBd["escala"];
                $aux["descripcion"] = $modelKitBd["descripcion"];
                $aux["fecha_salida"] = $modelKitBd["fecha_salida"];                
                if (isset($_SESSION["usuarioActual"])) {
                    $modelKitLista = BdUsuarios::getUserListModelKit($_SESSION["usuarioActual"]["id_usuario"], $modelKitBd["id_model_kit"]);
                    if ($modelKitLista){
                        $aux["modelKitUserData"] = array();
                        foreach ($modelKitLista as $modelKitListaBd) {
                            $aux["modelKitUserData"]["estado"] = $modelKitListaBd["estado"];
                            $aux["modelKitUserData"]["nota_dificultad"] = $modelKitListaBd["nota_dificultad"];
                            $aux["modelKitUserData"]["nota_acabado_OOB"] = $modelKitListaBd["nota_acabado_OOB"];
                            $aux["modelKitUserData"]["nota_calidad"] = $modelKitListaBd["nota_calidad"];
                            $aux["modelKitUserData"]["nota_poses"] = $modelKitListaBd["nota_poses"];
                            $aux["modelKitUserData"]["nota_media_usuario"] = $modelKitListaBd["nota_media_usuario"];
                        }
                    }else{
                        $aux["modelKitUserData"] = null;
                    }
                }else{
                    $aux["modelKitUserData"] = null;
                }
                $aux["nota"] = $modelKitBd["nota"];
                $aux["puesto_nota"] = $modelKitBd["puesto_nota"];
                $aux["popularidad"] = $modelKitBd["popularidad"];
                $aux["puesto_popularidad"] = $modelKitBd["puesto_popularidad"];
                $aux["nota_dificultad"] = $modelKitBd["nota_dificultad"];  
                $aux["nota_acabado_OOB"] = $modelKitBd["nota_acabado_OOB"]; 
                $aux["nota_calidad"] = $modelKitBd["nota_calidad"]; 
                $aux["nota_poses"] = $modelKitBd["nota_poses"]; 
                $aux["link_gunpla_wiki"] = $modelKitBd["link_gunpla_wiki"];
                $aux["img_pose_base_delante"] = $modelKitBd["img_pose_base_delante"];
                $aux["img_pose_base_detras"] = $modelKitBd["img_pose_base_detras"];
                $aux["img_caja"] = $modelKitBd["img_caja"];
                $aux["img_pose1"] = $modelKitBd["img_pose1"];
                $aux["img_pose2"] = $modelKitBd["img_pose2"];

                array_push($array["modelKits"], $aux);
            }
        }else{
            $array["status"] = false;
            $array["mensaje"] = "Ha ocurrido un error al obtener su model kits";
        }

        echo json_encode($array);

    }

    public function getTopModelKitsOrdered($numeroRegistros, $orden, $dias){
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        $modelKitsBd = BdModelKit::getTopModelKitsOrdered($numeroRegistros, $orden, $dias);

        if ($modelKitsBd != false) {
            $array["status"] = true;
            $array["mensaje"] = "Model Kits obtenidos correctamente";
            $array["modelKits"] = array();
            foreach ($modelKitsBd as $modelKitBd) {
                $aux = array();

                $aux["id_model_kit"] = $modelKitBd["id_model_kit"];
                $aux["nombre"] = $modelKitBd["nombre"];
                $aux["grado"] = $modelKitBd["grado"];
                $aux["escala"] = $modelKitBd["escala"];
                $aux["descripcion"] = $modelKitBd["descripcion"];
                $aux["fecha_salida"] = $modelKitBd["fecha_salida"];
                $aux["nota"] = $modelKitBd["nota"];
                if (isset($_SESSION["usuarioActual"])) {
                    $modelKitLista = BdUsuarios::getUserListModelKit($_SESSION["usuarioActual"]["id_usuario"], $modelKitBd["id_model_kit"]);
                    if ($modelKitLista){
                        $aux["modelKitUserData"] = array();
                        foreach ($modelKitLista as $modelKitListaBd) {
                            $aux["modelKitUserData"]["estado"] = $modelKitListaBd["estado"];
                            $aux["modelKitUserData"]["nota_dificultad"] = $modelKitListaBd["nota_dificultad"];
                            $aux["modelKitUserData"]["nota_acabado_OOB"] = $modelKitListaBd["nota_acabado_OOB"];
                            $aux["modelKitUserData"]["nota_pos_pers"] = $modelKitListaBd["nota_pos_pers"];
                            $aux["modelKitUserData"]["nota_calidad"] = $modelKitListaBd["nota_calidad"];
                            $aux["modelKitUserData"]["nota_poses"] = $modelKitListaBd["nota_poses"];
                            $aux["modelKitUserData"]["nota_media_usuario"] = $modelKitListaBd["nota_media_usuario"];
                        }
                    }else{
                        $aux["modelKitUserData"] = null;
                    }
                }else{
                    $aux["modelKitUserData"] = null;
                }
                $aux["puesto_nota"] = $modelKitBd["puesto_nota"];
                $aux["popularidad"] = $modelKitBd["popularidad"];
                $aux["puesto_popularidad"] = $modelKitBd["puesto_popularidad"];
                $aux["link_gunpla_wiki"] = $modelKitBd["link_gunpla_wiki"];
                $aux["img_pose_base_delante"] = $modelKitBd["img_pose_base_delante"];
                $aux["img_pose_base_detras"] = $modelKitBd["img_pose_base_detras"];
                $aux["img_caja"] = $modelKitBd["img_caja"];
                $aux["img_pose1"] = $modelKitBd["img_pose1"];
                $aux["img_pose2"] = $modelKitBd["img_pose2"];

                array_push($array["modelKits"], $aux);
            } 
        }else{
            $array["status"] = false;
            $array["mensaje"] = "Ha ocurrido un error al obtener los model kits";
        }

        echo json_encode($array);
    }

    
}