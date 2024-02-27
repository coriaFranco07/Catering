const {check, validationResult}= require ('express-validator')

const validaDatos= require('../../middleaware/movestados/validarDatos')



exports.validate = [

  check('movest', 'Estado Movimiento').exists().not().isEmpty(),
 
  (req,res,next)=>{
    validaDatos.validMovEst(req, res, next)

  }

]