-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 03, 2023 at 04:50 PM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `abastecimiento`
--

-- --------------------------------------------------------

--
-- Table structure for table `contratacion`
--

DROP TABLE IF EXISTS `contratacion`;
CREATE TABLE IF NOT EXISTS `contratacion` (
  `id_contratacion` int NOT NULL AUTO_INCREMENT,
  `dsc_contratacion` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_contratacion`),
  UNIQUE KEY `contratacion_dsc_contratacion_key` (`dsc_contratacion`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `contratacion`
--

INSERT INTO `contratacion` (`id_contratacion`, `dsc_contratacion`, `user_proc`) VALUES
(1, 'Primera', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `ctrol_proc_req`
--

DROP TABLE IF EXISTS `ctrol_proc_req`;
CREATE TABLE IF NOT EXISTS `ctrol_proc_req` (
  `id_proc_activo` int NOT NULL,
  `id_proc_anexo` int NOT NULL,
  PRIMARY KEY (`id_proc_activo`,`id_proc_anexo`),
  KEY `ctrol_proc_req_id_proc_anexo_fkey` (`id_proc_anexo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `estado`
--

DROP TABLE IF EXISTS `estado`;
CREATE TABLE IF NOT EXISTS `estado` (
  `id_estado` int NOT NULL AUTO_INCREMENT,
  `dsc_estado` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_estado`),
  UNIQUE KEY `estado_dsc_estado_key` (`dsc_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `estado`
--

INSERT INTO `estado` (`id_estado`, `dsc_estado`, `user_proc`) VALUES
(1, 'Inicio', NULL),
(2, 'Activo', NULL),
(3, 'Cancelado', NULL),
(4, 'Finalizado', NULL),
(5, 'Volante', NULL),
(6, 'Orden', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `estado_mov`
--

DROP TABLE IF EXISTS `estado_mov`;
CREATE TABLE IF NOT EXISTS `estado_mov` (
  `id_est_mov` int NOT NULL AUTO_INCREMENT,
  `dsc_est_mov` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_est_mov`),
  UNIQUE KEY `estado_mov_dsc_est_mov_key` (`dsc_est_mov`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `estado_mov`
--

INSERT INTO `estado_mov` (`id_est_mov`, `dsc_est_mov`) VALUES
(1, 'Abogado');

-- --------------------------------------------------------

--
-- Table structure for table `est_mov_contratacion`
--

DROP TABLE IF EXISTS `est_mov_contratacion`;
CREATE TABLE IF NOT EXISTS `est_mov_contratacion` (
  `id_contratacion` int NOT NULL,
  `id_est_mov` int NOT NULL,
  PRIMARY KEY (`id_contratacion`,`id_est_mov`),
  KEY `est_mov_contratacion_id_est_mov_fkey` (`id_est_mov`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `expte`
--

DROP TABLE IF EXISTS `expte`;
CREATE TABLE IF NOT EXISTS `expte` (
  `id_expte` int NOT NULL AUTO_INCREMENT,
  `nro_expte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fch_expte` date NOT NULL,
  `id_prioridad` int NOT NULL,
  `id_contratacion` int NOT NULL,
  `id_estado` int NOT NULL,
  `categoria` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fch_estado` date DEFAULT NULL,
  `refer_expte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id_expte`),
  UNIQUE KEY `expte_nro_expte_key` (`nro_expte`),
  KEY `expte_id_prioridad_fkey` (`id_prioridad`),
  KEY `expte_id_contratacion_fkey` (`id_contratacion`),
  KEY `expte_id_estado_fkey` (`id_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `expte`
--

INSERT INTO `expte` (`id_expte`, `nro_expte`, `fch_expte`, `id_prioridad`, `id_contratacion`, `id_estado`, `categoria`, `user_proc`, `fch_estado`, `refer_expte`) VALUES
(1, 'primer expte', '2023-04-02', 1, 1, 1, 'BIENES', '11111111', NULL, 'probando carga'),
(2, 'ESTE ES EL DOS', '2023-04-02', 2, 1, 1, 'BIENES', '11111111', NULL, 'PRIORIDAD BAJA');

-- --------------------------------------------------------

--
-- Table structure for table `expte_tipo_elemento`
--

DROP TABLE IF EXISTS `expte_tipo_elemento`;
CREATE TABLE IF NOT EXISTS `expte_tipo_elemento` (
  `id_elem_expte` int NOT NULL AUTO_INCREMENT,
  `id_expte` int NOT NULL,
  `id_tipo_elemento` int NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_elem_expte`),
  UNIQUE KEY `expte_tipo_elemento_id_expte_id_tipo_elemento_key` (`id_expte`,`id_tipo_elemento`),
  KEY `expte_tipo_elemento_id_tipo_elemento_fkey` (`id_tipo_elemento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `factura`
--

DROP TABLE IF EXISTS `factura`;
CREATE TABLE IF NOT EXISTS `factura` (
  `id_factura` int NOT NULL AUTO_INCREMENT,
  `importe_fact` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `nro_fact` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `fch_fact` date DEFAULT NULL,
  `expte_fact` tinytext COLLATE utf8mb4_unicode_ci,
  `observ_fact` tinytext COLLATE utf8mb4_unicode_ci,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_factura`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `log_expte`
--

DROP TABLE IF EXISTS `log_expte`;
CREATE TABLE IF NOT EXISTS `log_expte` (
  `id_log_expte` int NOT NULL AUTO_INCREMENT,
  `id_expte` int NOT NULL,
  `nro_expte` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_prioridad` int NOT NULL,
  `id_contratacion` int NOT NULL,
  `id_estado` int NOT NULL,
  `categoria` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fch_user_proc` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `fch_estado` date NOT NULL,
  `accion` varchar(1) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_log_expte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `movimientos`
--

DROP TABLE IF EXISTS `movimientos`;
CREATE TABLE IF NOT EXISTS `movimientos` (
  `id_mov` int NOT NULL AUTO_INCREMENT,
  `fch_mov` date NOT NULL,
  `ofi_mov` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_mov` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `det_mov` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_expte` int NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_est_mov` int NOT NULL,
  PRIMARY KEY (`id_mov`),
  KEY `movimientos_id_expte_fkey` (`id_expte`),
  KEY `movimientos_id_est_mov_fkey` (`id_est_mov`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `movimientos`
--

INSERT INTO `movimientos` (`id_mov`, `fch_mov`, `ofi_mov`, `user_mov`, `det_mov`, `id_expte`, `user_proc`, `id_est_mov`) VALUES
(1, '2023-04-02', 'oficina 1', 'franco', 'Inicio solicitud', 1, NULL, 1),
(2, '2023-04-02', 'OFICINA 3', 'ROBERTO', 'Inicio solicitud', 2, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orden_compra`
--

DROP TABLE IF EXISTS `orden_compra`;
CREATE TABLE IF NOT EXISTS `orden_compra` (
  `id_orden_compra` int NOT NULL AUTO_INCREMENT,
  `nro_orden` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_proveedor` int NOT NULL,
  `saldo_orden` decimal(65,30) DEFAULT '0.000000000000000000000000000000',
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_orden_compra`),
  UNIQUE KEY `orden_compra_nro_orden_key` (`nro_orden`),
  KEY `orden_compra_id_proveedor_fkey` (`id_proveedor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `prioridad`
--

DROP TABLE IF EXISTS `prioridad`;
CREATE TABLE IF NOT EXISTS `prioridad` (
  `id_prioridad` int NOT NULL AUTO_INCREMENT,
  `dsc_prioridad` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_prioridad`),
  UNIQUE KEY `prioridad_dsc_prioridad_key` (`dsc_prioridad`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `prioridad`
--

INSERT INTO `prioridad` (`id_prioridad`, `dsc_prioridad`, `user_proc`) VALUES
(1, 'ALTA', NULL),
(2, 'BAJA', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `procesos`
--

DROP TABLE IF EXISTS `procesos`;
CREATE TABLE IF NOT EXISTS `procesos` (
  `id_proc` int NOT NULL AUTO_INCREMENT,
  `id_volante` int NOT NULL,
  `nro_linea` int NOT NULL,
  `id_tipo_elem` int NOT NULL,
  `importe` decimal(65,30) DEFAULT '0.000000000000000000000000000000',
  `control_importe` int DEFAULT '0',
  `fch_inicio` date DEFAULT NULL,
  `fch_fin` date DEFAULT NULL,
  `dias_control` int DEFAULT '0',
  `fch_entrega` date DEFAULT NULL,
  `observ_proc` mediumtext COLLATE utf8mb4_unicode_ci,
  `id_orden_compra` int DEFAULT NULL,
  `id_estado` int NOT NULL,
  `saldo_proc` decimal(65,30) DEFAULT '0.000000000000000000000000000000',
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `cant_proc` int DEFAULT '0',
  PRIMARY KEY (`id_proc`),
  KEY `procesos_id_volante_fkey` (`id_volante`),
  KEY `procesos_id_tipo_elem_fkey` (`id_tipo_elem`),
  KEY `procesos_id_orden_compra_fkey` (`id_orden_compra`),
  KEY `procesos_id_estado_fkey` (`id_estado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proc_fact`
--

DROP TABLE IF EXISTS `proc_fact`;
CREATE TABLE IF NOT EXISTS `proc_fact` (
  `id_proc_fact` int NOT NULL AUTO_INCREMENT,
  `id_factura` int NOT NULL,
  `id_proc` int NOT NULL,
  `importe_proc_fact` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_proc_fact`),
  KEY `proc_fact_id_factura_fkey` (`id_factura`),
  KEY `proc_fact_id_proc_fkey` (`id_proc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `proveedor`
--

DROP TABLE IF EXISTS `proveedor`;
CREATE TABLE IF NOT EXISTS `proveedor` (
  `id_proveedor` int NOT NULL AUTO_INCREMENT,
  `dsc_proveedor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_proveedor`),
  UNIQUE KEY `proveedor_dsc_proveedor_key` (`dsc_proveedor`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `proveedor`
--

INSERT INTO `proveedor` (`id_proveedor`, `dsc_proveedor`, `user_proc`) VALUES
(1, 'franco', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
CREATE TABLE IF NOT EXISTS `roles` (
  `id_rol` int NOT NULL AUTO_INCREMENT,
  `name_rol` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_rol`),
  UNIQUE KEY `roles_name_rol_key` (`name_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id_rol`, `name_rol`, `user_proc`) VALUES
(1, 'Admin', NULL),
(2, 'Basico', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `roles_user`
--

DROP TABLE IF EXISTS `roles_user`;
CREATE TABLE IF NOT EXISTS `roles_user` (
  `id_user` int NOT NULL,
  `id_rol` int NOT NULL,
  `proc_user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proc_fch` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`,`id_rol`),
  KEY `roles_user_id_rol_fkey` (`id_rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles_user`
--

INSERT INTO `roles_user` (`id_user`, `id_rol`, `proc_user`, `proc_fch`, `user_proc`) VALUES
(1, 1, 'admin', '2023-04-11 22:11:18.531', NULL),
(1, 2, 'admin', '2023-04-11 22:08:21.469', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tipo_elementos`
--

DROP TABLE IF EXISTS `tipo_elementos`;
CREATE TABLE IF NOT EXISTS `tipo_elementos` (
  `id_tipo_elemento` int NOT NULL AUTO_INCREMENT,
  `dsc_tipo_elemento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_elemento` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_tipo_elemento`),
  UNIQUE KEY `tipo_elementos_dsc_tipo_elemento_key` (`dsc_tipo_elemento`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tipo_elementos`
--

INSERT INTO `tipo_elementos` (`id_tipo_elemento`, `dsc_tipo_elemento`, `tipo_elemento`, `user_proc`) VALUES
(1, 'guitarra', 'BIENES', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_access` datetime(3) NOT NULL,
  `active` tinyint(1) NOT NULL,
  `cnt_intentos` int NOT NULL,
  `proc_user` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `proc_fch` datetime(3) NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `user_username_key` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `last_access`, `active`, `cnt_intentos`, `proc_user`, `proc_fch`, `user_proc`) VALUES
(1, '11111111', '$2a$08$Qx0nHI6Ak1lact8lyAldEObZqU5ehuj..ABy4iggISq4Cx4aQegBq', '2023-01-22 00:18:16.370', 1, 0, 'admin', '2023-01-22 00:18:16.370', NULL),
(2, '12345678', 'admin01\r\n', '2023-03-09 21:24:12.000', 1, 10, 'admin', '2023-03-23 21:24:12.000', 'admin'),
(3, '12345678910', '$2a$08$JdvBCOMefhy5ulqilzD1TOTROuqR3Km5FEg/DKg8ro.OFHgQVFNqS', '2023-04-04 03:15:56.835', 1, 0, 'admin', '2023-04-04 03:15:56.835', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `volante`
--

DROP TABLE IF EXISTS `volante`;
CREATE TABLE IF NOT EXISTS `volante` (
  `id_volante` int NOT NULL AUTO_INCREMENT,
  `nro_volante` int NOT NULL,
  `year_volante` int NOT NULL,
  `total_volante` decimal(65,30) NOT NULL,
  `saldo` decimal(65,30) NOT NULL DEFAULT '0.000000000000000000000000000000',
  `id_expte` int NOT NULL,
  `user_proc` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id_volante`),
  UNIQUE KEY `volante_id_expte_key` (`id_expte`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
CREATE TABLE IF NOT EXISTS `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int UNSIGNED NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('06bb7774-e640-4fe5-b715-9bf1f138910c', '95842a816dd678d0a5f1281af8ac8fe3cb52589e24a613f66dbfeb24f3467490', '2023-01-22 00:12:40.935', '20230122001112_init', NULL, NULL, '2023-01-22 00:11:12.075', 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ctrol_proc_req`
--
ALTER TABLE `ctrol_proc_req`
  ADD CONSTRAINT `ctrol_proc_req_id_proc_activo_fkey` FOREIGN KEY (`id_proc_activo`) REFERENCES `procesos` (`id_proc`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ctrol_proc_req_id_proc_anexo_fkey` FOREIGN KEY (`id_proc_anexo`) REFERENCES `procesos` (`id_proc`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `est_mov_contratacion`
--
ALTER TABLE `est_mov_contratacion`
  ADD CONSTRAINT `est_mov_contratacion_id_contratacion_fkey` FOREIGN KEY (`id_contratacion`) REFERENCES `contratacion` (`id_contratacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `est_mov_contratacion_id_est_mov_fkey` FOREIGN KEY (`id_est_mov`) REFERENCES `estado_mov` (`id_est_mov`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `expte`
--
ALTER TABLE `expte`
  ADD CONSTRAINT `expte_id_contratacion_fkey` FOREIGN KEY (`id_contratacion`) REFERENCES `contratacion` (`id_contratacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `expte_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `expte_id_prioridad_fkey` FOREIGN KEY (`id_prioridad`) REFERENCES `prioridad` (`id_prioridad`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `expte_tipo_elemento`
--
ALTER TABLE `expte_tipo_elemento`
  ADD CONSTRAINT `expte_tipo_elemento_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte` (`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `expte_tipo_elemento_id_tipo_elemento_fkey` FOREIGN KEY (`id_tipo_elemento`) REFERENCES `tipo_elementos` (`id_tipo_elemento`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `movimientos`
--
ALTER TABLE `movimientos`
  ADD CONSTRAINT `movimientos_id_est_mov_fkey` FOREIGN KEY (`id_est_mov`) REFERENCES `estado_mov` (`id_est_mov`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `movimientos_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte` (`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD CONSTRAINT `orden_compra_id_proveedor_fkey` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor` (`id_proveedor`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `procesos`
--
ALTER TABLE `procesos`
  ADD CONSTRAINT `procesos_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado` (`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `procesos_id_orden_compra_fkey` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra` (`id_orden_compra`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `procesos_id_tipo_elem_fkey` FOREIGN KEY (`id_tipo_elem`) REFERENCES `tipo_elementos` (`id_tipo_elemento`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `procesos_id_volante_fkey` FOREIGN KEY (`id_volante`) REFERENCES `volante` (`id_volante`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `proc_fact`
--
ALTER TABLE `proc_fact`
  ADD CONSTRAINT `proc_fact_id_factura_fkey` FOREIGN KEY (`id_factura`) REFERENCES `factura` (`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `proc_fact_id_proc_fkey` FOREIGN KEY (`id_proc`) REFERENCES `procesos` (`id_proc`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `roles_user`
--
ALTER TABLE `roles_user`
  ADD CONSTRAINT `roles_user_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `roles_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

--
-- Constraints for table `volante`
--
ALTER TABLE `volante`
  ADD CONSTRAINT `volante_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte` (`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
