
const serviceFactura = require('../../service/factura')
const serviceVolante = require('../../service/volante')
const serviceProcesos = require('../../service/procc')
const fecha = require('../../util/fechas')

const {body, validationResult}= require ('express-validator')

exports.validFactura=async(req, res, next)=>{
   
    const errors = validationResult(req)
    const valores = req.body
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    let hoy = new Date(fecha.hoy())

    const {importe_fact, nro_fact, fch_fact, expte_fact, id_proc}=req.body
    
    let fechaEx= new Date(fch_fact)

    const data_proceso = await serviceProcesos.getIdProc(id_proc)
    const fch_Inicio_proc = data_proceso.fch_inicio
    

    if(fch_fact){
       
      
       if(fechaEx>hoy){
             newMsg = errors.array().concat({msg: 'Fch. Factura'})
        }else{
            if(fechaEx<fch_Inicio_proc){
                newMsg = errors.array().concat({msg: 'Fact. antes incio'})
            }
        }

    }

    const sumaProcesos = await serviceFactura.saldo_proceso(id_proc)
    

   
    if(newMsg.length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('facturas/addfactura', {id_proc, validaciones: msges,  valores, 
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

    const validaciones=[]
    

        if(parseFloat(importe_fact)> sumaProcesos.saldo_proc){
            
                res.render('facturas/addfactura', {id_proc, validaciones,  valores, 
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Importe Excedido', //msges
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


       