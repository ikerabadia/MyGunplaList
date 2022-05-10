<?php
class ApiModelKitController
{
    function __construct()
    {
    }

    //----------------------------------------
    //MODEL KITS
    //----------------------------------------    

    public function newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        
        if (isset($_SESSION["usuarioActual"])) {
            $modelKitsBd = BdModelKit::newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $_SESSION["usuarioActual"]["id_usuario"], $linkGunplaWiki);
            
            /* foreach ($modelKitsBd as $modelKitBd) {
                $aux = array();
                $aux["id_model_kit"] = $modelKitBd["id_model_kit"];
                $aux["nombre"] = $modelKitBd["nombre"];
                $aux["grado"] = $modelKitBd["grado"];
                $aux["escala"] = $modelKitBd["escala"];
                $aux["descripcion"] = $modelKitBd["descripcion"];
                $aux["fecha_salida"] = $modelKitBd["fecha_salida"];
                $aux["img_pose_base_delante"] = $modelKitBd["img_pose_base_delante"];
                $aux["img_pose_base_detras"] = $modelKitBd["img_pose_base_detras"];
                $aux["img_caja"] = $modelKitBd["img_caja"];
                $aux["img_pose1"] = $modelKitBd["img_pose1"];
                $aux["img_pose2"] = $modelKitBd["img_pose2"];

                $array["respuesta"] = true;
                $array["usuario"] = $aux;
            } */
            if ($modelKitsBd == true) {
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

    public function updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $linkGunplaWiki)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {
            $modelKitsBd = BdModelKit::updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $_SESSION["usuarioActual"]["id_usuario"], $linkGunplaWiki);

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
                $aux["nota"] = $modelKitBd["nota"];
                $aux["puesto_nota"] = $modelKitBd["puesto_nota"];
                $aux["popularidad"] = $modelKitBd["popularidad"];
                $aux["puesto_popularidad"] = $modelKitBd["puesto_popularidad"];
                $aux["nota_dificultad"] = $modelKitBd["nota_dificultad"];  
                $aux["nota_acabado_OOB"] = $modelKitBd["nota_acabado_OOB"]; 
                $aux["nota_pos_pers"] = $modelKitBd["nota_pos_pers"]; 
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