-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 16-05-2022 a las 15:50:01
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
  `nota_dificultad` double DEFAULT NULL,
  `nota_acabado_OOB` double DEFAULT NULL,
  `nota_calidad` double DEFAULT NULL,
  `nota_poses` double DEFAULT NULL,
  `nota_media_usuario` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `listado_model_kits_usuario`
--

INSERT INTO `listado_model_kits_usuario` (`id`, `fk_usuario`, `fk_model_kit`, `estado`, `nota_dificultad`, `nota_acabado_OOB`, `nota_calidad`, `nota_poses`, `nota_media_usuario`) VALUES
(22, 39, 15, 0, NULL, NULL, NULL, NULL, NULL),
(23, 41, 31, 0, NULL, NULL, NULL, NULL, NULL),
(24, 41, 37, 0, NULL, NULL, NULL, NULL, NULL),
(25, 39, 60, 0, 9.7, 3.5, 4.8, 3.6, 6.1),
(26, 39, 23, 0, 7, 8.5, 4.7, 5.3, 7.8),
(27, 39, 31, 0, NULL, NULL, NULL, NULL, NULL),
(28, 39, 37, 0, 5, 10, 10, 10, 9.6),
(29, 39, 10, 0, NULL, NULL, NULL, NULL, NULL),
(30, 39, 21, 3, NULL, NULL, NULL, NULL, NULL),
(31, 41, 60, 0, 9.7, 3.5, 4.8, 3.6, 6.1),
(32, 39, 61, 0, 9.5, 7, 9.7, 6.3, 8.2);

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
  `link_gunpla_wiki` text NOT NULL,
  `img_pose_base_delante` text NOT NULL,
  `img_pose_base_detras` text NOT NULL,
  `img_caja` text NOT NULL,
  `img_pose1` text NOT NULL,
  `img_pose2` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `model_kit`
--

