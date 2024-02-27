const serviceEstados = require('../../service/estado')
const serviceCtns = require('../../service/contratacion')
const {body, validationResult}= require ('express-validator')

exports.validMovEst=async(req, res, next)=>{

    const errors = validationResult(req)
    const valores = req.body
    
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
    

    const {contratacion, estado}=req.body
    
    
    const existMovEst = await serviceEstados.existMovEstCtns(contratacion, estado)
    const contrataciones = await serviceCtns.getAllContrataciones()
    const estados = await serviceEstados.getAllMovEst()




    if(errors.array().length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('movestctns/addmovestctns',{validaciones: msges,valores,contrataciones, estados,
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
                                
        res.render('movestctns/addmovestctns',{validaciones: msges,valores,contrataciones, estados,
            //aca van datos de sweetalert2
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'Contratacion - Estado, ya Existe',
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

    


