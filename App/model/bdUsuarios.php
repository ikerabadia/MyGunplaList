<?php

class BdUsuarios{

    //---------------------------------------------------------------------------------------
    //          USUARIOS
    //---------------------------------------------------------------------------------------
    
    //SIN HACER
    static function getLogin($user)
    {
        try {
            $db = Conexion::getConection();

            $sql = "SELECT * FROM usuarios WHERE username='" . $user . "'";
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
    
    
    static function newUsuario($username, $password, $email, $linkInstagram, $linkYoutube){
        try {
            $db = Conexion::getConection();

            $sql = "INSERT INTO `usuarios`(`username`, `password`, `email`, `link_instagram`, `link_youtube` ) VALUES ('$username', '$password', '$email', '$linkInstagram', '$linkYoutube')";
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
    
    
    static function updateUsuario($idUsuario, $username, $password, $img_usuario, $email, $linkInstagram, $linkYoutube){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `usuarios` SET username = '$username', password = '$password', img_usuario = '$img_usuario', email = '$email', link_instagram = '$linkInstagram', link_youtube = '$linkYoutube' WHERE id_usuario = $idUsuario";
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

            $sql = "INSERT INTO `listado_model_kits_usuario`(`fk_usuario`, `fk_model_kit`, `estado`, `nota_dificultad`, `nota_acabado_OOB`, `nota_calidad`, `nota_poses`, `nota_media_usuario`) VALUES ('$idUsuario','$idModelKit','0',null,null,null,null,null)";
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

    static function ponerNota($idModelKit, $idUsuario, $notaDificultad, $notaOOB, $notaCalidad, $notaPoses, $notaGeneral){
        try {
            $db = Conexion::getConection();

            $sql = "UPDATE `listado_model_kits_usuario` SET `nota_dificultad`=$notaDificultad, `nota_acabado_OOB`=$notaOOB, `nota_calidad`=$notaCalidad, `nota_poses`=$notaPoses, `nota_media_usuario`=$notaGeneral WHERE fk_usuario = $idUsuario AND fk_model_kit = $idModelKit";
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