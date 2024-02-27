const {PrismaClient}= require('@prisma/client')

const prisma = new PrismaClient()


exports.getAllElementos = async()=>{

    const allelts = await prisma.tipo_elementos.findMany()

    return (allelts)

}

exports.addElemento = async (elemento, tipo)=>{
  
    const addelt = await prisma.tipo_elementos.create({
        data:{
            dsc_tipo_elemento: elemento,
            tipo_elemento: tipo
        }
    })

    return (addelt)
}

exports.getElementoName = async(elem)=>{
    const elemento  = elem.toUpperCase()
    const findElemento = await prisma.tipo_elementos.findUnique({
        where: {
            dsc_tipo_elemento: elemento,
          },
    })    
    return(findElemento)
}

exports.getElemento = async(id)=>{
    const elemento = await prisma.tipo_elementos.findUnique({
        where: {
            id_tipo_elemento: Number(id),
        },
    })
    return(elemento)
}

exports.updateElemento= async (id, desc, tipo)=>{
    const descMay = desc.toUpperCase()
    const tipoMay= tipo.toUpperCase()
    const updateElt = await prisma.tipo_elementos.update({
        where: {
            id_tipo_elemento: Number(id),
        },
        data:{
            dsc_tipo_elemento: descMay,
            tipo_elemento: tipoMay,
        }
    })
    return (updateElt)
}

exports.delElemento= async(id)=>{
 const delElt = await prisma.tipo_elementos.delete({
    where:{
        id_tipo_elemento: Number(id),
    }
     
})
    return (delElt)
}