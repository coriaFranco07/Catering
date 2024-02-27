const serviceEstado = require('../service/estado')
const serviceExptes = require('../service/exptes')
const validExpte = require('../middleaware/exptes/valida')
const serviceMovs = require('../service/movs')
const format = require ('date-fns/format')
const serviceProcess = require('../service/procesos')
const fchUtil = require('../util/fechas')


exports.allExptes = async(req, res)=>{

     const estados = await serviceEstado.getAllEstados()
    const allExptes = await serviceExptes.getAllExptes()
    
    
    res.render ('exptes/exptes', {exptes: allExptes, estados,user: req.user})
}

exports.create = async(req, res)=>{
    
    const valores = req.body
    const {prioridades, contratacion}=await serviceExptes.create()
    
    
    res.render('exptes/addexpte', {alert: false, prioridad: prioridades , contratacion: contratacion,valores: valores, user: req.user})
}



exports.add= async(req, res,next)=> {
    
    const valores = req.body
    const newExpte = await serviceExptes.addExpte(valores, req.user)
    res.redirect('/exptes')
    
          
}



//movimientos
exports.allMovimientos = async(req, res)=>{
   
    const id = req.params.id
    const expte = await serviceExptes.getIdExpte(id)
    
    const allMovs = await serviceMovs.getAllMovs(id, expte.fch_estado)
    
   
    res.render ('movs/movs', {movs: allMovs, expte, user: req.user})
}

exports.createMov = async(req, res)=>{
    const valores= req.body
    const id_expte = req.params.id
    const datosExpte = await serviceExptes.getIdExpte(id_expte)
    const id_contratac = datosExpte.contratacion.id_contratacion
    const estados = await serviceExptes.est_mov_contrat(id_contratac)
    console.log(valores)
    res.render('movs/addmovs', {alert: false, expte: id_expte, estados,valores, user: req.user})
}

exports.addMov= async(req, res)=>{
    console.log('hasta aca...................')
    const valores= req.body
    const id_expte = req.params.id
   
    
    const newMov = await serviceMovs.addMov(valores)
    
    const allMovs = await serviceMovs.getAllMovs(valores.id_expte)
    const expte = await serviceExptes.getIdExpte(valores.id_expte)
    
    res.render('movs/movs', {movs: allMovs, expte, user: req.user})
}

exports.delMov = async(req, res)=>{
    const id_expte =req.params.id_expte
    const id_mov= req.params.id
    const deleteMov = await serviceMovs.delMov(id_mov)
    res.redirect('/exptes/mov/' + id_expte)

}

//REQUERIMIENTOS

exports.procesos = async(req, res)=>{
    
    const expte = await serviceExptes.getIdExpte(req.params.id)
  
    const allPrEx = await serviceProcess.allProcExpte (req.params.id)
  
   res.render('procesos/process',{procesos: allPrEx, user: req.user, expte, alert:false})

    } 

exports.createProcess = async(req, res)=>{

    let elemDist = []//await serviceProcess.elemDistProc(req.params.id)
    const validaciones=[]
    
    const expte = await serviceExptes.getIdExpte(req.params.id)
    const categoria= expte.categoria
    
    if(expte.categoria =='BIENES Y SERVICIOS'){
        
        elemDist = await serviceProcess.elemDistProc(req.params.id)
    }else{
       
        elemDist = await serviceProcess.elemDistProcTipoElemento(req.params.id, expte.categoria)
        
    }

    if(elemDist.length){
    
        res.render('procesos/addproc', {elementos: elemDist, expte: req.params.id, alert: false, validaciones, user:req.user})

    }else{
        const allPrEx = await serviceProcess.allProcExpte (req.params.id)
  
        res.render('procesos/process',{procesos: allPrEx, user: req.user, expte, 
        
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Sin Requerimientos por Agregar',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: 'create',
                    user: req.user
        })
    }

}

exports.addProcess = async (req, res)=>{
    const id_expte = req.body.id_expte
    const id_tipo_elemento = req.body.id_tipo_elemento
    
        const addProc = await serviceProcess.addProcess(id_expte, id_tipo_elemento)
    
    res.redirect('/exptes/procesos/' + id_expte)
}

exports.editExpte = async(req, res)=>{
    const id_expte= req.params.id
    const valores = await serviceExptes.getIdExpte(id_expte)
    
    const {prioridades, contratacion}=await serviceExptes.create()
    let validaciones=[];
    
    res.render ('exptes/editexpte', {prioridad: prioridades, contratacion, alert: false, user: req.user, validaciones, valores, id_expte})
    //res.send('editando expte')
}

exports.saveUpdate = async(req, res)=>{
    const id_expte = req.body.id_expte
    const valores= req.body
   
   if(valores.nro_volante){

    //res.send('actualiza con volante')
        const expteUpdate = await serviceExptes.expteUpdateCV(id_expte,valores, req.user)
    
        res.redirect('/exptes') 
   }else{
       
        const expteUpdate = await serviceExptes.expteUpdateSV(id_expte,valores, req.user)
        res.redirect('/exptes')
    }
    
}

exports.deleteProcess = async(req, res)=>{
    const id_expte = req.params.id_expte
   
     
    const delExpElem = await serviceExptes.delExpteElem(req.params.id_elem)
   
    
    res.redirect('/exptes/procesos/' + id_expte)


}

exports.updateEstadoExpte = async (req, res)=>{
    const id_est = req.params.id_estado
    const id_expte = req.params.id_expte
    
    //Variable date para establecer el estado del expte
    let fechaEstado = null
    //retorna datos del expte si no tiene volante setea a null nro_volante, year_volante, importe
    const oldExpte = await serviceExptes.getIdExpte(id_expte)
    
    
    
    //devuelve la descripcion del nuevo estado
    const estados = await serviceEstado.getIdEstados(id_est)
    
     //almaceno en requer [] los requerimientos de ese expte
     let requer =[]
     // arregla estado cancelado volante nulo
     if(oldExpte.id_volante.length){
        oldExpte.id_volante.procesos.forEach((req)=>{
            requer.push(req.id_tipo_elem)
        })
    }
    if(estados.dsc_estado =="Finalizado" || estados.dsc_estado=="Cancelado"){

        fechaEstado=new Date()
        
        if(oldExpte.estado.dsc_estado != "Finalizado" && oldExpte.estado.dsc_estado != "Cancelado"){
            //si el estado es finalizado o Cancelado pero antes no lo era
   
            //envio a actualizar cant de procesos en los procesos que tengan los requerimientos
            const upEstProc = await serviceProcess.updateEstProcCantProc(requer, id_est)

            const upEstFinOrCancel = await serviceExptes.updateProcFinalizar(id_expte, id_est)
         
        }
    }else{
        if(oldExpte.estado.dsc_estado=="Finalizado" || oldExpte.estado.dsc_estado =="Cancelado"){
            const upEstProcInc = await serviceProcess.updateEstProcCantProcInc(requer, id_est)
           
        }
    }
    //actuliza a nuevo estado el expte
    const upEstado = await serviceExptes.updateEstado(id_est, id_expte,fechaEstado);
    await serviceExptes.deleteExpte_elem(id_expte)
     
      
    res.redirect('/exptes')
   
}