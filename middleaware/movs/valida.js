const {check, validationResult}= require ('express-validator')

const validaDatos= require('../../middleaware/movs/validarDatos')



exports.validate = [

  check('fch_mov', 'Fecha').exists().not().isEmpty(),
  check('oficina', 'Oficina').exists().not().isEmpty(),
  check('usuario', 'Usuario').exists().not().isEmpty(),
  check('detalle', 'detalle').exists().not().isEmpty(),
  (req,res,next)=>{
    validaDatos.validexpte(req, res, next)

  }

]