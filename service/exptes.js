const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()
const servicePrioridad = require('../service/prioridad')
const serviceContratacion= require('../service/contratacion')
const fecha = require('../util/fechas')
const { Decimal } = require('@prisma/client/runtime')


exports.getAllExptes = async ()=>{
    const allExptes = await prisma.expte.findMany({
        select: {
            id_expte: true,
            nro_expte: true,
            fch_expte: true,
            prioridad: true,
            contratacion: true,
            estado: true,
            refer_expte: true,
            categoria: true,
            id_volante:{
                select:{
                    id_volante: true,
                    nro_volante: true,
                    year_volante: true,
                    total_volante: true,
                }
            }
          },
    })
    
    prisma.$disconnect()
    return allExptes
}

exports.create = async()=>{
    const prioridades = await servicePrioridad.getAllPrioridades()
    const contratacion = await serviceContratacion.getAllContrataciones()
    prisma.$disconnect()
    return ({prioridades: prioridades, contratacion: contratacion})
}

exports.getExpteNro = async (expteNro) =>{
    const nroExpte = await prisma.expte.findUnique({
        where: {
            nro_expte: expteNro,
        },
    })
    prisma.$disconnect()
    return nroExpte
}

exports.delExpteElem = async (id)=>{

    const delExEl = await prisma.expte_tipo_elemento.delete({
        where:{
            id_elem_expte: Number(id)
        }
        
    })
    prisma.$disconnect()
    return delExEl
}

exports.addExpte = async (valores,user)=>{
    let fechaDate = new Date(valores.fch_expte)
   
    const id_prioridad =  parseInt( valores.prioridad)
    const id_contratacion =  parseInt( valores.contratacion)
    const id_estado = parseInt(1)
   const newExpte = await prisma.expte.create({
       
    data:{
        refer_expte: valores.refer_expte,
        nro_expte: valores.nro_expte,
        fch_expte: fechaDate,
        categoria: valores.categoria,
        user_proc: user,
        prioridad:{
            connect: {id_prioridad: Number(id_prioridad)},
        } ,
        contratacion:{
            connect: {id_contratacion: Number(id_contratacion)},
        },
        estado: {

                connect: { id_estado: Number(id_estado) },             
        },
        
        movimientos: {
            create: [
                {
                    fch_mov: fechaDate,
                    ofi_mov: valores.oficina  ,
                    user_mov: valores.solicitante,
                    det_mov: 'Inicio solicitud',
                    estado_mov:{
                        connect: { id_est_mov: Number(id_estado) },
                    }
                      
                }
                
            ]
        },
    },
    
       

    })
    
    prisma.$disconnect()
    return newExpte

};

