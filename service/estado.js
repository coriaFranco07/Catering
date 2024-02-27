const {PrismaClient} = require ('@prisma/client')
const prisma = new PrismaClient()



exports.getAllEstados = async()=>{
    const allEst = await prisma.estado.findMany({
        orderBy: [
            {
              dsc_estado: 'asc',
            },
         
          ],
    })
    prisma.$disconnect
    return allEst
}

exports.addEstado = async(dsc)=>{
    const addEst = await prisma.estado.create({
       data: {
        dsc_estado: dsc
       } 
    })
    prisma.$disconnect
    return addEst
}

exports.getNameEstados = async (dsc) =>{
    const nameEst = await prisma.estado.findUnique({
        where: {
            dsc_estado: dsc,
        },
    })
    prisma.$disconnect
    return nameEst
}

exports.delEst = async (id)=>{
    const delEstado = await prisma.estado.delete({
        where: {
            id_estado: Number(id),
        }
    })
    prisma.$disconnect
}

exports.getIdEstados = async (id) => {
    const getIdEst = await prisma.estado.findUnique({
        where: {
            id_estado: Number(id),
        }
    })
    prisma.$disconnect
    return getIdEst
}

exports.updateEstados = async (id, dsc) =>{
const updateEst = await prisma.estado.update({
    where: {
        id_estado: Number(id),
    },
    data: {
        dsc_estado: dsc,
    }
})
prisma.$disconnect
return updateEst
}

// trabajar con estados de movimientos segun tipo de contratacion
exports.getAllMovEst = async ()=>{
    const allMovEst = await prisma.estado_mov.findMany()
    prisma.$disconnect
    return allMovEst
}

exports.getEstMovName = async (movest) =>{
    const getName = await prisma.estado_mov.findUnique({
        where:{
            dsc_est_mov: String(movest)
        }
    })
    prisma.$disconnect
    return getName
}

exports.addMovEst = async (movest)=>{
    const addMoEs = await prisma.estado_mov.create({
        data:{
            dsc_est_mov: String(movest)
        }
    })
    prisma.$disconnect
    return addMoEs
}

exports.delMovEst = async(id_mov_est)=>{
   
   const delctns =await prisma.est_mov_contratacion.deleteMany({
        where:{
            id_est_mov: Number(id_mov_est)
        }
   
    })
   
    await prisma.estado_mov.delete({
        where:{
            id_est_mov: Number(id_mov_est)
        }
    })

    prisma.$disconnect
    return delctns
}

exports.getAllEstMovCtns = async()=>{
    const allEsMovCtn = await prisma.est_mov_contratacion.findMany({
        select:{
            contratacion: true,
            estado_mov: true,
        }
    })
    prisma.$disconnect
    return allEsMovCtn
}

exports.delMovEstCtns = async (id_cont, id_est)=>{
    const delMov = await prisma.est_mov_contratacion.delete({
        
        where:{
            id_contratacion_id_est_mov:{
                id_contratacion: Number(id_cont),
                id_est_mov: Number(id_est)
            }
            
            
        }
    })
    prisma.$disconnect
    return delMov
}

exports.existMovEstCtns = async(id_cont, id_est)=>{
    const existeMovEst = await prisma.est_mov_contratacion.findUnique({
        where:{
            id_contratacion_id_est_mov:{
                id_contratacion: Number(id_cont),
                id_est_mov: Number(id_est)
            }
        }
    })
    prisma.$disconnect
    return existeMovEst
}

exports.addMovEstCtns = async (id_cont, id_est)=>{
    const add = await prisma.est_mov_contratacion.create({
        data:{
            contratacion:{
                connect:{
                    id_contratacion: Number(id_cont),
                },
            },
            estado_mov:{
                connect:{
                    id_est_mov: Number(id_est)
                }
            }
             
        }
        
    })
    prisma.$disconnect
    return add
}

exports.existEstInMovs = async (id_est_mov)=>{
    const existInMovs = await prisma.movimientos.findMany({
        where:{
            estado_mov:{
                id_est_mov: Number(id_est_mov)
            }
        }
    })
    prisma.$disconnect
    return existInMovs
}