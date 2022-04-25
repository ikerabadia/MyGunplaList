<?php

class BdModelKit{

    //---------------------------------------------------------------------------------------
    //          MODEL KITS
    //---------------------------------------------------------------------------------------

    static function newModelKit($nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "INSERT INTO `model_kit`(`nombre`, `grado`, `escala`, `descripcion`, `fecha_salida`, `img_pose_base_delante`, `img_pose_base_detras`, `img_caja`, `img_pose1`, `img_pose2`) VALUES ('$nombre','$grado','$escala','$descripcion','$fechaSalida','$imgPoseBaseDelante','$imgPoseBaseDetras','$imgCaja','$imgPose1','$imgPose2')";
            $resultado = $db->query($sql);

            if ($resultado) {
                $fkModelKit = $db->lastInsertId();
                $sql = "INSERT INTO `modificaciones_model_kit`(`fk_model_kit`, `fk_usuario`, `fecha_modificacion`) VALUES ('$fkModelKit','$idUsuario',now())";
                $resultado2 = $db->query($sql);
                return "true";
            } else {
                return "false";
            }
        } catch (\Exception $th) {
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }

    static function updateModelKit($idModelKit, $nombre, $grado, $escala, $descripcion, $fechaSalida, $imgPoseBaseDelante, $imgPoseBaseDetras, $imgCaja, $imgPose1, $imgPose2, $idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `model_kit` SET `nombre`='$nombre',`grado`='$grado',`escala`='$escala',`descripcion`='$descripcion',`fecha_salida`='$fechaSalida',`img_pose_base_delante`='$imgPoseBaseDelante',`img_pose_base_detras`='$imgPoseBaseDetras',`img_caja`='$imgCaja',`img_pose1`='$imgPose1',`img_pose2`='$imgPose2' WHERE id_model_kit=$idModelKit";
            $resultado = $db->query($sql);

            if ($resultado) {
                $sql = "INSERT INTO `modificaciones_model_kit`(`fk_model_kit`, `fk_usuario`, `fecha_modificacion`) VALUES ('$idModelKit','$idUsuario',now())";
                $resultado2 = $db->query($sql);
                return "true";
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            
        } catch (\PDOException $e) {
            
        }
    }

    static function isInList($idUsuario, $idModelKit){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM `listado_model_kits_usuario` WHERE fk_usuario = $idUsuario and fk_model_kit = $idModelKit";
            $resultado = $db->query($sql);

            echo $resultado->fetchColumn();

            if ($resultado->fetchColumn() == false) {
                return false;
            } else {
                return true;
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

}