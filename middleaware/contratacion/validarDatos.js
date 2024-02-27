const serviceValidName = require('../../service/contratacion')


exports.validctns=async(req, res, next)=>{
    const dsc_contratacion = req.body.ctn
  
        try {
                
                        if(!dsc_contratacion){
                            
                            res.render('contratacion/addctn', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Contratacion',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user
                
                            })
                            
                        }else{

                            const validacionCtn = await serviceValidName.getNameContratacion(dsc_contratacion)

                            if(validacionCtn){
                               
                                res.render('contratacion/addctn', {
                                    //aca van datos de sweetalert2
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El tipo de Contratacion Existe',
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: 4000,
                                    ruta: 'create',
                                    user: req.user
                    
                                })   


                            }else{
                                    next()
                            }


                        }







            } catch (error) {
                console.log(error)    
            }









}











