const serviceEstados = require('../../service/estado')
const {body, validationResult}= require ('express-validator')

exports.validMovEst=async(req, res, next)=>{

    const errors = validationResult(req)
    const valores = req.body
    
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
    

    const {movest}=req.body
    
    const existMovEst = await serviceEstados.getEstMovName(movest)
    
    
    if(errors.array().length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('movest/addmovest',{validaciones: msges,
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
        
    }

    if(existMovEst){
                                
        res.render('movest/addmovest',{validaciones: msges,
            //aca van datos de sweetalert2
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'El Estado Existe',
            alertIcon: 'info',
            showConfirmButton: true,
            timer: 4000,
            ruta: 'create',
            user: req.user

        }) 
        return  


    }
        next()
    

    }

    


