const serviceValidName = require('../../service/prioridad')


exports.validprds=async(req, res, next)=>{
    const dsc_prioridad = req.body.prd
  
        try {
                
                        if(!dsc_prioridad){
                            
                            res.render('prioridades/addprd', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Prioridad',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user
                
                            })
                            return
                            
                        }else{
                            
                            const validacionCtn = await serviceValidName.getNamePrioridad(dsc_prioridad)

                            if(validacionCtn){
                            
                                res.render('prioridades/addprd', {
                                    //aca van datos de sweetalert2
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El tipo de Prioridad Existe',
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











