<?php
class ApiModelKitController
{
    function __construct()
    {
    }

    //----------------------------------------
    //MODEL KITS
    //----------------------------------------    

    public function newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();
        
        if (isset($_SESSION["usuarioActual"])) {
            $modelKitsBd = BdModelKit::newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $_SESSION["usuarioActual"]["id_usuario"]);
            
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

    public function updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2)
    {
        header("Content-Type: application/json', 'HTTP/1.1 200 OK");
        $array = array();

        if (isset($_SESSION["usuarioActual"])) {
            $modelKitsBd = BdModelKit::updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $_SESSION["usuarioActual"]["id_usuario"]);

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

                /* $aux["id_model_kit"] = $modelKitBd["id_model_kit"];
                $aux["nombre"] = $modelKitBd["nombre"];
                $aux["grado"] = $modelKitBd["grado"];
                $aux["escala"] = $modelKitBd["escala"];
                $aux["descripcion"] = $modelKitBd["descripcion"];
                $aux["fecha_salida"] = $modelKitBd["fecha_salida"];
                $aux["img_pose_base_delante"] = $modelKitBd["img_pose_base_delante"];
                $aux["img_pose_base_detras"] = $modelKitBd["img_pose_base_detras"];
                $aux["img_caja"] = $modelKitBd["img_caja"];
                $aux["img_pose1"] = $modelKitBd["img_pose1"];
                $aux["img_pose2"] = $modelKitBd["img_pose2"]; */

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

    
}