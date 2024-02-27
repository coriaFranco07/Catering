const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()

const fecha = require('../util/fechas')
const { Decimal } = require('@prisma/client/runtime')


exports.getAllVolantes = async ()=>{
    const allVolantes = await prisma.volante.findMany({
        select: {
            id_volante: true,
            nro_volante: true,
            year_volante: true,
            total_volante: true,
            saldo: true,
            id_expte:{
                select:{
                    id_expte: true,
                    nro_expte: true,
                    
                },
            },
            
          },
    })
    
    prisma.$disconnect()
    return allVolantes
}



exports.getNroVolanteExpte= async (nro_volante, year_volante)=>{
    const getVolanteNro = await prisma.volante.findMany({
        where: {
            AND:[
                {nro_volante: Number(nro_volante)},
                {year_volante: Number(year_volante),
                }
            ]
          
           
        },
        
    })
  
    prisma.$disconnect()
    return getVolanteNro
}

exports.getIdvolante = async(id) =>{
  
    const getVolante = await prisma.volante.findUnique({

        where:{
            id_volante: Number(id),
        },
        include:{
            procesos:{
               select:{
                    id_proc: true,
                    nro_linea: true,
                    id_tipo_elem: true,
                    id_estado: true,
                    estado:true,
                    tipo_elementos: true,
                    orden_compra:{
                        select:{
                            nro_orden: true,
                            id_orden_compra: true,
                            proveedor: true,
                        }
                    }

               },
            
            },
            
        }
        
       


    })

    prisma.$disconnect()
    return getVolante

}
exports.create = async(id_volante)=>{
    const elementos = await prisma.volante.findUnique({
        where:{
            id_volante: Number(id_volante)
        },
        include:{
            expte:{
                include:{
                    expte_tipo_elemento:{
                        include:{
                            tipo_elementos: true,
                        }
                    }
                }
            }
        }
    })
    prisma.$disconnect
    return elementos.expte.expte_tipo_elemento
}

exports.ctrlLinea = async (id_volante, nro_linea)=>{
    const linea = await prisma.procesos.findMany({
        where:{
            AND:{
                id_volante: Number(id_volante),
                nro_linea: Number(nro_linea)
            }            
        }
    })
    prisma.$disconnect
    return linea
}

exports.ctrlOrdCompra = async(id_volante, nro_orden, id_proveedor)=>{
    // where: { NOT: {roles_user: { some: { id_user: Number(id) } } }},
    const ordenCtrl= await prisma.orden_compra.findMany({
        where:{
            OR:[
                {
                    AND:[
                        {nro_orden: String(nro_orden)},
                        {NOT:{proveedor:{ id_proveedor: Number(id_proveedor)}}},
                        
                    ],
                },
                {
                    AND:[
                        {nro_orden: String(nro_orden)},
                        {NOT:{procesos:{ every:{ id_volante: Number(id_volante)}}}},  //ver every some none

                    ]
                }    
        ]
        }
        
    })

    prisma.$disconnect
   
    return ordenCtrl

}

exports.addReqSOC = async (valores)=>{
   
    const addReq = await prisma.procesos.create({
        data:{
            volante:{
                connect: {id_volante: Number(parseInt(valores.id_volante))},
            },
            nro_linea: Number(parseInt(valores.nro_linea)),
            tipo_elementos:{
                connect: {id_tipo_elemento: Number(parseInt(valores.elemento))},
            },
            estado:{
                connectOrCreate:{
                    where:{dsc_estado: String('Volante')},
                    create:{dsc_estado: 'Volante'},
                }
            },
           
        }

     

    })
    prisma.$disconnect
   
    return addReq
}

exports.addReqCOC = async (valores)=>{
    //{nro_linea, elemento,ord_compra, proveedor, id_volante}
    const orden = valores.ord_compra
    
    const addReq = await prisma.procesos.create({
        data:{
            volante:{
                connect: {id_volante: Number(parseInt(valores.id_volante))},
            },
            nro_linea: Number(parseInt(valores.nro_linea)),
            tipo_elementos:{
                connect: {id_tipo_elemento: Number(parseInt(valores.elemento))},
            },
            estado:{
                connectOrCreate:{
                    where:{dsc_estado: 'Volante'},
                    create:{dsc_estado: 'Volante'},
                },
            },
            orden_compra: {
                connectOrCreate:{
                    where: {nro_orden: String(orden)},
                    create:{
                        nro_orden: String(orden),
                        proveedor:{ connect:{id_proveedor: Number(parseInt(valores.proveedor))}}
                    }
                
                 }
            }

        }

    })
    prisma.$disconnect
    return addReq
}

exports.estadoExp = async (id_volante)=>{
    const estadoEx = await prisma.volante.findUnique({
        where:{
            id_volante: Number(id_volante),
        },
        select:{
          expte:{
            select:{
                estado:{
                    select:{
                        dsc_estado: true,
                    },
                },
            },
          }
        }
    })
    prisma.$disconnect
    return estadoEx
}

exports.getEstExpteVol = async (id_vol)=>{
    const estExVol = await prisma.volante.findUnique({
        where:{
            id_volante: Number(id_vol)
        },
        select:{
            expte:{
                include:{
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
    return estExVol
}

exports.dame=async()=>{

    const result = await prisma.expte.findMany({
       
        select:{
            nro_expte:true,
            estado:{
                select:{
                    dsc_estado: true,
                }
               
           },
           contratacion:{
                select:{
                    dsc_contratacion: true,
                }
           },
           prioridad:{
             select:{
                dsc_prioridad: true,
                
             }
           },
           

        }
    })

    return result

}