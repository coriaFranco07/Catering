const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()

const fecha = require('../util/fechas')
const { Decimal } = require('@prisma/client/runtime')


exports.getAllFacturas = async ()=>{
    const allFacturas = await prisma.proc_fact.findMany({
        select: {
           importe_proc_fact: true,
           factura:{
              select:{
                fch_fact: true,
                nro_fact: true,
              }
           },
           procesos:{
              select:{
                importe: true,
                saldo_proc: true,
                orden_compra:{
                    select:{
                        nro_orden: true,
                        proveedor:{
                            select:{
                                dsc_proveedor: true,
                            }
                        }
                    }
                }
              }

           }
           
        },

    })    
    
    prisma.$disconnect()
    return allFacturas
}

exports.allVolantes = async () =>{
    const allVol = await prisma.volante.findMany({
       
        select:{
            id_volante: true,
            nro_volante: true,
            year_volante: true,
            total_volante: true,
            saldo: true,
            expte:{
                select:{
                    nro_expte: true,
                    estado:{
                        select:{
                            dsc_estado: true,
                        }
                    }
                }
            }
        }
    })
    prisma.$disconnect
    return allVol
}


exports.allRequerimientos = async ()=>{
    const allReq = await prisma.procesos.findMany({
        select:{
            id_proc:true,
            cant_proc: true,
            nro_linea: true,
            control_importe: true,
            fch_inicio: true,
            fch_fin: true,
            dias_control: true,
            fch_entrega: true,
            volante:{
                select:{
                    nro_volante: true,
                    year_volante: true,
                    expte:{
                        select:{
                            nro_expte: true,
                        }
                    }
                },
            },
            importe: true,
            saldo_proc: true,
            tipo_elementos:{
                select:{
                    id_tipo_elemento: true,
                    dsc_tipo_elemento: true,
                    tipo_elemento: true,
                },
            },
            estado:true,
            
            
        }
    })
    prisma.$disconnect
    return allReq
}

exports.allReqElem = async (elem, id_proc) =>{

    const allReqEl = await prisma.procesos.findMany({
 
        where:{
            AND:[
                {
                    tipo_elementos:{
                        dsc_tipo_elemento: String(elem)
                    }
                },
                {NOT:{id_proc: Number(id_proc)}},
                {NOT:{estado:{dsc_estado: String('Cancelado')}}},
                {NOT:{estado:{dsc_estado: String('Finalizado')}}}

            ]
           
        },
        select:{
            id_proc: true,
            estado:{
                select:{
                    dsc_estado: true,
                },
            },
            volante:{
                select:{
                    nro_volante: true,
                    year_volante: true,
                    expte:{
                        select:{
                            nro_expte: true,
                        }
                    }
                },
            },
            orden_compra:{
                select:{
                    nro_orden: true,
                    proveedor:{
                        select:{
                            dsc_proveedor: true,
                        }
                    }
                }
            },
            importe: true,
            saldo_proc: true,
            nro_linea: true,
            
            
        }

    })

    prisma.$disconnect
    
    return allReqEl

}

exports.reqSinVolante = async () =>{
    const reqSV = await prisma.volante.findMany({
        
      select:{
        expte:{
            select:{
                id_expte: true
            }

        } 
      }
       
    })

    let exp = []
    reqSV.forEach((ex)=>{
        exp.push(ex.expte.id_expte)
    })
    
    const sin =await prisma.expte.findMany({
        where:{
            NOT:{
                id_expte:{
                  in: exp,
                }
            }
        }
    })
    let sinv =[]
    sin.forEach((sv)=>{
        sinv.push(sv.id_expte)
    })

    const sinVol = await prisma.expte_tipo_elemento.findMany({
        where:{
            id_expte:{
                in: sinv,
            }
        }
    })
    
  
    prisma.$disconnect
    return sinVol
}


exports.allElemSinProceso= async (elem) =>{
    const sin = await prisma.expte.findMany({
        where:{
               AND:[ 
                 {expte_tipo_elemento:{some:{tipo_elementos:{dsc_tipo_elemento: String(elem)}}}},
                 {NOT:{id_volante:{id_expte:{}}}}
            ] 
         
        },
        select:{
            id_expte: true,
            nro_expte: true,
            fch_expte: true,
            prioridad:{
                select:{
                    dsc_prioridad: true,
                }
            },
            contratacion:{
                select:{
                    dsc_contratacion: true,
                }
            },
            estado:{
                select:{
                    dsc_estado: true,
                }
            },
            categoria:true,
        }
    })

    prisma.$disconnect
    return sin
  

}

exports.rompeculo = async (elem)=>{
    const sin = await prisma.expte.findMany({
        where:{
               AND:[ 
                 {expte_tipo_elemento:{some:{tipo_elementos:{dsc_tipo_elemento: String(elem)}}}},
                 {NOT:{id_volante:{id_expte:{}}}}
            ] 
         
        }
    })
  
}