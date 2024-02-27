const express = require('express')
const route = express.Router()
const controllerExptes = require('../controllers/exptes')
const validExpte = require('../middleaware/exptes/valida')
const validMovs = require('../middleaware/movs/valida')
const auth = require ('../controllers/authController')
const validEstados = require ('../middleaware/requerimiento/validaEstados')


route
    .get('/', auth.isAuthenticated, controllerExptes.allExptes)
    .get('/create', auth.isAuthenticated, controllerExptes.create)
    .get('/mov/:id([0-9])', auth.isAuthenticated, controllerExptes.allMovimientos)
    .get('/mov/delete/:id/:id_expte', auth.isAuthenticated, controllerExptes.delMov)
    .get('/mov/create/:id', auth.isAuthenticated, controllerExptes.createMov)
    .get('/procesos/:id', auth.isAuthenticated,  controllerExptes.procesos)///////
    .get('/edit/:id', auth.isAuthenticated, controllerExptes.editExpte)
    .get('/procesos/create/:id', auth.isAuthenticated, validEstados.ExpteEstado, controllerExptes.createProcess)
    .get('/estado/:id_estado/:id_expte', auth.isAuthenticated, controllerExptes.updateEstadoExpte)
    .get('/procesos/delete/:id_elem/:id_expte', auth.isAuthenticated, controllerExptes.deleteProcess)
    .post('/add', auth.isAuthenticated, validExpte.validate, controllerExptes.add)
    .post('/mov/create/add', auth.isAuthenticated, validMovs.validate,controllerExptes.addMov)
    .post('/procesos/add', auth.isAuthenticated, controllerExptes.addProcess)
    .post('/update', auth.isAuthenticated, validExpte.validateUpdate, controllerExptes.saveUpdate)
 


module.exports=route