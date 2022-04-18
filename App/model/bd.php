<?php

const DB_INFO = 'mysql:host=localhost:3306;dbname=mygunplalist';

const DB_USER = 'root';

const DB_PASS = '';

class Conexion
{
    
    /**
     * getConection
     *
     * @return conexion
     */
    static function getConection()
    {
        return new \PDO(DB_INFO, DB_USER, DB_PASS);
    }

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
