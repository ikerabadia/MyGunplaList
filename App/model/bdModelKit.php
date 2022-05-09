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

    static function getModificacionesModelKit($idModelKit){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT 
            *,
            (select username from usuarios u WHERE m.fk_usuario = u.id_usuario) username
            FROM `modificaciones_model_kit` m WHERE m.fk_model_kit = $idModelKit";
            $resultado = $db->query($sql);

            $modificaciones = array();

            while ($fila = $resultado->fetch(PDO::FETCH_ASSOC)) {
                $modificaciones[] = $fila;
            }

            return $modificaciones;
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    

    //CONSULTA PARA OBTENER LOS MODEL KITS PAGINADOS Y RANKEADOS TANTO POR NOTA COMO POR POPULARIDAD
    static function getAllModelKits($pagina, $orden, $notaMinima, $notaMaxima, $textoBuscador, $grado){
        try {
            $db = Conexion::getConection();

            $offset = ($pagina * 20);

            $filtroGrado = "";
            if ($grado == "todos") {
                $filtroGrado = "%%";
            }else{
                $filtroGrado = "$grado";
            }

            $sql = "SELECT * FROM(
                SELECT
                        COALESCE((SELECT AVG(nota_media_usuario) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as nota,
                        DENSE_RANK() OVER (
                                ORDER BY nota desc
                            ) puesto_nota,
                        COALESCE((SELECT COUNT(*) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as popularidad,    
                        DENSE_RANK() OVER (
                                ORDER BY popularidad desc
                            ) puesto_popularidad, 
                        mk.*
                        FROM `model_kit` mk
                ) listado WHERE 
                    (UPPER(listado.nombre) LIKE UPPER('%$textoBuscador%'))
                     AND ( listado.nota >= $notaMinima )
                     AND ( listado.nota <= $notaMaxima )
                     AND ( listado.grado LIKE '$filtroGrado' )
                 ORDER BY $orden DESC
                 LIMIT 20 OFFSET $offset";

            $resultado = $db->query($sql);

            return $resultado;

        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getCountAllModelKits($notaMinima, $notaMaxima, $textoBuscador, $grado){
        try {
            $db = Conexion::getConection();

            $filtroGrado = "";
            if ($grado == "todos") {
                $filtroGrado = "%%";
            }else{
                $filtroGrado = "$grado";
            }

            $sql = "SELECT COUNT(*) as totalElements FROM(
                SELECT
                        COALESCE((SELECT AVG(nota_media_usuario) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as nota,
                        DENSE_RANK() OVER (
                                ORDER BY nota desc
                            ) puesto_nota,
                        COALESCE((SELECT COUNT(*) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as popularidad,    
                        DENSE_RANK() OVER (
                                ORDER BY popularidad desc
                            ) puesto_popularidad, 
                        mk.*
                        FROM `model_kit` mk
                ) listado WHERE 
                    (UPPER(listado.nombre) LIKE UPPER('%$textoBuscador%'))
                     AND ( listado.nota >= $notaMinima )
                     AND ( listado.nota <= $notaMaxima )
                     AND ( listado.grado LIKE '$filtroGrado' )
            ";

            $resultado = $db->query($sql);

            $fila = $resultado->fetch(PDO::FETCH_ASSOC);
            return $fila['totalElements'];

        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getModelKitById($idModelKit){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM (		
                SELECT
                (SELECT AVG(nota_media_usuario) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota,
                DENSE_RANK() OVER (                	
                        ORDER BY nota desc
                    ) puesto_nota,
                (SELECT COUNT(*) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as popularidad,    
                DENSE_RANK() OVER (
                        ORDER BY popularidad desc
                    ) puesto_popularidad, 
    			(SELECT AVG(nota_dificultad) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota_dificultad,
                (SELECT AVG(nota_acabado_OOB) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota_acabado_OOB,
                (SELECT AVG(nota_pos_pers) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota_pos_pers,
                (SELECT AVG(nota_calidad) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota_calidad,
                (SELECT AVG(nota_poses) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit) as nota_poses,
                mk.*
                FROM `model_kit` mk
        )lista WHERE lista.id_model_kit = $idModelKit";

            $resultado = $db->query($sql);

            return $resultado;
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getTopModelKitsByDate($numeroRegistros, $orden, $dias){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM(
                SELECT
                        COALESCE((SELECT AVG(nota_media_usuario) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as nota,
                        DENSE_RANK() OVER (
                                ORDER BY nota desc
                            ) puesto_nota,
                        COALESCE((SELECT COUNT(*) from listado_model_kits_usuario lmk WHERE lmk.fk_model_kit = mk.id_model_kit),0) as popularidad,    
                        DENSE_RANK() OVER (
                                ORDER BY popularidad desc
                            ) puesto_popularidad, 
                        mk.*
                        FROM `model_kit` mk
                ) listado
                WHERE listado.fecha_salida > DATE_ADD(CURDATE(), INTERVAL -$dias DAY)
                ORDER BY $orden DESC
                LIMIT $numeroRegistros OFFSET 0";

            $resultado = $db->query($sql);

            return $resultado;

        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

}