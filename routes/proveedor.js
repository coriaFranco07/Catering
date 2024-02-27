const express = require ('express')
const router = express.Router();

const validacion = require('../middleaware/proveedor/validarDatos')
const provController = require('../controllers/proveedor')
const auth = require ('../controllers/authController')


router
    .get('/', auth.isAuthenticated, provController.getProv)
    .get('/create', auth.isAuthenticated, provController.addPvd)
    .get('/delete/:id_pvd', auth.isAuthenticated, provController.delProveedor)
    .get('/edit/:id_pvd',auth.isAuthenticated,  provController.editPvn)
    .get('/:id_pvd', auth.isAuthenticated, provController.getIdProveedor)
    .post('/add', auth.isAuthenticated, validacion.validpvds, provController.addProveedor)
    .post('/update',auth.isAuthenticated,  provController.updateProveedor)
    .patch('/:id_pvd',auth.isAuthenticated, provController.updateProveedor)
    .delete('/:id_ctn',auth.isAuthenticated, provController.delProveedor)


module.exports = router