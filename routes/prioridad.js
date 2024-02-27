const express = require('express')
const route = express.Router()
const controllerPrioridad = require('../controllers/prioridad')
const validPrioridad = require('../middleaware/prioridad/validarDatos')
const auth = require ('../controllers/authController')

route
    .get('/', auth.isAuthenticated, controllerPrioridad.getAllprds)
    .get('/create', auth.isAuthenticated, controllerPrioridad.createPrioridad)
    .get('/edit/:id', auth.isAuthenticated, controllerPrioridad.getIdPrioridad)
    .get('/delete/:id', auth.isAuthenticated, controllerPrioridad.deletePrd)
    .post('/add', auth.isAuthenticated, validPrioridad.validprds, controllerPrioridad.addPrioridad) 
    .post('/update', auth.isAuthenticated, controllerPrioridad.updatePrioridad)

module.exports = route