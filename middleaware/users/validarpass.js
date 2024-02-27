const {body, validationResult}= require ('express-validator')
const serviceUser = require('../../service/users')
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

const {promisify} = require('util');


exports.validaUserspass=async(req, res, next)=>{
    const username=(req.body.username)
    const id = req.body.id_user
   
    const errors = validationResult(req)
    
    
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
   
    
    if(errors.array().length){
       
        
       
        
        
        res.render('users/edituser',{validaciones: msges, username: username, id: id,
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
        
    }else if(req.body.password != req.body.passwordconf){

        res.render('users/edituser', { validaciones: msges, username: username, id: id,
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

exports.validaUserspassChange=async(req, res, next)=>{
    const {user_pass_actual, user_pass_new, user_pass_conf, username}=req.body
    
    const errors = validationResult(req)
    
    
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
   
    
    if(errors.array().length){
       
        
       
        
        
        res.render('users/passuser',{validaciones: msges,
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
        
    }else if(user_pass_new != user_pass_conf){

        res.render('users/passuser', { validaciones: msges,
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

    
    }


    //******************************** */

    const getUser = await serviceUser.getUserName(username)
            
        if(getUser){
            
        
            if(!(await bcryptjs.compare(user_pass_actual, getUser.password))){
                
                res.render('users/passuser', {
                    //aca van datos de sweetalert2
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Contraseña Actual Incorrecta',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: 'login' 
    
                }) 
            }


    }
        
            next()
    
}