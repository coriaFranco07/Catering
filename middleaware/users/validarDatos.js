const serviceValidName = require('../../service/users')
const {body, validationResult}= require ('express-validator')

exports.validaUsers=async(req, res, next)=>{

    const errors = validationResult(req)
 
    const valores = req.body
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
   
    
    if(errors.array().length){
       
        
       
        
        
        res.render('users/adduser',{validaciones: msges,valores: valores,
                                 alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Errores de Ingreso', //msges
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user
                            })
                            return
        
    }else{
        
         

        const validacionUser = await serviceValidName.getUserName(req.body.username)

        if(validacionUser){
           
            res.render('users/adduser', { validaciones: msges,valores: valores,
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'El Usuario Existe, veirifique',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            }) 
            return

        }else if(req.body.password != req.body.passwordconf){

            res.render('users/adduser', { validaciones: msges,valores: valores,
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Confirmación de Contraseña Erronea',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            }) 
            return

        
        }else{
            
                next()
        }


    }


    }

    


