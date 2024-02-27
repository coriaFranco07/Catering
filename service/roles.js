const {PrismaClient}= require('@prisma/client')
const { validationResult } = require('express-validator')
const prisma = new PrismaClient()

const fecha = require('../util/fechas')


exports.getAllRolesUser = async (id)=>{
    const allRolesUser = await prisma.roles_user.findMany({

        where:{
            id_user: Number(id)
        },
        include:{
            roles:{
                select:{
                    id_rol: true,
                    name_rol: true,
                }
            }
        }

    })
    

    return allRolesUser
}

//devuelve los roles distintos a los que posee el usuario
exports.getAllRole = async (id)=>{
    const allRolesUser = await prisma.roles.findMany({

        where: { NOT: {roles_user: { some: { id_user: Number(id) } } }},
        //include: {roles_user: true }

    })
    
  
    return allRolesUser
}

exports.rolesUsers = async (id)=>{
    const allRolesUser = await prisma.roles.findMany({

        where: { 
            
            roles_user: 
            { some: 
                { id_user: Number(id) },
                
            },
            
        },
        select: {
            name_rol: true,
        }
        //include: {roles_user: true }

    })
    

    return allRolesUser
}

exports.deleteRol = async(id_user, id_rol)=>{
    const delUserRol = await prisma.roles_user.delete({
        where: { 
            id_user_id_rol:{
                 id_user: Number(id_user),
                 id_rol: Number(id_rol)
            }
        }

    })
    return delUserRol
}

exports.addRoleUser = async(id_user, id_rol, usuario)=>{
    const addRU = await prisma.roles_user.create({
        data: {
            id_user: Number(id_user),
            id_rol: Number(id_rol),
            proc_user: usuario,
        }
    })
    return addRU
}
