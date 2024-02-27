-- CreateTable
CREATE TABLE `proveedor` (
    `id_proveedor` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_proveedor` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `proveedor_dsc_proveedor_key`(`dsc_proveedor`),
    PRIMARY KEY (`id_proveedor`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prioridad` (
    `id_prioridad` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_prioridad` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `prioridad_dsc_prioridad_key`(`dsc_prioridad`),
    PRIMARY KEY (`id_prioridad`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `contratacion` (
    `id_contratacion` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_contratacion` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `contratacion_dsc_contratacion_key`(`dsc_contratacion`),
    PRIMARY KEY (`id_contratacion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_elementos` (
    `id_tipo_elemento` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_tipo_elemento` VARCHAR(191) NOT NULL,
    `tipo_elemento` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `tipo_elementos_dsc_tipo_elemento_key`(`dsc_tipo_elemento`),
    PRIMARY KEY (`id_tipo_elemento`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expte_tipo_elemento` (
    `id_elem_expte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_expte` INTEGER NOT NULL,
    `id_tipo_elemento` INTEGER NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `expte_tipo_elemento_id_expte_id_tipo_elemento_key`(`id_expte`, `id_tipo_elemento`),
    PRIMARY KEY (`id_elem_expte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado` (
    `id_estado` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_estado` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `estado_dsc_estado_key`(`dsc_estado`),
    PRIMARY KEY (`id_estado`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `expte` (
    `id_expte` INTEGER NOT NULL AUTO_INCREMENT,
    `nro_expte` VARCHAR(191) NOT NULL,
    `fch_expte` DATE NOT NULL,
    `id_prioridad` INTEGER NOT NULL,
    `id_contratacion` INTEGER NOT NULL,
    `id_estado` INTEGER NOT NULL,
    `categoria` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,
    `fch_estado` DATE NULL,
    `refer_expte` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `expte_nro_expte_key`(`nro_expte`),
    PRIMARY KEY (`id_expte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `volante` (
    `id_volante` INTEGER NOT NULL AUTO_INCREMENT,
    `nro_volante` INTEGER NOT NULL,
    `year_volante` INTEGER NOT NULL,
    `total_volante` DECIMAL(65, 30) NOT NULL,
    `saldo` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `id_expte` INTEGER NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `volante_id_expte_key`(`id_expte`),
    PRIMARY KEY (`id_volante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `last_access` DATETIME(3) NOT NULL,
    `active` BOOLEAN NOT NULL,
    `cnt_intentos` INTEGER NOT NULL,
    `proc_user` VARCHAR(191) NOT NULL,
    `proc_fch` DATETIME(3) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles` (
    `id_rol` INTEGER NOT NULL AUTO_INCREMENT,
    `name_rol` VARCHAR(191) NOT NULL,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `roles_name_rol_key`(`name_rol`),
    PRIMARY KEY (`id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `roles_user` (
    `id_user` INTEGER NOT NULL,
    `id_rol` INTEGER NOT NULL,
    `proc_user` VARCHAR(191) NOT NULL,
    `proc_fch` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user_proc` VARCHAR(191) NULL,

    PRIMARY KEY (`id_user`, `id_rol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movimientos` (
    `id_mov` INTEGER NOT NULL AUTO_INCREMENT,
    `fch_mov` DATE NOT NULL,
    `ofi_mov` VARCHAR(50) NOT NULL,
    `user_mov` VARCHAR(50) NOT NULL,
    `det_mov` VARCHAR(250) NOT NULL,
    `id_expte` INTEGER NOT NULL,
    `user_proc` VARCHAR(191) NULL,
    `id_est_mov` INTEGER NOT NULL,

    PRIMARY KEY (`id_mov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `procesos` (
    `id_proc` INTEGER NOT NULL AUTO_INCREMENT,
    `id_volante` INTEGER NOT NULL,
    `nro_linea` INTEGER NOT NULL,
    `id_tipo_elem` INTEGER NOT NULL,
    `importe` DECIMAL(65, 30) NULL DEFAULT 0,
    `control_importe` INTEGER NULL DEFAULT 0,
    `fch_inicio` DATE NULL,
    `fch_fin` DATE NULL,
    `dias_control` INTEGER NULL DEFAULT 0,
    `fch_entrega` DATE NULL,
    `observ_proc` MEDIUMTEXT NULL,
    `id_orden_compra` INTEGER NULL,
    `id_estado` INTEGER NOT NULL,
    `saldo_proc` DECIMAL(65, 30) NULL DEFAULT 0,
    `user_proc` VARCHAR(191) NULL,
    `cant_proc` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id_proc`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orden_compra` (
    `id_orden_compra` INTEGER NOT NULL AUTO_INCREMENT,
    `nro_orden` VARCHAR(191) NOT NULL,
    `id_proveedor` INTEGER NOT NULL,
    `saldo_orden` DECIMAL(65, 30) NULL DEFAULT 0,
    `user_proc` VARCHAR(191) NULL,

    UNIQUE INDEX `orden_compra_nro_orden_key`(`nro_orden`),
    PRIMARY KEY (`id_orden_compra`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `factura` (
    `id_factura` INTEGER NOT NULL AUTO_INCREMENT,
    `importe_fact` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `nro_fact` VARCHAR(191) NULL,
    `fch_fact` DATE NULL,
    `expte_fact` TINYTEXT NULL,
    `observ_fact` TINYTEXT NULL,
    `user_proc` VARCHAR(191) NULL,

    PRIMARY KEY (`id_factura`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `proc_fact` (
    `id_proc_fact` INTEGER NOT NULL AUTO_INCREMENT,
    `id_factura` INTEGER NOT NULL,
    `id_proc` INTEGER NOT NULL,
    `importe_proc_fact` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `user_proc` VARCHAR(191) NULL,

    PRIMARY KEY (`id_proc_fact`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log_expte` (
    `id_log_expte` INTEGER NOT NULL AUTO_INCREMENT,
    `id_expte` INTEGER NOT NULL,
    `nro_expte` VARCHAR(100) NOT NULL,
    `id_prioridad` INTEGER NOT NULL,
    `id_contratacion` INTEGER NOT NULL,
    `id_estado` INTEGER NOT NULL,
    `categoria` VARCHAR(25) NOT NULL,
    `user_proc` VARCHAR(15) NOT NULL,
    `fch_user_proc` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fch_estado` DATE NOT NULL,
    `accion` VARCHAR(1) NULL,

    PRIMARY KEY (`id_log_expte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ctrol_proc_req` (
    `id_proc_activo` INTEGER NOT NULL,
    `id_proc_anexo` INTEGER NOT NULL,

    PRIMARY KEY (`id_proc_activo`, `id_proc_anexo`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estado_mov` (
    `id_est_mov` INTEGER NOT NULL AUTO_INCREMENT,
    `dsc_est_mov` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `estado_mov_dsc_est_mov_key`(`dsc_est_mov`),
    PRIMARY KEY (`id_est_mov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `est_mov_contratacion` (
    `id_contratacion` INTEGER NOT NULL,
    `id_est_mov` INTEGER NOT NULL,

    PRIMARY KEY (`id_contratacion`, `id_est_mov`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `expte_tipo_elemento` ADD CONSTRAINT `expte_tipo_elemento_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte`(`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expte_tipo_elemento` ADD CONSTRAINT `expte_tipo_elemento_id_tipo_elemento_fkey` FOREIGN KEY (`id_tipo_elemento`) REFERENCES `tipo_elementos`(`id_tipo_elemento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expte` ADD CONSTRAINT `expte_id_prioridad_fkey` FOREIGN KEY (`id_prioridad`) REFERENCES `prioridad`(`id_prioridad`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expte` ADD CONSTRAINT `expte_id_contratacion_fkey` FOREIGN KEY (`id_contratacion`) REFERENCES `contratacion`(`id_contratacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `expte` ADD CONSTRAINT `expte_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `volante` ADD CONSTRAINT `volante_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte`(`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_user` ADD CONSTRAINT `roles_user_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `user`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `roles_user` ADD CONSTRAINT `roles_user_id_rol_fkey` FOREIGN KEY (`id_rol`) REFERENCES `roles`(`id_rol`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimientos` ADD CONSTRAINT `movimientos_id_expte_fkey` FOREIGN KEY (`id_expte`) REFERENCES `expte`(`id_expte`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `movimientos` ADD CONSTRAINT `movimientos_id_est_mov_fkey` FOREIGN KEY (`id_est_mov`) REFERENCES `estado_mov`(`id_est_mov`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procesos` ADD CONSTRAINT `procesos_id_volante_fkey` FOREIGN KEY (`id_volante`) REFERENCES `volante`(`id_volante`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procesos` ADD CONSTRAINT `procesos_id_tipo_elem_fkey` FOREIGN KEY (`id_tipo_elem`) REFERENCES `tipo_elementos`(`id_tipo_elemento`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procesos` ADD CONSTRAINT `procesos_id_orden_compra_fkey` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra`(`id_orden_compra`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `procesos` ADD CONSTRAINT `procesos_id_estado_fkey` FOREIGN KEY (`id_estado`) REFERENCES `estado`(`id_estado`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `orden_compra` ADD CONSTRAINT `orden_compra_id_proveedor_fkey` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedor`(`id_proveedor`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proc_fact` ADD CONSTRAINT `proc_fact_id_factura_fkey` FOREIGN KEY (`id_factura`) REFERENCES `factura`(`id_factura`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `proc_fact` ADD CONSTRAINT `proc_fact_id_proc_fkey` FOREIGN KEY (`id_proc`) REFERENCES `procesos`(`id_proc`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ctrol_proc_req` ADD CONSTRAINT `ctrol_proc_req_id_proc_activo_fkey` FOREIGN KEY (`id_proc_activo`) REFERENCES `procesos`(`id_proc`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ctrol_proc_req` ADD CONSTRAINT `ctrol_proc_req_id_proc_anexo_fkey` FOREIGN KEY (`id_proc_anexo`) REFERENCES `procesos`(`id_proc`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `est_mov_contratacion` ADD CONSTRAINT `est_mov_contratacion_id_contratacion_fkey` FOREIGN KEY (`id_contratacion`) REFERENCES `contratacion`(`id_contratacion`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `est_mov_contratacion` ADD CONSTRAINT `est_mov_contratacion_id_est_mov_fkey` FOREIGN KEY (`id_est_mov`) REFERENCES `estado_mov`(`id_est_mov`) ON DELETE RESTRICT ON UPDATE CASCADE;
