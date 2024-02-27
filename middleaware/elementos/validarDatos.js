const serviceValidName = require('../../service/elementos')


exports.validelt=async(req, res, next)=>{
    const {elt, elt_tipo}=req.body
    
        try {
                
                        if(!elt){
                            
                            res.render('elementos/addelt', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Elemento',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user 
                
                            })
                            return
                        } else if (!elt_tipo){
                            res.render('elementos/addelt', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Tipo',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user 
                
                            })
                            return

                            
                        }else{

                            const elem = elt.toUpperCase()
                            const validacionElt = await serviceValidName.getElementoName(elem)

                            if(validacionElt){
                                
                                res.render('elementos/addelt', {
                                    //aca van datos de sweetalert2
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El Elemento Existe',
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