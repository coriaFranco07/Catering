const {check, validationResult, body}= require ('express-validator')
const {validaResult}=require('../../validateHelper/validateHelperExpte')
const validaDatos= require('../../middleaware/requerimiento/validarDatos')

const { getYear } = require('date-fns')



exports.validate = [

  check('nro_orden', 'Nro. Orden').not().isEmpty().trim(),
  check('proveedor', 'Proveedor').not().isEmpty().trim(),
  check('importe', 'Importe').isDecimal({min: 0}).not().isEmpty(),
  check('control_importe', '% Control').isInt({min:0, max: 100}).optional({ nullable: true, checkFalsy: true }),
  check('fch_inicio', 'Inicio').isDate().optional({ nullable: true, checkFalsy: true }),
  check('fch_fin', 'Fin').isDate().optional({ nullable: true, checkFalsy: true }),
  check('dias_control', 'Ctol. Días').isInt({min:0, max: 365}).optional({ nullable: true, checkFalsy: true }),
  check('fch_entrega', 'Entrega').isDate().optional({ nullable: true, checkFalsy: true }),
  (req,res,next)=>{
    
    validaDatos.validVolante(req, res, next)

  }

]
