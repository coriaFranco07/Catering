const serviceValidName = require('../../service/exptes')
const prioridades = require('../../service/prioridad')
const contrataciones= require('../../service/contratacion')


exports.validexpte=async(req, res, next)=>{

    const {nro_expte, fch_expte,categoria, prioridad, contratacion, solicitante, oficina}=req.body

    const prds = await prioridades.getAllPrioridades()
    const cnts = await contrataciones.getAllContrataciones()
   
        try {
                
                        if(!nro_expte){
                           
                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Nro de Expediente',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })
                        } else if(fch_expte>Date){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Verifique la Fecha',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })

                        } else if(!categoria){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Categoria',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })

                        } else if(!prioridad){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Prioridad',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })  

                        } else if(!contratacion){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Contratacion',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })

                        } else if(!solicitante){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Solicitante',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })

                        } else if(!oficina){

                            res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                alert: true,
                                alertTitle: 'Advertencia',
                                AlertMessage: 'Ingrese Oficina',
                                alertIcon: 'info',
                                showConfirmButton: true,
                                timer: 4000,
                                ruta: 'create'
                            })
                           
                        }else{

                            const validacionEst = await serviceValidName.getExpteNro(nro_expte)

                            if(validacionEst){
                               
                                res.render('exptes/addexpte',{prioridad: prds,contratacion: cnts,
                                    alert: true,
                                    alertTitle: 'Advertencia',
                                    AlertMessage: 'El Expediente Existe, veirifique',
                                    alertIcon: 'info',
                                    showConfirmButton: true,
                                    timer: 4000,
                                    ruta: 'create'
                                }) 


                            }else{
                                    next()
                            }


                        }







            } catch (error) {
                console.log(error)    
            }









}











