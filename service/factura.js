const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()

const fecha = require('../util/fechas')
const { Decimal } = require('@prisma/client/runtime')


exports.getAllFacturas = async (id_proc)=>{
    const allfacturas = await prisma.procesos.findUnique({
        where:{
            id_proc: Number(id_proc)
        },
        include:{
            proc_fact:{
                select:{
                    id_proc_fact: true,
                    importe_proc_fact: true,
                    factura: true,
                }
                
            },
            orden_compra:{
                select:{
                    nro_orden: true,

                },
                
            },
            tipo_elementos:{
                select:{
                    dsc_tipo_elemento: true,
                }
            }
            }

        
          
       
    })  

    prisma.$disconnect()
    return allfacturas
}

exports.sumaProcesos = async(id_orden_compra, id_proc)=>{

  const sumProc = await prisma.orden_compra.findUnique({
    where:{
        id_orden_compra: Number(id_orden_compra)
    }



  })
  prisma.$disconnect
  return sumProc

}


exports.addFactura = async(valores)=>{
    const importes = parseFloat(valores.importe_fact)
    const fch_factura = new Date(valores.fch_fact)
    const id_proc =valores.id_proc

    
    
    const addfact = await prisma.proc_fact.create({
        data:{
            procesos:{
                connect: {id_proc: Number(parseInt(valores.id_proc))},
                
               
            },
            importe_proc_fact: Number(importes),
            factura:{
                create:{
                    nro_fact: String(valores.nro_fact),
                    fch_fact: fch_factura,
                    expte_fact: String(valores.expte_fact),
                    observ_fact: String(valores.observ_fact)

                }
            },
            
            
        },
        
       
    })
    await prisma.procesos.update({
        where:{
            id_proc: Number(parseInt(valores.id_proc))

        },
        data:{
            volante:{
                    update:{
                        saldo:{
                            decrement: Number(parseFloat(importes))
                        }
                    }
            }
        }
    })


    const upSaldo = await prisma.procesos.update({
        where:{
            id_proc: Number(id_proc)
        },
        data:{
            saldo_proc:{
                decrement: Number(importes)
            }

        }
    })
    prisma.$disconnect
    return addfact
}

exports.deleteFact = async (id_proc_fact)=>{
    
    const importProc = await prisma.proc_fact.findUnique({
        where:{
            id_proc_fact: Number(id_proc_fact)
        },
        select:{
            importe_proc_fact: true,
            id_factura:true,
            id_proc:true,
        }
    }) 
    await prisma.procesos.update({
        where:{
            id_proc: Number(importProc.id_proc)
        },
        data:{
            saldo_proc:{
                increment: Number(parseFloat(importProc.importe_proc_fact))
            },
            volante:{
                update:{
                    saldo:{
                        increment: Number(parseFloat(importProc.importe_proc_fact))
                    }
                }
            }
        },
        

    })

    await prisma.proc_fact.delete({
        where:{
            id_proc_fact: Number(id_proc_fact)
        }
    })
     await prisma.factura.delete({
        where:{
            id_factura: Number(importProc.id_factura)
        }
    }) 
  
    

    prisma.$disconnect
   
    return importProc.id_proc
}

exports.saldo_proceso = async (id_proc)=>{
    const saldo = await prisma.procesos.findUnique({
        where:{
            id_proc: Number(id_proc),

        },
        select:{
            id_proc: true,
            saldo_proc: true,
        }
    })
    prisma.$disconnect
    return saldo
}

exports.facturasOrden = async (id_proc)=>{
    const fact_ord = await prisma.proc_fact.aggregate({
        _sum:{
            importe_proc_fact: true,
        },
        
        where:{
            id_proc: Number(id_proc)

        },
        
    })
    
    prisma.$disconnect
    return fact_ord
}

exports.controlProc_Fact = async (id_proc)=>{
    const existProc_Fact = await prisma.proc_fact.findMany({
        where:{
            id_proc: Number(id_proc)
        }
    })
    prisma.$disconnect
    return existProc_Fact
}
