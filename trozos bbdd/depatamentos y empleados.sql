-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.6.5-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para instituto
CREATE DATABASE IF NOT EXISTS `instituto` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `instituto`;

-- Volcando estructura para tabla instituto.alumno
CREATE TABLE IF NOT EXISTS `alumno` (
  `NumMatrícula` int(11) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `FechaNacimiento` date DEFAULT NULL,
  `Teléfono` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`NumMatrícula`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla instituto.alumno: ~0 rows (aproximadamente)
DELETE FROM `alumno`;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;

-- Volcando estructura para tabla instituto.asignatura
CREATE TABLE IF NOT EXISTS `asignatura` (
  `CodAsignatura` int(11) NOT NULL,
  `Nombre` varchar(30) DEFAULT NULL,
  `IdProfesor` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`CodAsignatura`),
  KEY `IdProfesor` (`IdProfesor`),
  CONSTRAINT `asignatura_ibfk_1` FOREIGN KEY (`IdProfesor`) REFERENCES `profesor` (`IdProfesor`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla instituto.asignatura: ~0 rows (aproximadamente)
DELETE FROM `asignatura`;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;

-- Volcando estructura para tabla instituto.profesor
CREATE TABLE IF NOT EXISTS `profesor` (
  `IdProfesor` varchar(50) NOT NULL DEFAULT '0',
  `NIF_P` varchar(50) NOT NULL DEFAULT '0',
  `Nombre` varchar(30) DEFAULT NULL,
  `Especialidad` varchar(30) DEFAULT NULL,
  `Teléfono` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`IdProfesor`) USING BTREE,
  UNIQUE KEY `NIF_P` (`NIF_P`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla instituto.profesor: ~0 rows (aproximadamente)
DELETE FROM `profesor`;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;

-- Volcando estructura para tabla instituto.recibe
CREATE TABLE IF NOT EXISTS `recibe` (
  `NumMatrícula` int(11) NOT NULL,
  `CodAsignatura` int(11) NOT NULL,
  `CursoEscolar` varchar(3) NOT NULL,
  PRIMARY KEY (`NumMatrícula`,`CodAsignatura`,`CursoEscolar`),
  KEY `CodAsignatura` (`CodAsignatura`),
  CONSTRAINT `recibe_ibfk_1` FOREIGN KEY (`NumMatrícula`) REFERENCES `alumno` (`NumMatrícula`),
  CONSTRAINT `recibe_ibfk_2` FOREIGN KEY (`CodAsignatura`) REFERENCES `asignatura` (`CodAsignatura`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla instituto.recibe: ~0 rows (aproximadamente)
DELETE FROM `recibe`;
/*!40000 ALTER TABLE `recibe` DISABLE KEYS */;
/*!40000 ALTER TABLE `recibe` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
