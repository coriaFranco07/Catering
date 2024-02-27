const serviceValidName = require('../../service/exptes')
const prioridades = require('../../service/prioridad')
const contrataciones= require('../../service/contratacion')
const serviceProcess = require('../../service/procesos')
const serviceVolante = require('../../service/volante')
const fecha = require('../../util/fechas')
const {body, validationResult}= require ('express-validator')

exports.validexpte=async(req, res, next)=>{

    const errors = validationResult(req)
    const valores = req.body
    let hoy = new Date(fecha.hoy())
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
    

    const {nro_expte, fch_expte,categoria, prioridad, contratacion, solicitante, oficina}=req.body
    
    const prds = await prioridades.getAllPrioridades()
    const cnts = await contrataciones.getAllContrataciones()
    
    let fechaEx= new Date(fecha.hoy())
    
    if(fch_expte){
        fechaEx = new Date(fecha.getFecha((fch_expte)))
    }
   
    
    if(fechaEx>hoy){
        newMsg = errors.array().concat({msg: '- *Fecha Erronea'})
        
    }
    
    
    if(newMsg.length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts, validaciones: msges,valores: valores,
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
        
         
        const validacionEst = await serviceValidName.getExpteNro(nro_expte)

        if(validacionEst){
           
            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts, validaciones: msges,valores: valores,
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'El Expediente Existe, veirifique',
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

    
    exports.validUpdateExpte=async(req, res, next)=>{
       
        const errors = validationResult(req)
        const valores = req.body
        let hoy = new Date(fecha.hoy())
        let newMsg=errors.array()
        const msges= newMsg.map(msge => msge.msg)
        let {fch_expte, nro_expte, nro_volante, year_volante, total_volante}= req.body
        
               
        const prioridad = await prioridades.getAllPrioridades()
        const contratacion = await contrataciones.getAllContrataciones()
        
        let fechaEx= new Date(fecha.hoy())
        
                    if(fch_expte){
                        
                        fechaEx = new Date(fecha.getFecha((fch_expte)))
                        if(fechaEx>hoy ){
                                                       
                            newMsg = errors.array().concat({msg: '- Fecha Erronea'})
                                
                        }

                        
                    }
                    
                    if(nro_volante || year_volante || total_volante){
                        
                        if(!nro_volante || nro_volante==0){
                            
                            newMsg = errors.array().concat({msg: 'Volante'})
                        }
                        if(!year_volante || year_volante==0){
                            newMsg = errors.array().concat({msg: 'Año'})
                        }
                        if(!total_volante || total_volante==0){
                            newMsg = errors.array().concat({msg: 'Total'})
                        }
                    }
                    
                    
        valores.fch_expte=new Date(fch_expte)
        const validaciones= newMsg.map(msge => msge.msg)
        if(newMsg.length){
           
            
            
           
            
            
            res.render('exptes/editexpte',{prioridad,contratacion, validaciones,valores, id_expte: valores.id_expte,
                                     alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'Errores de Ingreso', //msges
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: 4000,
                                    ruta: 'create',
                                    user: req.user
                                })
            
        }else{
            
            
    
            const validacionEst = await serviceValidName.getExpteNro(nro_expte)
            
            const mensajes=[]
            if(validacionEst){
               
                if(valores.id_expte!=validacionEst.id_expte){
                  
                    res.render('exptes/editexpte',{prioridad,contratacion, validaciones,valores, id_expte: valores.id_expte,
                        alert: true,
                        alertTitle: 'Advertencia',
                        AlertMessage: 'El Expediente Existe, veirifique',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 4000,
                        ruta: 'create',
                        user: req.user
                    }) 
                    return
                }
                
        
            };
            
            if(valores.nro_volante){
               
                
                const validacionVolante = await serviceVolante.getNroVolanteExpte(valores.nro_volante, valores.year_volante)
                
                if(validacionVolante.length){
                    
                    
                    if(validacionVolante[0].id_expte!=valores.id_expte){
                        
                       

                        res.render('exptes/editexpte',{prioridad,contratacion, validaciones: mensajes,valores: valores,id_expte: valores.id_expte,
                        
                            alert: true,
                            alertTitle: 'Advertencia',
                            AlertMessage: 'El Volante Existe, veirifique',
                            alertIcon: 'info',
                            showConfirmButton: true,
                            timer: 4000,
                            ruta: '',
                            user: req.user
                        }) 
                        return

                    }
                }
                
            };
               
 
     
            const categoriaUpdate = await serviceProcess.elemDistUpdateExpte(valores.id_expte, valores.categoria)
            
        
            if((categoriaUpdate.length)&&( valores.categoria!='BIENES Y SERVICIOS')){
                res.render('exptes/editexpte',{prioridad,contratacion, validaciones: mensajes,valores: valores,id_expte: valores.id_expte,
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Error Elimine Requerimientos de otra Categoria',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: 'create',
                    user: req.user
                }) 
                return
            }
            else{
                
                next()
            }
        }
    
    
        }
    