exports.getIdExpte= async (id)=>{
    const getExpte = await prisma.expte.findUnique({
        where: {
            id_expte: Number(id)
        },
        
        
        include:{
            id_volante:{
                select:{
                    id_volante: true,
                    nro_volante: true,
                    year_volante: true,
                    total_volante: true,
                    procesos:{
                        select:{
                            id_tipo_elem: true,
                        }
                    }
                }
            },
            estado:{
                select:{
                    id_estado:true,
                    dsc_estado: true,
                }
            },
            contratacion:{
                select:{
                    id_contratacion: true,
                }
            }
        },
        
        
    })
    
    if(!getExpte.id_volante){
        getExpte.id_volante=[]//{'nro_volante': null, 'year_volante': null, 'total_volante': null}
        

    }
    prisma.$disconnect()
    return getExpte
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

exports.expteUpdateSV = async (id, valores, user)=>{
    const id_contratacion = parseInt(valores.contratacion)
    const id_prioridad = parseInt(valores.prioridad)
    let fechaDate = new Date(valores.fch_expte)
    const expteUp = await prisma.expte.update({
        
        where:{
            id_expte: Number(id),
        },
        data:{
            refer_expte: valores.refer_expte,
            nro_expte: valores.nro_expte,
            fch_expte: fechaDate,
            categoria: valores.categoria,
            user_proc: user,
            prioridad:{
                connect: {id_prioridad: Number(id_prioridad)},
            } ,
            contratacion:{
                connect: {id_contratacion: Number(id_contratacion)},
            },
            id_volante:{
                
            }
            
            
           
        },
        

        
    });

     const volanExi = await (delExisVol(id))
        
         if (volanExi){
            const delvolant = await (deVol(id))
         }
    
    
    prisma.$disconnect()
    return (expteUp)
}


exports.expteUpdateCV = async (id, valores, user)=>{
    const id_contratacion = parseInt(valores.contratacion)
    const id_prioridad = parseInt(valores.prioridad)
    let fechaDate = new Date(valores.fch_expte)

  
    const expteUp = await prisma.expte.update({
        
        where:{
            id_expte: Number(id),
        },
        data:{
            refer_expte: valores.refer_expte,
            nro_expte: valores.nro_expte,
            fch_expte: fechaDate,
            categoria: valores.categoria,
            user_proc: user,
            prioridad:{
                connect: {id_prioridad: Number(id_prioridad)},
            } ,
            contratacion:{
                connect: {id_contratacion: Number(id_contratacion)},
            },
            id_volante:{
                upsert:{

                    update:{
                        nro_volante: Number(parseInt(valores.nro_volante)),
                        year_volante: Number(parseInt(valores.year_volante)),
                        total_volante: Decimal(parseFloat(valores.total_volante)),
                        saldo: Decimal(parseFloat(valores.total_volante)),

                    },
                    create:{
                        nro_volante: Number(parseInt(valores.nro_volante)),
                        year_volante: Number(parseInt(valores.year_volante)),
                        total_volante: Decimal(parseFloat(valores.total_volante)),
                        saldo: Decimal(parseFloat(valores.total_volante)),
                    },

                }
               
                        
                        
        }


            }
        
    });
   
    prisma.$disconnect()
    return (expteUp)
}


async function delExisVol(id){

 const delvol =await prisma.volante.findUnique({
        
    where:{
         id_expte:Number(id), 
         
    }
    
})
prisma.$disconnect()
return delvol
}

async function deVol(id){

    const delvol =await prisma.volante.delete({
           
       where:{
            id_expte:Number(id), 
            
       }
       
   })
   prisma.$disconnect()
   return delvol
   }


 exports.updateEstado = async (id_estado, id_expte, fecha_estado)=>{

      const upEstado = await prisma.expte.update({
        where:{
            id_expte: Number(id_expte),
        },
        data:{
            fch_estado: fecha_estado,
            estado:{
                connect:{
                    id_estado: Number(id_estado)
                }
            },
            

        },
        
      })

     
      prisma.$disconnect
      return upEstado
 }

exports.deleteExpte_elem = async (id_expte, id_estado)=>{
    const delExElem = await prisma.expte_tipo_elemento.deleteMany({
        where:{
            id_expte: Number(id_expte),
        }
    })
    prisma.$disconnect
    return delExElem
}

exports.updateProcFinalizar = async (id_expte, id_estado)=>{
     const finOrCancelAll = await prisma.procesos.updateMany({
        where:{
            volante:{expte:{id_expte: Number(id_expte)}}
        },
        data:{
            id_estado: Number(id_estado)
        }
     })
}

exports.est_mov_contrat = async(id_contratacion)=>{
    const est_movs = await prisma.est_mov_contratacion.findMany({
        where:{
            id_contratacion: Number(id_contratacion)
        },
        select:{
            estado_mov: true,
        }
    })
    prisma.$disconnect
    return est_movs
}

/* exports.getEstadoExpte = async (id_expte)=>{
    const ExpteEstado = await prisma.expte.findUnique({
        where:{
            id_expte: Number(id_expte)
        },
        select:{
            estado: true,
        }
    })
} */