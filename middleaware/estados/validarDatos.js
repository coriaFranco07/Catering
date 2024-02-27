const serviceValidName = require('../../service/estado')


exports.validests=async(req, res, next)=>{
    const dsc_estado = req.body.est.toUpperCase()

        try {
                
                        if(!dsc_estado){
                           
                            res.render('estados/addest', {
                                //aca van datos de sweetalert2
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Estado',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create',
                                user: req.user
                
                            })
                            return
                            
                        }else{

                            const validacionEst = await serviceValidName.getNameEstados(dsc_estado)

                            if(validacionEst){
                               
                                res.render('estados/addest', {
                                    //aca van datos de sweetalert2
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El tipo de Estado Existe',
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











