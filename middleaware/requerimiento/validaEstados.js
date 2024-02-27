const serviceEstado = require('../../service/estado')
const serviceVolante = require('../../service/volante')
const serviceExpte = require('../../service/exptes')
const serviceProcess = require('../../service/procc')






exports.validUpdateEstado=async(req, res, next)=>{
    const id_estado= req.params.id_est
    const id_proc= req.params.id_proc
    const id_volante = req.params.id_vol

    const estExp = await serviceVolante.getEstExpteVol(id_volante)
    const volante=await serviceVolante.getIdvolante(id_volante)
    const estados = await serviceEstado.getAllEstados()
    
   

    if(estExp.expte.estado.dsc_estado =="Cancelado" || estExp.expte.estado.dsc_estado=="Finalizado"){

        res.render('vlts/vlt', {volante, estados,
            //aca van datos de sweetalert2
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'Expte. Cancelado o Finalizado....................',
            alertIcon: 'info',
            showConfirmButton: true,
            timer: 4000,
            ruta: 'create',
            user: req.user

        })
        return

    } else{
        next()
    }

    


 
}

exports.ExpteEstado=async(req, res, next)=>{
    const id_expte= req.params.id


    //const estExp = await serviceExpte.getEstadoExpte(id_expte)

    const expte = await serviceExpte.getIdExpte(req.params.id)
  
    const procesos = await serviceProcess.getAllprocesos (req.params.id)
  
  
    

    if(expte.estado.dsc_estado =="Cancelado" || expte.estado.dsc_estado=="Finalizado"){

        res.render('procesos/process', {procesos, expte,
            //aca van datos de sweetalert2
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'Expte. Cancelado o Finalizado....................',
            alertIcon: 'info',
            showConfirmButton: true,
            timer: 4000,
            ruta: 'create',
            user: req.user

        })
        return

    } else{
        next()
    }
}
    


 




       