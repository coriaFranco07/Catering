
const serviceElementos = require('../service/elementos')


exports.getAllElementos = async(req, res)=>{
    const allelts = await serviceElementos.getAllElementos()
   
    res.render('elementos/elts' , {elementos: allelts, user: req.user})
    
}

exports.createElementos=(req, res)=>{res.render('elementos/addelt', {alert: false, user: req.user})}

exports.addElemento=async(req, res)=>{
    const {elt, elt_tipo}=req.body
    const addelt = await serviceElementos.addElemento(elt,elt_tipo)
    res.redirect('/elts')
}

exports.getElemento = async(req, res)=>{
    const id=req.params.id
    const getElemento = await serviceElementos.getElemento(id)
    res.render('elementos/editelt', {elemento: getElemento, user: req.user})

}

exports.updateElemento= async(req, res)=>{
    const {id_tipo_elemento, dsc_tipo_elemento, tipo_elemento} = req.body
    const upElt = await serviceElementos.updateElemento(id_tipo_elemento, dsc_tipo_elemento,tipo_elemento)
    res.redirect('/elts')
}

exports.delElemento= async(req, res)=>{
    
   try {
    
   
    const id=req.params.id
    const delElt = await serviceElementos.delElemento(id)
    res.redirect('/elts')
} catch (error) {
    res.render('error', {user: req.user, data: 'Error, Elemento vinculado a un Expte'})
  /*  if(error.code=="P2003"){
      res.send ('el elemento no puede ser eliminado')
   }else{
    res.send(error)
   } */
   
} 
}