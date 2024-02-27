const serviceVolante = require('../../service/volante')
const serviceProveedor = require('../../service/proveedor')
const serviceFactura = require('../../service/factura')

const {body, validationResult}= require ('express-validator')

exports.validVolante=async(req, res, next)=>{
   
    const errors = validationResult(req)
    const valores = req.body
    let newMsg=errors.array()
    const msges= newMsg.map(msge => msge.msg)
    
    

    const {nro_linea, elemento,ord_compra, proveedor, id_volante}=req.body
    
    const elem = await serviceVolante.create(id_volante)
    const prvs = await serviceProveedor.getAllProveedor()
    
    
    if(newMsg.length){
       
        const msges= newMsg.map(msge => msge.msg)
       
        
        
        res.render('requer/addrequer', {alert: false, valores, elem, prvs,  id_volante, validaciones: msges,
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


        const  linea = await serviceVolante.ctrlLinea(id_volante, nro_linea)
        if(linea.length){

            res.render('requer/addrequer', {alert: false, valores, elem, prvs,  id_volante, 
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Error Verifique Nro. de Línea', //msges
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'create',
                user: req.user
            })
            return


        }

//la orden de compra puede existir varias veces pero solo en un mismo volante y con el mismo proveedor   
        if(ord_compra){
            const ordenExist = await serviceVolante.ctrlOrdCompra(id_volante, ord_compra, proveedor)
            if(ordenExist.length){

                res.render('requer/addrequer', {alert: false, valores, elem, prvs,  id_volante, 
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
        next()
    }

    }

    exports.deleteProcOC = async (req, res, next)=>{
        const id_proc= req.params.id
        const id_volante = req.params.id_volante
        const volante=await serviceVolante.getIdvolante(id_volante)
  
    
   
        const existProc_Fact = await serviceFactura.controlProc_Fact(id_proc)
        
        if(existProc_Fact.length){

            res.render('vlts/vlt', {volante, 
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Elimine primero Facturas de la O.C.', //msges
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

    
   