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

    

}
