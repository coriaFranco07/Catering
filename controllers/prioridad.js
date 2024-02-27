const servicePrioridad = require('../service/prioridad')

exports.getAllprds = async (req, res)=> { 
    const allPrioridades = await servicePrioridad.getAllPrioridades()
    res.render ('prioridades/prds', {prioridades: allPrioridades, user: req.user})
    }

exports.createPrioridad = (req, res)=>{
    res.render('prioridades/addprd',{alert: false, user: req.user})}

exports.addPrioridad = async(req, res)=>{
   const dsc_prioridad=req.body.prd.toUpperCase()
    const addprd = await servicePrioridad.addPrioridad(dsc_prioridad)
    res.redirect ('/prds')

}

exports.getIdPrioridad = async(req, res)=>{
    const idprd = req.params.id
    const getIdprd = await servicePrioridad.getIdPrioridad(idprd)
    res.render('prioridades/editprd', {prioridad: getIdprd, user: req.user})
}

exports.updatePrioridad = async (req, res)=>{
    const id = req.body.id_prioridad
    const desc = req.body.dsc_prioridad.toUpperCase()
    const updatePrd = await servicePrioridad.updatePrioridad(id, desc)
    res.redirect('/prds')

}

exports.deletePrd = async(req, res)=>{
    try{
        const id = req.params.id
        const delPrd = await servicePrioridad.deletePrd(id)
        res.redirect('/prds')

} catch (error) {
    if(error.code=='P2003'){
        res.render('error', {user: req.user, data: 'Error Prioridad en Expte.'})
    }else{
        res.render('error', {user: req.user, data: 'Error Prioridades'})
    }
    
 }

}