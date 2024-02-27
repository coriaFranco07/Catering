const {check, validationResult, body}= require ('express-validator')
const {validaResult}=require('../../validateHelper/validateHelperExpte')
const validaDatos= require('../../middleaware/facturas/validarDatos')

const { getYear } = require('date-fns')



exports.validate = [

  check('importe_fact', 'Importe').isDecimal({min:1}),
  check('nro_fact', 'Nro. Factura').trim().optional({ nullable: true, checkFalsy: true }),
  check('fch_fact', 'Fch. Factura').isDate().optional({ nullable: true, checkFalsy: true }),
  check('expte_fact', 'Expediente').trim().optional({ nullable: true, checkFalsy: true }),
  (req,res,next)=>{
    
    validaDatos.validFactura(req, res, next)

  }

]
