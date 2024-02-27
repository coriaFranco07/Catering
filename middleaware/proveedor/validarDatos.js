const serviceValidName = require('../../service/proveedor')


exports.validpvds=async(req, res, next)=>{
    const dsc_proveedor = req.body.pvd
    
        try {
                
                        if(!dsc_proveedor){
                     
                            res.render('proveedor/addpvd', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Proveedor',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user 
                
                            })
                            return
                        }else{

                            const validacionPvd = await serviceValidName.getNameProveedor(dsc_proveedor)

                            if(validacionPvd){
                              
                                res.render('proveedor/addpvd', {
                                    //aca van datos de sweetalert2
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El Proveedor Existe',
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: 4000,
                                    ruta: 'create',
                                    user: req.user
                    
                                })   
                                return

                            }else{
                                    next()
                            }


                        }







            } catch (error) {
                console.log(error)    
            }









}