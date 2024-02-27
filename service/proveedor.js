const {PrismaClient}= require('@prisma/client');

const prisma = new PrismaClient();

exports.getAllProveedor = async()=>{
    const allProv = await prisma.proveedor.findMany();
    return (allProv);
}

exports.getIdProveedor=async(id)=>{
    
    const pvd = await prisma.proveedor.findUnique({
        where: {
          id_proveedor: Number(id),
        },
      })
    return(pvd)
}
exports.delProveedor = async(id_pvd)=>{
 
    const delpvd = await prisma.proveedor.delete({
        where: {
            id_proveedor: Number(id_pvd) 
        }
    })
    return(delpvd)
}


exports.addProveedor=async(pvd)=>{
    const addpvd = await prisma.proveedor.create({
        data: {
            dsc_proveedor: pvd
            }
    })
    return(addpvd)
}


exports.updateProveedor=async(id_proveedor, dsc_proveedor)=>{
    
    const editpvd=await prisma.proveedor.update({
        where:{
            id_proveedor: Number(id_proveedor)
        },
        data:{
            dsc_proveedor: dsc_proveedor
        }
    })
    return(editpvd)
}


exports.getNameProveedor=async(dsc_proveedor)=>{
 
    const pvd = await prisma.proveedor.findUnique({
        where: {
          dsc_proveedor: dsc_proveedor,
        },
      })
 
    return(pvd)
}