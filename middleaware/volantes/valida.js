const {check, validationResult, body}= require ('express-validator')
const {validaResult}=require('../../validateHelper/validateHelperExpte')
const validaDatos= require('../../middleaware/volantes/validarDatos')

const { getYear } = require('date-fns')



exports.validate = [

  check('nro_linea', 'Linea').isInt({min:1, max: 500}),
  check('elemento', 'Requerimiento').not().isEmpty(),
  check('ord_compra', 'Or.Compra').trim().optional({ nullable: true, checkFalsy: true }),
  check('proveedor', 'Proveedor').exists().not().isEmpty(),
  (req,res,next)=>{
    validaDatos.validVolante(req, res, next)

  }

]
//const today = new Date()
//const year = today.getFullYear()

exports.validateUpdate=[
  check('nro_linea', 'Linea').isInt({min:1, max: 500}),
  check('elemento', 'Requerimiento').exists().not().isEmpty(),
  check('ord_compra', 'Or.Compra').trim().optional({ nullable: true, checkFalsy: true }),
  check('proveedor', 'Proveedor').exists().not().isEmpty(),
   (req, res, next)=>{
      validaDatos.validUpdateVolante(req, res, next)
   }

]