
const provService = require('../service/proveedor')


exports.getProv=async (req, res)=>{
    try{
        const allProv = await provService.getAllProveedor();
        res.render('proveedor/pvds', {proveedores: allProv, user: req.user})
    } catch (error) {

        res.render('error', {user: req.user, data: 'Error, Obtenidendo Proveedores'})  
    }
   }

   exports.addPvd=(req, res)=>{res.render('proveedor/addpvd',{alert: false, user: req.user})}

   exports.editPvn=async (req, res)=>{
    try{
      const pvd=await   provService.getIdProveedor(req.params.id_pvd)
      res.render('proveedor/editpvd', {proveedor: pvd, user: req.user })
    } catch (error) {

        res.render('error', {user: req.user, data: 'Error, obtenidendo Proveedor'})  
     }
    }
  
   
  
  
  exports.getIdProveedor=async(req, res)=>{
    try{
            const pvd=await provService.getIdProveedor(req.params.id_proveedor)
            
            res.send(pvd)
        } catch (error) {

            res.render('error', {user: req.user, data: 'Error, Obtenidendo Proveedor'})  
         }
  }
  exports.delProveedor = async (req, res)=>{
    try{
        const delpvd=await provService.delProveedor(req.params.id_pvd)
        res.redirect('/pvds')
    } catch (error) {
        if(error.code=='P2003'){
            res.render('error', {user: req.user, data: 'Error Proveedor en Expte.'})
        }else{
            res.render('error', {user: req.user, data: 'Error Proveedores'})
        }
        
     }
  }
  

   exports.addProveedor=async(req, res)=>{
    try{
        const {pvd}=req.body  // despues extraigo body.desc_contratacion a otra constante
        const addpvd= await provService.addProveedor(pvd)
        res.redirect('/pvds')

    } catch (error) {

        res.render('error', {user: req.user, data: 'Error, Agregando Proveedor'})  
     }
  }
  

  
exports.updateProveedor=async(req, res)=>{
try{
    const {id_proveedor, dsc_proveedor}= req.body
    const upPvd= await provService.updateProveedor(id_proveedor, dsc_proveedor)
    res.redirect('/pvds')

} catch (error) {

    res.render('error', {user: req.user, data: 'Error, Actualizando Proveedor'})  
 }

}
