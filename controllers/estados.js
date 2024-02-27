const { prisma } = require('@prisma/client')
const serviceEstados = require('../service/estado')
const serviceContratacines = require('../service/contratacion')


exports.getAllEstados = async(req, res)=>{
    const allEst = await serviceEstados.getAllEstados()
    res.render('estados/ests', {estados: allEst, user: req.user})
    
}

exports.createEst = (req, res)=>{res.render('estados/addest', {alert: false, user: req.user})}

exports.addEstado = async(req, res)=>{
    const dsc = req.body.est.toUpperCase()
    const addEst = await serviceEstados.addEstado(dsc)
    res.redirect('/ests')
}

exports.delEstados = async (req, res)=>{
    const id = req.params.id
  
    const delest = await serviceEstados.delEst(id)
    res.redirect('/ests')
}

exports.getIdEstado = async (req, res)=>{
    const id = req.params.id
    const getEst = await serviceEstados.getIdEstados(id)
    res.render('estados/editest', {estado: getEst, user: req.user})
}

exports.updateEst = async (req, res)=>{
    const id = req.body.id_estado
    const desc = req.body.dsc_estado.toUpperCase()
    const updateEst = await serviceEstados.updateEstados(id, desc)
    res.redirect('/ests')
}

exports.getAllMovEst = async(req, res)=>{

    const estados = await serviceEstados.getAllMovEst();

    res.render('movest/movests',{estados, user: req.user, alert:false})

   // res.send('todos los movs estados')

}

exports.createMovEst = (req, res)=>{res.render('movest/addmovest', {alert: false, user: req.user})}

exports.addMovEst = async (req, res)=>{
    const {movest} = req.body
    const addMovEstados = await serviceEstados.addMovEst(movest)
    res.redirect('/ests/movests')
}

exports.editMovEst = async (req, res)=>{
    const id_mov_est = req.params.id

    res.send('aca viene para editar')
}

exports.deleteMovEst = async (req, res)=>{
    const id_mov_est = req.params.id
   
    const existInMovs = await serviceEstados.existEstInMovs(id_mov_est)
    if(!existInMovs.length){
        const del = await serviceEstados.delMovEst(id_mov_est)
        res.redirect('/ests/movests')
    }else{
        const estados = await serviceEstados.getAllMovEst();
        res.render('movest/movests',{estados, user: req.user,
            alert: true,
            alertTitle: 'Advertencia',
            AlertMessage: 'Error Exptes. con este Estado',
            alertIcon: 'info',
            showConfirmButton: true,
            timer: 4000,
            ruta: ''
        }) 

    }

    
}

exports.estMovCtns = async(req, res)=>{
    const estados = await serviceEstados.getAllEstMovCtns()
  
    res.render('movestctns/movestsctns',{estados, user: req.user})

    //res.send ('estados contrataciones')
}

exports.delMovEstCtns = async (req, res)=>{
    const id_cont = req.params.id_cont
    const id_est = req.params.id_est

    const delmov = await serviceEstados.delMovEstCtns(id_cont, id_est)
  
    res.redirect('/ests/movests/ctns')

}

exports.createMovEstCtns = async(req, res)=>{
    const estados = await serviceEstados.getAllMovEst()
    const contrataciones = await serviceContratacines.getAllContrataciones()
    const validaciones=[]
    const user = req.user
    const valores= req.body

    res.render('movestctns/addmovestctns',{validaciones,estados,contrataciones,user, valores, alert:false})


}

exports.addMovEstCtns = async(req,res)=>{
    const {contratacion, estado}= req.body
    const addMovEst = await serviceEstados.addMovEstCtns(contratacion, estado)
    res.redirect('/ests/movests/ctns')
    
}