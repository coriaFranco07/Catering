const {PrismaClient}= require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

const servicePrioridad = require('../service/prioridad')
const serviceContratacion= require('../service/contratacion')
const fecha = require('../util/fechas')


exports.getAllUsers = async ()=>{
    const allUsers = await prisma.user.findMany({
       
        select: {
            id_user: true,
            username: true,
            last_access: true,
            active: true, 
        },
    })
    

    return allUsers
}

exports.getUserName = async (username) =>{
   
    const user = await prisma.user.findUnique({
        where: {
            username: username,
        },
    })
    return user
}


exports.addUser = async (valores)=>{
    
    let pass = await bcryptjs.hash(valores.password, 8)

    let fechaDate = new Date()

    const intentos = parseInt(0)

   const newUser = await prisma.user.create({
       
    data:{

        username: valores.username,
        password: pass,
        last_access: fechaDate,
        active: true,
        cnt_intentos: Number(intentos),
        proc_user: 'admin',
        proc_fch: fechaDate,
    },

    })    
 
    return newUser

};

exports.active= async (id)=>{

   const getUser = await prisma.user.findUnique({
        where: {
            id_user: Number(id)
        }

   })
    let estado=true
   if(getUser.active){
     estado=false 
   }

   const userActive = await prisma.user.update({
     where:{
        id_user: Number(id)
     },
     data:{
        active: estado
     }
   })

   return userActive

}

exports.getIdUser= async (id)=>{
    const getUser = await prisma.user.findUnique({
        where: {
            id_user: Number(id)
        },
        select:{
            id_user: true,
            username: true,
            active: true,
            last_access: true,
        }
    })
    return getUser
}

exports.updatepass = async(id, pass)=>{
    let newpass = await bcryptjs.hash(pass, 8)
    const updpass = await prisma.user.update({
        where: {
            id_user: Number(id)
        },
        data: {
            password: newpass,
        }
    })
    return updpass
}