INSERT INTO `model_kit` (`id_model_kit`, `nombre`, `grado`, `escala`, `descripcion`, `fecha_salida`, `link_gunpla_wiki`, `img_pose_base_delante`, `img_pose_base_detras`, `img_caja`, `img_pose1`, `img_pose2`) VALUES
(10, 'RX-78-2', 'EG', '1/144', 'Bandai ha lanzado un nuevo RX-78-2 pero en la serie Entry Grade (EG) aparte de lo obvio que es bastante económico, lo más importante de los  EG es que estan pensados para ser montados sin alicates, ni pegamento ni cualquier otra cosa que no sean tus dedos! Es decir es ideal para los que se inician a este hobby o para aquellas personas que no tengan ninguna experiencia y muy probablemente no tengan pensado en engancharse a este estupendo hobby. Vamos que si quieres hacer un regalo, que se entretengan un rato y sentirse orgullosde montar su propio gunpla esta es muy buena elección como regalo. Nunca falla.', '2020-09-04', 'https://gunpla.fandom.com/wiki/EG_(2020)_RX-78-2_Gundam', '', '', '', '', ''),
(14, 'ZAKU II Origin Type C-5', 'HG', '1/144', 'La version C-5 del clasico ZAKU II de Zeon, en version hg de la saga origin, con una mayor calidad de acabado OOB, detalles, colores mas vibrantes y mas posibilidad de poses.', '2017-09-02', 'https://gunpla.fandom.com/wiki/HGGTO_MS-06C_Zaku_II_Type_C/Type_C-5', '', '', '', '', ''),
(15, 'ZAKU II  RED COMET VER', 'HG', '1/144', 'La version C-5 del clasico ZAKU II rojo de Char Aznable, en version HG de la saga origin, con una mayor calidad de acabado OOB, detalles, colores mas vibrantes y mas posibilidad de poses.', '2019-04-27', 'https://gunpla.fandom.com/wiki/HGGTO_MS-06S_Zaku_II_(Red_Comet_Ver.)', '', '', '', '', ''),
(16, 'Gundam RX-78-2', 'RG', '1 / 144', 'Haz tu propio Real Grade RX-78-2 Gundam, conocido de la serie de anime Mobile Suit Gundam. En la serie Mobile Suit Gundam, este Gundam cambiaría el rumbo de la guerra a favor de la Federación de la Tierra durante la Guerra de un año. El modelo está en una escala de 1:144 y contiene varios accesorios para poner el modelo en diferentes poses.', '2010-07-01', '', '', '', '', '', ''),
(17, 'GELGOOG CHAR CUSTOM', 'HG', '1 / 144', 'Gelgoog que usa Char Aznable para luchar en la guerra de un año', '2006-10-15', '', '', '', '', '', ''),
(18, 'GUNDAM MK-II TITANS', 'RG', '1 / 144', 'Version Titans del rx 178', '2012-04-28', '', '', '', '', '', ''),
(19, 'GUNDAM MK-II TITANS (REVIVE)', 'HG', '1 / 144', 'Version Revive del  Titans MK II', '2015-11-26', '', '', '', '', '', ''),
(20, 'GUNDAM ZETA RX-178 MK-II VER 2.0 TITANS', 'MG', '1 / 144', 'Version Revive del  Titans MK II', '2006-03-25', '', '', '', '', '', ''),
(21, 'GUNDAM -232- SEED GAT-04 WINDAM', 'HG', '1 / 144', 'GAT-04 WINDAM de Mobile Suit Gundam SEED Destiny, es la unidad Mobile Suit principal de de la Alianza Terrestre. ', '2020-05-23', '', '', '', '', '', ''),
(22, 'IBO -041- HAJIROBOSHI', 'HG', '1 / 144', 'ASW-G-35 GUNDAM HAJIROBOSHI es de la serie Mobile Suite Gundam IRON-BLOODED ORPHANS UrdrHunt, Gunpla que se lanzará por el 40th Gundam Anniversary. Está pilotado por Wistario Afam y es la unidad principal de la história.', '2020-08-22', '', '', '', '', '', ''),
(23, 'GUNDAM -239- XXXG-01D DEATHSCYTHE', 'HG', '1 / 144', 'GUNDAM HGAC -239- XXXG-01D DEATHSCYTHE 1/144', '2021-05-22', '', '', '', '', '', ''),
(24, 'GUNDAM -171- SEED GAT-X105 + AQM / E-X01 AILE STRIKE', 'HG', '1 / 144', 'GUNDAM HGCE -171- SEED GAT-X105 + AQM / E-X01 AILE STRIKE 1/144', '2014-02-08', '', '', '', '', '', ''),
(25, 'GUNDAM -007- RX-75 GUNTANK', 'HG', '1 / 144', 'GUNDAM HGUC -007- RX-75 GUNTANK 1/144', '2000-01-21', '', '', '', '', '', ''),
(26, 'GUNDAM -020- RGM-79 GM', 'HG', '1 / 144', 'GUNDAM HGUC -020- RGM-79 GM (GUNDAM MODEL KIT) 1/144', '2001-04-20', '', '', '', '', '', ''),
(27, 'GUNDAM -038- RGM-79D GM COLD DISTRICT TYPE', 'HG', '1 / 144', 'GUNDAM HGUC -038- RGM-79D GM COLD DISTRICT TYPE (GUNDAM MODEL KIT) 1/144', '2003-07-18', '', '', '', '', '', ''),
(28, 'GUNDAM IBO -019- ASTAROTH', 'HG', '1 / 144', 'GUNDAM HG IBO -019- ASTAROTH 1/144', '2016-03-13', '', '', '', '', '', ''),
(29, 'GUNDAM IBO -003- MCGILLIS SCHWALBE GRAZE', 'HG', '1 / 144', 'GUNDAM HG IBO -003- MCGILLIS SCHWALBE GRAZE 1/144', '2015-10-17', '', '', '', '', '', ''),
(30, 'GUNDAM SEED -R03- BUSTER (REMASTER)', 'HG', '1 / 144', 'GUNDAM HG SEED -R03- BUSTER (REMASTER) 1/144', '2011-11-01', '', '', '', '', '', ''),
(31, 'GUNDAM -237- GAT-02L2 DAGGER L', 'HG', '1 / 144', 'GUNDAM HGAC -237- GAT-02L2 DAGGER L 1/144', '2021-04-01', '', '', '', '', '', ''),
(32, 'GUNDAM SEED -13- ASTRAY BLUE FRAME', 'HG', '1 / 144', 'GUNDAM HG SEED -13- ASTRAY BLUE FRAME 1/144', '2004-02-01', '', '', '', '', '', ''),
(33, 'GUNDAM IBO -017- CARTAS GRAZE RITTER', 'HG', '1 / 144', 'GUNDAM HG IBO -017- CARTAS GRAZE RITTER 1/144', '2016-03-12', '', '', '', '', '', ''),
(34, 'GUNDAM IBO -027- VIDAR', 'HG', '1 / 144', 'GUNDAM HG IBO -027- VIDAR 1/144', '2016-12-01', '', '', '', '', '', ''),
(36, 'GUNDAM EX-STANDARD (001) - RX-78-2', 'SD', 'NSC', 'RX-78-02 de la serie Mobile Suit Gundam, la serie original, pilotado por Amuro Ray es el Gundam principal de la serie.\nSD EX-STANDARD es una serie de Maquetas SD creada en 2015 pensada para la venta exclusiva fuera de Japón, no obstante, en el verano 2016 fue introducida en Japón. Lo interesante de esta serie es que se puede utilizar partes de la maqueta SD (principalmente las armas y accesorios) para reconvertirlo en una \"super mega chachi cool\" arma para el mismo Gunpla de la escala HG.', '2004-06-30', '', '', '', '', '', ''),
(37, 'GUNDAM PG UNLEASHED RX-78-2', 'PG', '1 / 60', 'GUNDAM PG UNLEASHED RX-78-2 1/60', '2021-12-19', 'https://gunpla.fandom.com/wiki/PG_UNLEASHED_RX-78-2_Gundam?so=search', 'http://localhost/mygunplalist/imagenes/modelKits/37/imgDelante/delante.webp', 'http://localhost/mygunplalist/imagenes/modelKits/37/imgDetras/detras.webp', 'http://localhost/mygunplalist/imagenes/modelKits/37/imgCaja/caja.webp', 'http://localhost/mygunplalist/imagenes/modelKits/37/imgPose1/pose1.webp', 'http://localhost/mygunplalist/imagenes/modelKits/37/imgPose2/pose2.webp'),
(38, 'RX-0 Unicorn Gundam', 'PG', '1 / 60', 'RX-0 Unicorn Gundam Full Psycho-Frame Prototype Mobile suit', '2014-12-13', 'https://gunpla.fandom.com/wiki/PG_RX-0_Unicorn_Gundam', '', '', '', '', ''),
(60, 'Rx-78-2', 'EG', '1 / 144', 'Entry Grade del RX-78-2 o el Abuelo, para iniciar a tus amigos y a los mas novatos en el hobby', '2020-09-04', 'https://gunpla.fandom.com/wiki/EG_(2020)_RX-78-2_Gundam?so=search', 'http://localhost/mygunplalist/imagenes/modelKits/60/imgDelante/delante.png', 'http://localhost/mygunplalist/imagenes/modelKits/60/imgDetras/detras.webp', 'http://localhost/mygunplalist/imagenes/modelKits/60/imgCaja/caja.jpg', 'http://localhost/mygunplalist/imagenes/modelKits/60/imgPose1/pose1.webp', 'http://localhost/mygunplalist/imagenes/modelKits/60/imgPose2/pose2.webp'),
(61, 'IBO ASW-G-08 Gundam Barbatos', 'HG', '1 / 144', 'HGI-BO ASW-G-08 Gundam Barbatos', '2015-10-03', 'https://gunpla.fandom.com/wiki/HGI-BO_ASW-G-08_Gundam_Barbatos', '', 'http://localhost/mygunplalist/imagenes/modelKits/61/imgDetras/poseDetras.webp', 'http://localhost/mygunplalist/imagenes/modelKits/61/imgCaja/caja.webp', '', 'http://localhost/mygunplalist/imagenes/modelKits/61/imgPose2/pose2.webp');

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
(1, 16, 39, '2022-05-08 20:10:16'),
(2, 17, 39, '2022-05-08 20:15:35'),
(3, 18, 39, '2022-05-08 20:18:36'),
(4, 19, 39, '2022-05-08 20:23:41'),
(5, 20, 39, '2022-05-08 20:25:33'),
(6, 21, 39, '2022-05-08 20:27:56'),
(7, 22, 39, '2022-05-08 20:30:40'),
(8, 23, 39, '2022-05-08 20:32:19'),
(9, 24, 39, '2022-05-08 20:36:34'),
(10, 25, 39, '2022-05-08 20:40:32'),
(11, 26, 39, '2022-05-08 20:42:39'),
(12, 27, 39, '2022-05-08 20:44:10'),
(13, 28, 39, '2022-05-08 20:45:24'),
(14, 29, 39, '2022-05-08 20:47:08'),
(15, 30, 39, '2022-05-08 20:49:40'),
(16, 31, 39, '2022-05-08 20:51:18'),
(17, 32, 39, '2022-05-08 20:52:29'),
(18, 33, 39, '2022-05-08 20:54:08'),
(19, 34, 39, '2022-05-08 20:55:21'),
(20, 36, 39, '2022-05-08 21:03:30'),
(21, 37, 39, '2022-05-08 21:04:55'),
(22, 38, 39, '2022-05-10 20:13:59'),
(23, 10, 39, '2022-05-10 20:24:19'),
(24, 15, 39, '2022-05-10 20:28:02'),
(25, 14, 39, '2022-05-10 20:33:06'),
(45, 60, 39, '2022-05-12 21:16:56'),
(46, 60, 39, '2022-05-12 21:16:56'),
(47, 61, 39, '2022-05-15 19:46:18'),
(48, 61, 39, '2022-05-15 19:46:18'),
(49, 37, 39, '2022-05-16 03:13:11'),
(50, 14, 39, '2022-05-16 03:13:11'),
(51, 37, 39, '2022-05-16 03:14:59'),
(52, 14, 39, '2022-05-16 03:14:59'),
(53, 37, 39, '2022-05-16 03:17:35'),
(54, 37, 39, '2022-05-16 03:17:54'),
(55, 37, 39, '2022-05-16 03:19:13'),
(56, 37, 39, '2022-05-16 03:19:39'),
(57, 37, 39, '2022-05-16 03:20:45'),
(58, 37, 39, '2022-05-16 03:22:50'),
(59, 37, 39, '2022-05-16 03:25:56'),
(60, 37, 39, '2022-05-16 03:25:56'),
(61, 37, 39, '2022-05-16 03:29:45'),
(62, 37, 39, '2022-05-16 03:30:12'),
(63, 37, 39, '2022-05-16 03:33:03'),
(64, 37, 39, '2022-05-16 03:35:19'),
(65, 37, 39, '2022-05-16 03:36:13'),
(66, 37, 39, '2022-05-16 03:39:13'),
(67, 37, 39, '2022-05-16 03:39:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(60) NOT NULL,
  `link_instagram` text NOT NULL,
  `link_youtube` text NOT NULL,
  `moderador` tinyint(1) NOT NULL,
  `img_usuario` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `email`, `username`, `password`, `link_instagram`, `link_youtube`, `moderador`, `img_usuario`) VALUES
(38, 'aux@aux.com', 'aux', '$2y$10$6utjU6Y8gZ/VlVnuWhNN..pyb1WrSfs2NqwCbgTzd..dLXwORJiPK', '', '', 0, ''),
(39, 'admin@admin.com', 'admin', '$2y$10$sHsEecBYVFxYHGjJ2tAt.O.3WSyt8GTGFyg7UjpJlCuXS0FBB4C42', '', '', 0, ''),
(41, 'naniscala@gmail.com', 'naniscala', '$2y$10$Sok0zUYJ5He/jacUhagGZOjfJJmn868njMuzecz9J51Ylwq1O3LUy', 'https://www.instagram.com/naniscala/', 'https://www.youtube.com/channel/UCG15Yt68aN27_tnpxUxV7uQ', 0, '');

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
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_usuario` (`fk_usuario`),
  ADD KEY `fk_model_kit` (`fk_model_kit`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `listado_model_kits_usuario`
--
ALTER TABLE `listado_model_kits_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `model_kit`
--
ALTER TABLE `model_kit`
  MODIFY `id_model_kit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=62;

--
-- AUTO_INCREMENT de la tabla `modificaciones_model_kit`
--
ALTER TABLE `modificaciones_model_kit`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

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
