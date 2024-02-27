const serviceContratacion = require('../service/contratacion')

exports.getAllContrataciones = async(req, res)=>{
   try {
        const ctns=await serviceContratacion.getAllContrataciones()
        res.render('contratacion/ctns', {contrataciones: ctns, user: req.user})

   } catch (error) {

        res.render('error', {user: req.user, data: 'Error Contrataciones'})
}

}

exports.addCtn=(req, res)=>{res.render('contratacion/addctn',{alert: false, user: req.user})}

exports.editCtn=async (req, res)=>{
    const ctn=await serviceContratacion.getIdContratacion(req.params.id_ctn)
    res.render('contratacion/editctn', {contratacion: ctn , user: req.user})}




exports.getIdContratacion=async(req, res)=>{
    const ctn=await serviceContratacion.getIdContratacion(req.params.id_ctn)
   
    res.send(ctn)
}
exports.delContratacion = async (req, res)=>{
 try {
    const delctn=await serviceContratacion.delContratacion(req.params.id_ctn)
    res.redirect('/ctns')
 } catch (error) {
    if(error.code=='P2003'){
        res.render('error', {user: req.user, data: 'Error Contratación en Expte.'})
    }else{
        res.render('error', {user: req.user, data: 'Error Contrataciones'})
    }
    
 }
    
}

exports.addContratacion=async(req, res)=>{
    const {ctn}=req.body  // despues extraigo body.desc_contratacion a otra constante
    const addCtn= await serviceContratacion.addContratacion(ctn)
    res.redirect('/ctns')
}


exports.updateContratacion=async(req, res)=>{
    const {id_contratacion, dsc_contratacion}= req.body
    const upCtn= await serviceContratacion.updateContratacion(id_contratacion, dsc_contratacion)
    res.redirect('/ctns')

}

