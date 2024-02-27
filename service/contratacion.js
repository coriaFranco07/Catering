const {PrismaClient}= require('@prisma/client');

const prisma = new PrismaClient();


exports.getAllContrataciones = async()=>{
    const allCtns = await prisma.contratacion.findMany();
    return (allCtns)
}

exports.getIdContratacion=async(id)=>{
    
    const ctn = await prisma.contratacion.findUnique({
        where: {
          id_contratacion: Number(id),
        },
      })
    return(ctn)
}
exports.delContratacion = async(id_ctn)=>{
   
    const delctn = await prisma.contratacion.delete({
        where: {
            id_contratacion: Number(id_ctn) 
        }
    })
    return(delctn)
}

exports.addContratacion=async(ctn)=>{
    const addctn = await prisma.contratacion.create({
        data: {
            dsc_contratacion: ctn
            }
    })
    return(addctn)
}


exports.updateContratacion=async(id_contratacion, dsc_contratacion)=>{
  
    const editctn=await prisma.contratacion.update({
        where:{
            id_contratacion: Number(id_contratacion)
        },
        data:{
            dsc_contratacion: dsc_contratacion
        }
    })
    return('editctn')
}

exports.editContratacion=async(id_ctn)=>{

    const editctn=await this.getIdContratacion(id_ctn)
    return('editctn')
}


exports.getNameContratacion=async(dsc_contratacion)=>{
    
    const ctn = await prisma.contratacion.findUnique({
        where: {
          dsc_contratacion: dsc_contratacion,
        },
      })
    
    return(ctn)
}