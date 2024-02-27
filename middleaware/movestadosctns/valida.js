const {check, validationResult}= require ('express-validator')

const validaDatos= require('../../middleaware/movestadosctns/validarDatos')



exports.validate = [

  check('contratacion', 'Tipo Contratacion').exists().not().isEmpty(),
  check('estado', 'Tipo estado').exists().not().isEmpty(),
  (req,res,next)=>{
    validaDatos.validMovEst(req, res, next)

  }

]