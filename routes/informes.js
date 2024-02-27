const express = require('express')
const route = express.Router()
const controllerVlts = require('../controllers/volante')
const validReq = require('../middleaware/requerimiento/valida')
const validVts = require('../middleaware/volantes/valida')
const validFact = require('../middleaware/facturas/valida')
const validVolantes = require('../middleaware/volantes/validarDatos')
const auth = require ('../controllers/authController')
const controllerInformes = require('../controllers/informes')


route
    .get('/requerimientos', auth.isAuthenticated, controllerInformes.getAllReq)
    .get('/volantes', auth.isAuthenticated, controllerInformes.getAllVolantes)
    .get('/ordenes', auth.isAuthenticated, controllerInformes.getAllOrdenes)
    .get('/facturas', auth.isAuthenticated, controllerInformes.getAllFacturas)
    .get('/requerimientos/datos/:elem/:id_proc', auth.isAuthenticated, controllerInformes.getAllElementos)
    .get('/requerimientos/enproceso/:elem', auth.isAuthenticated, controllerInformes.getAllenProceso)
    
    /* .post('/proc/update', auth.isAuthenticated, validReq.validate, controllerVlts.ordenUpdate)
    .post('/factura/add', auth.isAuthenticated, validFact.validate, controllerVlts.addFactura) */
   //.post('/factura/add', auth.isAuthenticated, controllerVlts.addFactura)
   
  


module.exports=route
