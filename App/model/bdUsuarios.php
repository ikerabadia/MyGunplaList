<?php

class BdUsuarios{

    //---------------------------------------------------------------------------------------
    //          USUARIOS
    //---------------------------------------------------------------------------------------
    
    //SIN HACER
    static function getLogin($user, $password)
    {
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM usuarios WHERE username='" . $user . "' AND password='" . $password . "'";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    
    /*  CONSULTA CON SHA1 DE PRUEBA
     
    static function getUsuarioId($id)
    {
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM restaurante WHERE sha1(CodRes)='".trim($id)."'";
            //return $sql;
            $resultado = $db->query($sql);
            
            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            } 
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    */

        
    
    static function getUsuarios($pagina, $cantidadRegistros){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM usuarios LIMIT $cantidadRegistros OFFSET ".($pagina-1)*$cantidadRegistros;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    
    static function getUser($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM usuarios WHERE id_usuario = ".$idUsuario;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    
    static function newUsuario($username, $password, $email){
        try {
            $db = Conexion::getConection();

            $sql = "INSERT INTO `usuarios`(`username`, `password`, `email`) VALUES ('$username', '$password', '$email')";
            $resultado = $db->query($sql);

            if ($resultado) {
                return "true";
            } else {
                return "false";
            }
        } catch (\Exception $th) {
            return "false";
        } catch (\PDOException $e) {
            return "false";
        }
    }
    
    
    static function deleteUsuario($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "DELETE FROM usuarios WHERE id_usuario = ".$idUsuario;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    
    static function updateUsuario($idUsuario, $username, $password, $img_usuario, $email){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `usuarios` SET username = '$username', password = '$password', img_usuario = '$img_usuario', email = '$email' WHERE id_usuario = $idUsuario";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    /**
     * limpiarLikesUsuario
     *
     * @param  mixed $idUsuario
     * @return void
     */
    static function limpiarLikesUsuario($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "DELETE FROM `likes` WHERE fkUsuario = '$idUsuario'";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    /**
     * guardarImagenUsuario
     *
     * @param  mixed $idUsuario
     * @param  mixed $ruta
     * @return void
     */
    static function guardarImagenUsuario($idUsuario, $ruta){
        try {
            $db = Conexion::getConection();

            $sql = "INSERT INTO `imagenes_usuarios`(`imagen`, `fk_usuario`) VALUES ('$ruta', '$idUsuario')";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $db->lastInsertId();
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    /**
     * getImagenUsuario
     *
     * @param  mixed $idUsuario
     * @return void
     */
    static function getImagenUsuario($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM imagenes_usuarios WHERE fk_usuario = ".$idUsuario;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }
    
    /**
     * deleteImagenUsuario
     *
     * @param  mixed $idUsuario
     * @return void
     */
    static function deleteImagenUsuario($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "DELETE FROM imagenes_usuarios WHERE fk_usuario = ".$idUsuario;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getUserByUsername($user){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM usuarios WHERE user = ".$user;
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function addToMisGunplas($idModelKit, $idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "INSERT INTO `listado_model_kits_usuario`(`fk_usuario`, `fk_model_kit`, `estado`, `nota_dificultad`, `nota_acabado_OOB`, `nota_pos_pers`, `nota_calidad`, `nota_poses`, `nota_media_usuario`) VALUES ('$idUsuario','$idModelKit','0',null,null,null,null,null,null)";
            $resultado = $db->query($sql);            
            
            if ($resultado) {                
                return true;
            } else {
                return false;
            }
        } catch (\Exception $th) {
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }

    static function patchEstadoMisGunplas($idModelKit, $idUsuario, $estado){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `listado_model_kits_usuario` SET `estado`=$estado WHERE fk_usuario = $idUsuario AND fk_model_kit = $idModelKit";
            $resultado = $db->query($sql);

            if ($resultado) {
                return true;
            } else {
                return false;
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function ponerNota($idModelKit, $idUsuario, $notaDificultad, $notaOOB, $notaPersonalizacion, $notaCalidad, $notaPoses, $notaMedia){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `listado_model_kits_usuario` SET `nota_dificultad`=$notaDificultad, `nota_acabado_OOB`=$notaOOB, `nota_pos_pers`=$notaPersonalizacion, `nota_calidad`=$notaCalidad, `nota_poses`=$notaPoses, `nota_media_usuario`=$notaMedia WHERE fk_usuario = $idUsuario AND fk_model_kit = $idModelKit";
            $resultado = $db->query($sql);

            if ($resultado) {
                return true;
            } else {
                return false;
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getUserList($idUser, $estado){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * from (
                SELECT 
                *,
                DENSE_RANK() OVER (                	
                       ORDER BY nota_media_usuario desc
                ) puesto_nota_mis_gunplas
                FROM `listado_model_kits_usuario` 
                WHERE fk_usuario = $idUser
            )datos WHERE datos.estado LIKE '%$estado%'";
            $resultado = $db->query($sql);

            //echo var_dump($resultado);

            return $resultado;
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getUserListModelKit($idUsuario, $idModelKit){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM `listado_model_kits_usuario` WHERE fk_usuario = $idUsuario AND fk_model_kit = $idModelKit";
            $resultado = $db->query($sql);

            return $resultado;
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    //GENERICOS
    static function getImagenesMejorValorados(){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT imagen FROM `imagenes_pincho` limit 5";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

    static function getImagenesPreferidos($idUsuario){
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM `imagenes_pincho` where fk_pincho in(SELECT fkPincho from reseñas where fkUsuario = ".$idUsuario.") AND numeroImagen = 1";
            $resultado = $db->query($sql);

            if ($resultado) {
                return $resultado;
            } else {
                throw new Exception("Error en el select....");
            }
        } catch (\Exception $th) {
            echo $th->getMessage();
        } catch (\PDOException $e) {
            echo $e->getMessage();
        }
    }

}