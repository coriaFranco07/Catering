const {PrismaClient}= require('@prisma/client');

const prisma = new PrismaClient();


exports.getAllPrioridades = async()=>{
    const allPrds = await prisma.prioridad.findMany()
    return (allPrds)
}

exports.addPrioridad = async(dsc_prioridad)=>{
    
    const addprd = await prisma.prioridad.create({
        data: {
            dsc_prioridad: dsc_prioridad,
        }
    })
}

exports.getNamePrioridad = async(dsc_prioridad)=>{
    const namePrd = await prisma.prioridad.findUnique({
        where: {
            dsc_prioridad: dsc_prioridad,
        },
    })
    return namePrd
}

exports.getIdPrioridad = async(id)=>{
    const getIdprd = await prisma.prioridad.findUnique({
        where: {
            id_prioridad: Number(id),
        }
    })
    return getIdprd
}

exports.updatePrioridad = async(id, desc)=>{

    const updatePrd = await prisma.prioridad.update({
        where:{
            id_prioridad: Number(id),
        },
        data: {
            dsc_prioridad: desc
        }
    })
    return updatePrd
}

exports.deletePrd = async(id)=>{
    const delprd = await prisma.prioridad.delete({
        where:{
            id_prioridad: Number(id),
        }
    })
    return delprd
}