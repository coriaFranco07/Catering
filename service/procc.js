const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()

const fecha = require('../util/fechas')
const { Decimal } = require('@prisma/client/runtime')
const serviceFactura = require('../service/factura')

exports.getAllprocesos = async (id)=>{
    const allprocesos = await prisma.procesos.findMany({
        where:{
            id_volante: Number(id)
        }
       
    })
    
    prisma.$disconnect()
    return allprocesos
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
  
    const procesos = await prisma.procesos.findMany({

        where:{
            id_volante: Number(id),
        },
        
        
       


    })
    prisma.$disconnect
    return procesos

}

exports.valorVolante = async (id_volante)=>{
    const totalVol = await prisma.volante.findUnique({
        where:{
            id_volante: Number(id_volante)
        },
        select:{
            total_volante: true,
            saldo: true,
        }
    })
    prisma.$disconnect
    return totalVol
}
exports.updateProc = async(valores)=>{
   let fchIn = new Date()
   let fchEnt= null
   let fchFin=null

    if(valores.fch_inicio){
        fchIn = new Date(valores.fch_inicio)
    }
    if(valores.fch_entrega){
        fchEnt = new Date(valores.fch_entrega)
    }
    if(valores.fch_fin){
        fchFin = new Date(valores.fch_fin)
    }
    const facturacion = await serviceFactura.facturasOrden(valores.id_proc)
    
    let facturado=0
    if(facturacion._sum.importe_proc_fact){
        facturado=facturacion._sum.importe_proc_fact
    }
    
    const saldoProceso = parseFloat(valores.importe)-parseFloat(facturado)

    
    const upproces = await prisma.procesos.update({
       
        
        where:{
            id_proc: Number(valores.id_proc),
        },
        
        data:{
            importe: Number(valores.importe),
            control_importe: Number(valores.control_importe),
            fch_inicio: fchIn,
            dias_control: Number(valores.dias_control),
            fch_entrega: fchEnt,
            fch_fin: fchFin,
            observ_proc: valores.observ_proc,
            saldo_proc: Number(saldoProceso),
            orden_compra: {
                connectOrCreate:{
                    where: {nro_orden: String(valores.nro_orden)},
                    create:{
                        nro_orden: String(valores.nro_orden),
                        proveedor:{connect:{ id_proveedor: Number(parseInt(valores.proveedor))}},
                       
                    }                 
                },
         
            },
           /*  estado:{
                connectOrCreate:{
                    where:{dsc_estado: String('Orden')},
                    create:{dsc_estado: 'Orden'},
                }
            }, */
           
            

        }
    })
    
    const upsaldo = await prisma.orden_compra.update({
        where: {nro_orden: String(valores.nro_orden)},
        data:{ saldo_orden: Number(saldoProceso)}
    })

    prisma.$disconnect  
    return upproces

}

exports.deleteProc = async (id_proc)=>{
    
    const ocInProc = await prisma.procesos.findUnique({
        where:{
            id_proc: Number(id_proc)
        },
        select:{
            orden_compra:true,
        }
    })

    const cantOC = await prisma.procesos.findMany({
        where:{
            orden_compra:{
                id_orden_compra: Number(ocInProc.orden_compra.id_orden_compra)
            }
        }
    }) 
    const id_orden_compra= ocInProc.orden_compra.id_orden_compra
    const cantidadMismaOC = cantOC.length

    
    const delVol = await prisma.procesos.delete({
        where:{
            id_proc: Number(id_proc)
        },
        
    })
 
    if(cantidadMismaOC==1){
        await prisma.orden_compra.delete({
            where:{
                id_orden_compra: Number(id_orden_compra)
            }
        })
    } 
    
    prisma.$disconnect
    return delVol
}

exports.getOrden = async(id_proces)=>{
    const idOrden = await prisma.procesos.findUnique({
        where:{
            id_proc: Number(id_proces)
        },
        include:{
            orden_compra:{
                include:{
                    proveedor: true,
                }
            }
        }
        

    })
    prisma.$disconnect
   
    return idOrden




}


exports.limpiarOrdenes = async()=>{
    const idOrden = await prisma.orden_compra.deleteMany({
       
      where:{NOT:{procesos:{some:{}}}}
    })

    prisma.$disconnect  
    return idOrden
}

exports.upEstado = async (id_estado, id_proc)=>{
    const upEst = await prisma.procesos.update({
        where:{
            id_proc: Number(id_proc),
        },
        data:{
           estado:{
                connect:{id_estado: Number(id_estado)}
           }
        }
    })

    prisma.$disconnect  
    return upEst
}


exports.upProcActivos =async (id_proc, id_tipo_elem)=>{

    const procAct = await prisma.procesos.updateMany({
        where:{
            AND:[
                    {
                        NOT: {id_proc:Number(id_proc)}
                    },
                    {
                        estado:{
                            dsc_estado: String("Activo"),
                        }
                    },
                    {
                        id_tipo_elem: Number(id_tipo_elem)
                    }
            ]
        },
        data:{
            cant_proc:{
                increment: Number(1)
            },
        }
    })
    prisma.$disconnect
    return procAct

}
exports.upDecProcActivos =async (id_proc, id_tipo_elem)=>{

    const procAct = await prisma.procesos.updateMany({
        where:{
            AND:[
                    {
                        NOT: {id_proc:Number(id_proc)}
                    },
                    {
                        estado:{
                            dsc_estado: String("Activo"),
                        }
                    },
                    {
                        id_tipo_elem: Number(id_tipo_elem)
                    }
            ]
        },
        data:{
            cant_proc:{
                decrement: Number(1)
            },
        }
    })
    prisma.$disconnect
    return procAct

}

exports.getIdProc = async (id_proc)=>{
    const getProc = await prisma.procesos.findUnique({
        where:{
            id_proc: Number(id_proc),
        },
        select:{
            id_proc:true,
            id_tipo_elem: true,
            estado: true,
            fch_inicio: true,

        }
    })
    prisma.$disconnect
    return getProc
}

exports.upActivo =async (id_proc, id_tipo_elem)=>{

    const procAct = await prisma.procesos.findMany({
        where:{
            AND:[
                    {NOT: {id_proc:Number(id_proc)}},
                    {NOT:{
                        OR:[
                            {estado:{dsc_estado: String("Cancelado")}},
                            {estado:{dsc_estado: String("Finalizado")}},
                            
                        ],       
                    }
                }, 
                    {id_tipo_elem: Number(id_tipo_elem)}
            ]
        },
    
    })


    if(procAct.length){
        await prisma.procesos.update({
            where:{
                id_proc: Number(id_proc)
            },
            data:{
                cant_proc: Number(procAct.length)
            }
        })
    }
    prisma.$disconnect
    return procAct

}

exports.ceroProc = async (id_proc)=>{
    const cero = await prisma.procesos.update({
        where:{
            id_proc: Number(id_proc)
        },
        data:{
            cant_proc: Number(0)
        }
    })
}
