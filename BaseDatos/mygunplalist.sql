-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 25-04-2022 a las 18:52:53
-- Versión del servidor: 10.4.22-MariaDB
-- Versión de PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mygunplalist`
--
CREATE DATABASE IF NOT EXISTS `mygunplalist` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `mygunplalist`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `listado_model_kits_usuario`
--

CREATE TABLE `listado_model_kits_usuario` (
  `id` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fk_model_kit` int(11) NOT NULL,
  `estado` int(11) NOT NULL,
  `nota_dificultad` int(11) DEFAULT NULL,
  `nota_acabado_OOB` int(11) DEFAULT NULL,
  `nota_pos_pers` int(11) DEFAULT NULL,
  `nota_calidad` int(11) DEFAULT NULL,
  `nota_poses` int(11) DEFAULT NULL,
  `nota_media_usuario` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `listado_model_kits_usuario`
--

INSERT INTO `listado_model_kits_usuario` (`id`, `fk_usuario`, `fk_model_kit`, `estado`, `nota_dificultad`, `nota_acabado_OOB`, `nota_pos_pers`, `nota_calidad`, `nota_poses`, `nota_media_usuario`) VALUES
(1, 1, 10, 1, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 1, 14, 0, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `model_kit`
--

CREATE TABLE `model_kit` (
  `id_model_kit` int(11) NOT NULL,
  `nombre` text NOT NULL,
  `grado` varchar(50) NOT NULL,
  `escala` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `fecha_salida` date NOT NULL,
  `img_pose_base_delante` text NOT NULL,
  `img_pose_base_detras` text NOT NULL,
  `img_caja` text NOT NULL,
  `img_pose1` text NOT NULL,
  `img_pose2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `model_kit`
--

INSERT INTO `model_kit` (`id_model_kit`, `nombre`, `grado`, `escala`, `descripcion`, `fecha_salida`, `img_pose_base_delante`, `img_pose_base_detras`, `img_caja`, `img_pose1`, `img_pose2`) VALUES
(10, 'RX-78-2', 'EG', '1/144', 'Bandai ha lanzado un nuevo RX-78-2 pero en la serie Entry Grade (EG) aparte de lo obvio que es bastante económico, lo más importante de los  EG es que estan pensados para ser montados sin alicates, ni pegamento ni cualquier otra cosa que no sean tus dedos! Es decir es ideal para los que se inician a este hobby o para aquellas personas que no tengan ninguna experiencia y muy probablemente no tengan pensado en engancharse a este estupendo hobby. Vamos que si quieres hacer un regalo, que se entretengan un rato y sentirse orgullosde montar su propio gunpla esta es muy buena elección como regalo. Nunca falla.', '2020-12-01', '', '', '', '', ''),
(14, 'ZAKU II Origin Type C-5', 'HG', '1/144', 'La version C-5 del clasico ZAKU II de Zeon, en version hg de la saga origin, con una mayor calidad de acabado OOB, detalles, colores mas vibrantes y mas posibilidad de poses.', '2020-04-01', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modificaciones_model_kit`
--

CREATE TABLE `modificaciones_model_kit` (
  `id` int(11) NOT NULL,
  `fk_model_kit` int(11) NOT NULL,
  `fk_usuario` int(11) NOT NULL,
  `fecha_modificacion` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `modificaciones_model_kit`
--

INSERT INTO `modificaciones_model_kit` (`id`, `fk_model_kit`, `fk_usuario`, `fecha_modificacion`) VALUES
(0, 10, 1, '2022-04-24 00:00:00'),
(0, 10, 1, '2022-04-25 00:00:00'),
(0, 10, 1, '2022-04-25 00:52:39'),
(0, 14, 1, '2022-04-25 13:47:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `moderador` tinyint(1) NOT NULL,
  `img_usuario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `username`, `password`, `moderador`, `img_usuario`) VALUES
(1, 'ikerabadiaEdited@gmail.com', 'ikerabadiaedited', 'ikerabadiaedited', 1, ''),
(2, 'antonio49@gmail.com', 'antonio49', 'antonio49', 0, '');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `listado_model_kits_usuario`
--
ALTER TABLE `listado_model_kits_usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `fk_usuario` (`fk_usuario`,`fk_model_kit`),
  ADD KEY `fk_model_kit` (`fk_model_kit`);

--
-- Indices de la tabla `model_kit`
--
ALTER TABLE `model_kit`
  ADD PRIMARY KEY (`id_model_kit`);

--
-- Indices de la tabla `modificaciones_model_kit`
--
ALTER TABLE `modificaciones_model_kit`
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_model_kit` (`fk_model_kit`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `listado_model_kits_usuario`
--
ALTER TABLE `listado_model_kits_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `model_kit`
--
ALTER TABLE `model_kit`
  MODIFY `id_model_kit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `listado_model_kits_usuario`
--
ALTER TABLE `listado_model_kits_usuario`
  ADD CONSTRAINT `listado_model_kits_usuario_ibfk_1` FOREIGN KEY (`fk_model_kit`) REFERENCES `model_kit` (`id_model_kit`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `listado_model_kits_usuario_ibfk_2` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `modificaciones_model_kit`
--
ALTER TABLE `modificaciones_model_kit`
  ADD CONSTRAINT `modificaciones_model_kit_ibfk_1` FOREIGN KEY (`fk_usuario`) REFERENCES `usuarios` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `modificaciones_model_kit_ibfk_2` FOREIGN KEY (`fk_model_kit`) REFERENCES `model_kit` (`id_model_kit`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
