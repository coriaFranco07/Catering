const {check, validationResult, body}= require ('express-validator')
const {validaResult}=require('../../validateHelper/validateHelperExpte')
const validaDatos= require('../../middleaware/exptes/validarDatos')
const { getYear } = require('date-fns')



exports.validate = [

  check('nro_expte', 'Expte.').exists().trim().not().isEmpty(),
  check('refer_expte', 'Refer.').exists().trim().not().isEmpty(),
  check('fch_expte', 'Fecha').exists().not().isEmpty(),
  check('solicitante', 'Solicitante').exists().trim().not().isEmpty(),
  check('oficina', 'Oficina').exists().trim().not().isEmpty(),
  (req,res,next)=>{
    validaDatos.validexpte(req, res, next)

  }

]
const today = new Date()
const year = today.getFullYear()

exports.validateUpdate=[
  check('nro_expte', 'Expte.').exists().trim().not().isEmpty(),
  check('refer_expte', 'Refer.').exists().trim().not().isEmpty(),
  check('fch_expte', 'Fecha').exists().isDate(),
   body('nro_volante', 'Volante Nro').isInt({min: 1}).optional({ nullable: true, checkFalsy: true }),
   body('year_volante', 'Año').isInt({min: year-3, max: year}).optional({ nullable: true, checkFalsy: true }),
   body('total_volante', 'Total').isDecimal({min: 1.01}).optional({ nullable: true, checkFalsy: true }),
   (req, res, next)=>{
      validaDatos.validUpdateExpte(req, res, next)
   }

]