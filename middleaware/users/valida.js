const {check, validationResult}= require ('express-validator')

const validaDatos= require('../../middleaware/users/validarDatos')
const validapass= require('../../middleaware/users/validarpass')



exports.validate = [

  check('username', 'Usuario').exists().isNumeric(),
  check('password', 'Contraseña').exists().isLength({min: 6, max: 12}),
  check('passwordconf', 'Confirmacion Contraseña').exists().isLength({min: 6, max: 12}),

  (req,res,next)=>{
   
    validaDatos.validaUsers(req, res, next)

  }

]

exports.validatepass = [

  check('username', 'Usuario').exists().isNumeric(),
  check('password', 'Contraseña').exists().isLength({min: 6, max: 12}),
  check('passwordconf', 'Confirmacion Contraseña').exists().isLength({min: 6, max: 12}),

  (req,res,next)=>{
   
    
   
    validapass.validaUserspass(req, res, next)

  }

]

exports.validatepasschange = [

  check('user_pass_actual', 'Actual').exists().isLength({min: 6, max: 12}),
  check('user_pass_new', 'Nueva').exists().isLength({min: 6, max: 12}),
  check('user_pass_conf', 'Confir.').exists().isLength({min: 6, max: 12}),

  (req,res,next)=>{
   
    
   
    validapass.validaUserspassChange(req, res, next)

  }

]