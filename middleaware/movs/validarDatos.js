

const fecha = require('../../util/fechas')
const {body, validationResult}= require ('express-validator')

exports.validexpte=async(req, res, next)=>{

    const errors = validationResult(req)
    const valores = req.body
    let hoy = new Date(fecha.hoy())
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
    

    const {id_expte, fch_mov}=req.body
    
    
    
    let fechaEx= new Date(fecha.hoy())
    
    if(fch_mov){
        fechaEx = new Date(fecha.getFecha((fch_mov)))
    }
   
    
    if(fechaEx>hoy){
        newMsg = errors.array().concat({msg: '- *Fecha Erronea'})
        
    }
    
    
    if(errors.array().length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('movs/addmovs',{validaciones: msges,valores: valores, expte: id_expte,
                                 alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Errores de Ingreso', //msges
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: '',
                                user: req.user
                            })
                            return
        
    }else{
        
        
                next()
     


    }


    }

    


