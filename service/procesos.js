const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()



exports.allProcExpte = async (id)=>{

    const allExpProc = await prisma.expte_tipo_elemento.findMany({

        where:{
            id_expte: Number(id),

        },
        select:{
            id_elem_expte:true,
            expte:{
                select:{
                    id_expte: true,
                    nro_expte: true,
                }
            },
            tipo_elementos:{
                select:{
                    id_tipo_elemento: true,
                    dsc_tipo_elemento: true,
                }
            }
        }
    })
    
    return allExpProc
}


exports.elemDistProc = async (id_expte) => {

    const elemnts = await prisma.tipo_elementos.findMany({
        where: { NOT: {expte_tipo_elemento: { some: { id_expte: Number(id_expte) } } }},
    })
    return elemnts
}

exports.elemDistProcTipoElemento = async (id_expte, categoria) => {
   
    const elemntscat = await prisma.tipo_elementos.findMany({
        where: {
            AND: [
                {
                    NOT: {expte_tipo_elemento: { some: { id_expte: Number(id_expte) } } } ,
                    tipo_elemento: categoria, 
                },
            ],
            
        },
    })
    
    return elemntscat
}

exports.addProcess = async(id_expte, id_tipo_elemento)=>{
    const addProc = await prisma.expte_tipo_elemento.create({
        data: {
            expte:{
                connect:{ id_expte: Number(id_expte)},
            },
            tipo_elementos:{
                connect:{ id_tipo_elemento: Number(id_tipo_elemento)}
            }
            
        }
    })
    return addProc
}

exports.elemDistUpdateExpte = async (id_expte, categoria) => {
   
    const elemntscat = await prisma.tipo_elementos.findMany({
        where: {
            AND: [
                {
                    expte_tipo_elemento: { some: { id_expte: Number(id_expte) } } ,
                    NOT: {tipo_elemento: categoria }, 
                },
            ],
            
        },
    })
    
    return elemntscat
}

exports.updateEstProcCantProc = async (requer, id_estado)=>{

    const upProcEstCant = await prisma.procesos.updateMany({
        where:{
            AND:[
                {tipo_elementos:{
                    id_tipo_elemento:{
                        in: requer,
                    }
                }},

               //{volante:{expte:{id_expte: Number(id_expte)}}},
               {NOT:{cant_proc: Number(0)}},


            ],
        },
        data:{
            //id_estado: Number(id_estado),
            cant_proc:{
                decrement: 1,
            }
        }

    })
}

exports.updateEstProcCantProcInc = async (requer, id_estado)=>{

    const upProcEstCant = await prisma.procesos.updateMany({
        where:{
            AND:[

                {tipo_elementos:{
                    id_tipo_elemento:{
                        in: requer,
                    }
                }},
                {estado:{dsc_estado: String('Activo')}}
               //{NOT:{estado:{dsc_estado: String('Cancelado')}}},
               //{NOT:{estado:{dsc_estado: String('Finalizado')}}}
                

            ],
        },
        data:{
            //id_estado: Number(id_estado),
            cant_proc:{
                increment: 1,
            }
        }

    })
}