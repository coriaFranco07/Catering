const differenceInDays = require('date-fns/differenceInDays')
const serviceInformes = require('../service/Informes')

const format = require ('date-fns/format')

const fchUtil = require('../util/fechas')



exports.getAllReq = async (req, res)=>{
    const requerimientos = await serviceInformes.allRequerimientos()
    
    let valor=0;
    const hoy = new Date()
    let fch_final = null
    let fch_entrega=null
    let dias = 0
    let cant_sinVolante =0
    
    const reqsinVol= await serviceInformes.reqSinVolante()

    requerimientos.forEach((req)=>{
        req.ctrl_porc = 'En Proceso'
        req.ctrl_fch='En Proceso'
        req.ctrl_entrega='En Proceso'
        req.cant_sv=0
        if(req.estado.dsc_estado=='Activo'){
                valor=0
                fch_final = null
                fch_entrega=null
                dias=0

              if(req.control_importe){  
                valor=((req.importe*req.control_importe)/100)
                if(req.saldo_proc<=valor){
                    req.ctrl_porc = 'Requiere Supervisión'
                }
              }  
                const dias_ctrl = req.dias_control
               
                if(req.fch_fin){
                    fch_final= new Date(req.fch_fin)
                    dias = differenceInDays( fch_final,hoy)
                
                        if(req.dias_control){
                            if(req.dias_control>dias){
                                req.ctrl_fch='Requiere Supervisión'
                            }
                        }
                }
                
                
                if(req.fch_entrega){
                    
                    fch_entrega= new Date(req.fch_entrega)
                    
             

                    if(req.tipo_elementos.tipo_elemento=='BIENES'){
                      
                        if(fch_entrega<=hoy){
                           
                            req.ctrl_entrega='Requiere Supervisión'
                        }
                    }
                }
                
        cant_sinVolante=0
        reqsinVol.forEach((rsv)=>{
            if(req.tipo_elementos.id_tipo_elemento == rsv.id_tipo_elemento){
                cant_sinVolante ++

            }
        })
        req.cant_sv = cant_sinVolante

         } 

    })
     
    res.render('informes/requerimientos', {requerimientos, user: req.user})
    //res.render('informes/panes', {requerimientos, user: req.user})
 
   
   
 
}

exports.getAllVolantes = async (req, res)=>{
    const volantes = await serviceInformes.allVolantes()
 
    res.render('informes/volantes', {volantes, user: req.user})

   // res.send('mostrar todos los Volantes')
}
exports.getAllOrdenes = async (req, res)=>{

    res.send('mostrar todas las Ordenes')
}
exports.getAllFacturas = async (req, res)=>{
    const facturas= await serviceInformes.getAllFacturas()
  
  res.render('informes/facturas', {facturas, user: req.user})
   // res.send('mostrar facturas')
}

exports.getAllElementos = async (req, res)=>{
    const elem = req.params.elem
    const id_proc = req.params.id_proc

    const elementos = await serviceInformes.allReqElem(elem, id_proc)
    res.render('informes/elementos', {elementos, elem,user: req.user})
    //res.send('elementos')
}

exports.getAllenProceso = async (req, res)=>{
    const elem = req.params.elem
    

    const elementos = await serviceInformes.allElemSinProceso(elem)
   res.render('informes/elemSinVolante', {elementos, elem,user: req.user})
   // res.send('elementos')
}