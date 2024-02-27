
const serviceProveedor = require('../../service/proveedor')
const serviceVolante = require('../../service/volante')
const serviceProcesos = require('../../service/procc')
const serviceFactura = require('../../service/factura')
const fecha = require('../../util/fechas')
//const differenceInDays = require('date-fns/differenceInDays')
const { differenceInDays, subDays, addDays } = require('date-fns')

const {body, validationResult}= require ('express-validator')
/* const { default: differenceInCalendarDays } = require('date-fns/esm/fp/differenceInCalendarDays')
const { differenceInDays, subDays, addDays } = require('date-fns') */

exports.validVolante=async(req, res, next)=>{
   
    const errors = validationResult(req)
    const orden = req.body
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    let hoy = new Date(fecha.hoy())
    orden.orden_compra={}
   

    const {nro_orden,importe, control_importe, fch_inicio, fch_entrega, dias_control, id_proc, id_volante, proveedor}=req.body
    orden.orden_compra.id_proveedor = proveedor
    orden.orden_compra.nro_orden= nro_orden
    const proc ={id_proc: id_proc}
    let fechaEx= new Date(fecha.hoy())

    
    if(fch_inicio){
        
        fechaEx = new Date(fch_inicio)
        orden.fch_inicio=fechaEx

    }


    if(fch_entrega){
       orden.fch_entrega=new Date(fch_entrega)
      
       if(orden.fch_entrega< fechaEx){
             newMsg = errors.array().concat({msg: 'Fch. Entrega'})
        }

    }

    if(orden.fch_fin){
        orden.fch_fin=new Date(orden.fch_fin)
       
        if(orden.fch_fin< fechaEx){
              newMsg = errors.array().concat({msg: 'Fch. Fin'})
         }
 
     }
    
    if(fechaEx>hoy){
        newMsg = errors.array().concat({msg: 'Fch. Inicio'})
        
    };

    if(parseInt(orden.dias_control) ){
        if(!orden.fch_inicio || !orden.fch_fin){
                newMsg = errors.array().concat({msg: 'Ctrol. días'})
        }else{
        
                let fechaRestada = subDays( orden.fch_fin, orden.dias_control)
                
                let difDias = differenceInDays(fechaRestada, orden.fch_inicio)
                console.log(orden.fch_fin)
                console.log(fechaRestada)
                console.log(difDias)
                if(difDias<0){
                    newMsg = errors.array().concat({msg: 'Ctrol. días'})
                }
        }
    }



    
    //Control de fechas actualizado
    //orden.fch_inicio=fechaEx
    //orden.fch_entrega=fechaEx
    
    const proveedores = await serviceProveedor.getAllProveedor()
    
   
    if(newMsg.length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('requer/editrequer', {id_proc, validaciones: msges, orden, proveedor: proveedores, 
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

    if(nro_orden){
        
        const limpiarOrdenes = await serviceProcesos.limpiarOrdenes()
       
        const ordenExist = await serviceVolante.ctrlOrdCompra(id_volante, nro_orden, proveedor)
        
        if(ordenExist.length){
            
            orden.orden_compra.nro_orden= null
            res.render('requer/editrequer', {id_proc, validaciones: msges, orden, proveedor: proveedores, 
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Error Orden de Compra', //msges
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            })
            return
        }
           
    }
    
    //CONTROL FUNCIONA PERO ESTA DEFINIDO  ABAJO
    /*  const facturado = await serviceFactura.facturasOrden(id_proc)
     if(facturado._sum.importe_proc_fact){
        if ((!(importe)) || (parseFloat(importe)<parseFloat(facturado) )) {
           
            res.render('requer/editrequer', {id_proc, validaciones: msges, orden, proveedor: proveedores, 
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Facturación supera Importe Requerimiento', //msges
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            })
            return

        }
     } */

  

    if(importe){
        const totalVol = await serviceProcesos.valorVolante(id_volante)
        const allProc = await serviceProcesos.getIdvolante(id_volante)
        const totalInt = parseInt(totalVol.total_volante)
        let total =0
       
        allProc.forEach((pesos) => {
            
            if(pesos.id_proc!=id_proc){total += parseInt(pesos.importe)}
        })    

        total+=parseInt(importe)
       
        
        if((total) > totalInt){
            
            res.render('requer/editrequer', {id_proc, validaciones: msges, orden, proveedor: proveedores, 
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'El Importe supera el Total del Volante', //msges
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            })
            return
       
        }
         
           
    }
   
    const fact_proc = await serviceFactura.facturasOrden(id_proc)
    
    if(parseFloat(importe)<fact_proc._sum.importe_proc_fact){
        res.render('requer/editrequer', {id_proc, validaciones: msges, orden, proveedor: proveedores, 
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'El Importe es Menor que la Facturación', //msges
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


       