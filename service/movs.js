const {PrismaClient}= require('@prisma/client')
const serviceExptes = require('../service/exptes')
const differenceInDays = require('date-fns/differenceInDays')
const prisma = new PrismaClient()


const fecha = require('../util/fechas')


exports.getAllMovs = async (id,fch_estado)=>{
    const allMovs = await prisma.movimientos.findMany({
        orderBy: [
            {
              fch_mov: 'desc',
            },
            {
              id_mov: 'desc',
            },
          ],
        where:{
            id_expte: Number(id),
        },
        select: {
            id_mov: true,
            fch_mov: true,
            ofi_mov: true,
            user_mov: true,
            det_mov: true,
            id_expte: true,
           estado_mov:{
            select:{
                dsc_est_mov: true,
                

            }
           }
            
        },

    })
    
    if(allMovs.length){
        calcularDia(allMovs, fch_estado)
    }
    return (allMovs)
}

exports.addMov = async(valores)=>{
    let fechaDate = new Date(valores.fch_mov)
    const newMov = await prisma.movimientos.create({
       
        data: {
            fch_mov: fechaDate,
            ofi_mov: valores.oficina,
            user_mov: valores.usuario,
            det_mov: valores.detalle,
            id_expte: Number(valores.id_expte),
            id_est_mov: Number(valores.estadomov),
        },
        
    })

    console.log(newMov)
   
    return newMov

}

exports.delMov=async(id)=>{
    const deleteMov = await prisma.movimientos.delete({
        where: {
            id_mov: Number(id)
        }
        
    })
    
    return deleteMov
}

const calcularDia=(newMov, fch_estado)=>{
    let total_dias=0

    let hoy = new Date()
    let fchEstado = new Date()
    if(fch_estado){
        hoy=fch_estado
        fchEstado=fch_estado
    }
    if(newMov){
       
                        const Movim = []
                        
                        for (const value of newMov) {
                            let dias = differenceInDays( hoy,value.fch_mov)
                            value.dia=dias
                            hoy=value.fch_mov
                            

                        }
                //}
    }
  
   total_dias = differenceInDays(fchEstado, newMov[0].fch_mov)
   newMov.total_dias=total_dias  
   return (newMov)
}

