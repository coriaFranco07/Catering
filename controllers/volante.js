
const serviceExptes = require('../service/exptes')
const validExpte = require('../middleaware/exptes/valida')
const serviceMovs = require('../service/movs')
const format = require ('date-fns/format')
const serviceProcess = require('../service/procc')
const serviceVolante = require('../service/volante')
const fchUtil = require('../util/fechas')
const serviceProveedor = require('../service/proveedor')
const serviceFactura = require('../service/factura')
const serviceEstado = require('../service/estado')
const { id } = require('date-fns/locale')

exports.allvolantes = async(req, res)=>{

  
    const allvlts = await serviceVolante.getAllVolantes()
   
    res.render ('vlts/vlts', {volantes: allvlts, user: req.user})
}

exports.getIdVol = async(req, res)=>{

    try {
    

            const id_vol = req.params.id
            const valores = req.body
    
            const volante=await serviceVolante.getIdvolante(id_vol)
            
           
            const estados = await serviceEstado.getAllEstados()
            if(volante){
                res.render('vlts/vlt', {alert: false, volante, valores: valores, estados, user: req.user})
            }else{
                res.redirect('/exptes')
            }
    } catch (error) {

        res.render('error', {user: req.user, data: 'Error en Volante'})
    }
}   

exports.create = async (req, res)=>{
    const id_volante=req.params.id
     const valores = req.body
    const elem = await serviceVolante.create(id_volante)
    const prvs = await serviceProveedor.getAllProveedor()
    res.render('requer/addrequer', {alert: false, valores, elem, prvs,  id_volante, user: req.user })
  

}

exports.addRequerimiento = async (req, res)=>{
    const valores=req.body
    let addReq={}
    if(valores.ord_compra){
        addReq = await serviceVolante.addReqCOC(valores)
    }else{
        addReq = await serviceVolante.addReqSOC(valores)
    }
 
    const procActs = await serviceProcess.upProcActivos(addReq.id_proc, parseInt(valores.elemento))
    
    res.redirect('/volante/vlt/'+ valores.id_volante)
    


}

exports.deleteProc = async(req, res)=>{
    
    const id_proc= req.params.id
    const id_volante = req.params.id_volante
    
    const delvol = await serviceProcess.deleteProc(id_proc)
    const estado = await serviceEstado.getIdEstados(delvol.id_estado)
    

    if (!((estado.dsc_estado=="Cancelado") || (estado.dsc_estado=="Finalizado") )){
        const descuenta = await serviceProcess.upDecProcActivos(delvol.id_proc, delvol.id_tipo_elem)
    }
    
    res.redirect('/volante/vlt/'+ id_volante)

}

exports.getOrden = async(req, res)=>{

    try {
        
   
            const id_process = req.params.id
            const orden = await serviceProcess.getOrden(id_process)
            
            if(!orden.orden_compra){
            
                orden.orden_compra={nro_orden: null, id_proveedor: null}
            }
            
            const proveedor = await serviceProveedor.getAllProveedor()
        
            res.render('requer/editrequer', { orden, proveedor, alert:false, user: req.user})
        } catch (error) {
            res.render('error',{user: req.user, data: "Error base de datos"})
        }

    //res.send('entrando a orden')
}


exports.ordenUpdate = async(req, res)=>{
    const valores = req.body
    
    
    const upproc = await serviceProcess.updateProc(valores)//////service/procc
    //res.send ('acutalizar orden de compra')
    res.redirect('/volante/vlt/'+ valores.id_volante)
    
}


exports.getFactura = async(req, res)=>{
   
    const id_proc = req.params.id_proc
  
   
    const facturas= await serviceFactura.getAllFacturas(id_proc)
    if(!facturas.proc_fact.length){
        facturas.factura=[]
    }
    
    res.render('facturas/factura', {facturas, user: req.user})
   
   
  
}

exports.createFact = async(req, res)=>{
    const id_proc = req.params.id
    const validaciones=[]
    const valores={}
    valores.fch_fact=null
  
    
   res.render('facturas/addfactura', {alert: false,  valores, validaciones, id_proc,  user: req.user }) 
   
}

exports.addFactura=async(req, res)=>{
    const valores = req.body
    const addfact = await serviceFactura.addFactura(valores)
    res.redirect('/volante/fact/' + valores.id_proc)
   
}


exports.delFactura = async(req, res)=>{

    const delFact = await serviceFactura.deleteFact(req.params.id)
    res.redirect('/volante/factura/' + delFact)



}
//actulizo el estado del proceso y descuento si es Cancelado o Finalizado
//si el nuevo estado es activo recalculo los requerimientos pendientes
exports.upEstProc = async (req, res)=>{
    const id_estado= req.params.id_est
    const id_proc= req.params.id_proc
    const id_volante = req.params.id_vol

  
    const volante=await serviceVolante.getIdvolante(id_volante)
    const estados = await serviceEstado.getAllEstados()
    
  

    
     
            const proceso = await serviceProcess.getIdProc(id_proc) //trae de service/proc id_proc, id_tipo_elem, estado
            
            const estadoOld = proceso.estado.dsc_estado  //obtengo estado anterior del proceso
            const id_tipo_elem = proceso.id_tipo_elem  // obtengo id_tipo_elem

            let descEstadoNew=null
            estados.forEach((est)=>{
                if(est.id_estado==parseInt(id_estado)){
                    descEstadoNew=est.dsc_estado
                }
            })
            



            const upEst = await serviceProcess.upEstado(id_estado, id_proc) //actualizo el estado del proceso

            //si estaba cancelado o finalizado y ahora cambia a otro estado diferente a estos
            if(estadoOld=="Cancelado" || estadoOld=="Finalizado"){
                if(descEstadoNew!="Cancelado" && descEstadoNew != "Finalizado"){
                    await serviceProcess.upProcActivos(id_proc, id_tipo_elem)
                    //incremento cant_proc  de todos los procesos activos, excluyendo este que tengan ese requerimiento
                }

            }else{
                if(descEstadoNew=="Cancelado" || descEstadoNew == "Finalizado"){
                    await serviceProcess.upDecProcActivos(id_proc, id_tipo_elem)
                    //decremento en 1 todos los procesos activos que tienen este requerimiento
                }
                
                await serviceProcess.ceroProc(id_proc)

            }

            if(descEstadoNew=="Activo"){

                await serviceProcess.upActivo(id_proc, id_tipo_elem)
                //busco todos los procesos no cancelados ni finalizados que tengan este requerimiento
                // y actualizo este proceso con la cantidad
            }
    
    
  
   res.redirect('/volante/vlt/'+ id_volante)
   

    
    
    
}
exports.traer = async(req,res)=>{
    const devuelve = await serviceVolante.dame()
    console.log(devuelve)
    res.send ('finalizando')
}