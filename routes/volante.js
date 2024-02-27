const express = require('express')
const route = express.Router()
const controllerVlts = require('../controllers/volante')
const validReq = require('../middleaware/requerimiento/valida')
const validVts = require('../middleaware/volantes/valida')
const validFact = require('../middleaware/facturas/valida')
const validEstado = require('../middleaware/requerimiento/validaEstados')
const validVolantes = require('../middleaware/volantes/validarDatos')
const auth = require ('../controllers/authController')


route
    .get('/', auth.isAuthenticated, controllerVlts.allvolantes)
    .get('/vlt/:id', auth.isAuthenticated, controllerVlts.getIdVol)
    .get('/create/:id',auth.isAuthenticated, controllerVlts.create)
    .get('/prueba', controllerVlts.traer)
    .get('/delete/:id/:id_volante', auth.isAuthenticated, validVolantes.deleteProcOC, controllerVlts.deleteProc)
    .get('/orden/:id', auth.isAuthenticated, controllerVlts.getOrden)
    .get('/factura/:id_proc', auth.isAuthenticated, controllerVlts.getFactura)
    .get('/fact/:id', auth.isAuthenticated, controllerVlts.createFact) 
    .get('/fact/delete/:id', auth.isAuthenticated,  controllerVlts.delFactura)
    .get('/estado/:id_est/:id_proc/:id_vol', auth.isAuthenticated, validEstado.validUpdateEstado, controllerVlts.upEstProc )  ///
    .post('/add',auth.isAuthenticated, validVts.validate,controllerVlts.addRequerimiento)
    .post('/proc/update', auth.isAuthenticated, validReq.validate, controllerVlts.ordenUpdate)
    .post('/factura/add', auth.isAuthenticated, validFact.validate, controllerVlts.addFactura)
  
   
 


module.exports=route
