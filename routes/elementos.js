const express=require('express')

const route = express.Router()
const controllerElementos = require('../controllers/elementos')
const validar = require('../middleaware/elementos/validarDatos')
const auth = require ('../controllers/authController')



route
    .get('/', auth.isAuthenticated, controllerElementos.getAllElementos)
    .get('/create', auth.isAuthenticated, controllerElementos.createElementos)
    .get('/edit/:id', auth.isAuthenticated, controllerElementos.getElemento)
    .get('/delete/:id', auth.isAuthenticated, controllerElementos.delElemento)
    .post('/add', auth.isAuthenticated, validar.validelt, controllerElementos.addElemento)
    .post('/update', auth.isAuthenticated, controllerElementos.updateElemento)
    




    module.exports=route