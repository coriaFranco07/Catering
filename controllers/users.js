
const serviceUsers = require('../service/users')
const serviceRoles = require('../service/roles')


const validExpte = require('../middleaware/exptes/valida')
const serviceMovs = require('../service/movs')
const format = require ('date-fns/format')


exports.getAllUsers = async(req, res)=>{
    
    
    const allUsers = await serviceUsers.getAllUsers()
  
    res.render ('users/users', {users: allUsers, user: req.user})
}

exports.create = async(req, res)=>{
    
    const valores = req.body
    
    res.render('users/adduser', {alert: false,valores: valores, user: req.user})
}

 exports.pass = async(req, res)=>{
    const id = req.params.id
    const user = await serviceUsers.getIdUser(id)

    res.render('users/edituser', {id: id, username: user.username, alert:false, user: req.user})

 }

 exports.updpass = async(req, res)=>{
    const {password}=req.body
    const {id_user} =req.body
    const updatepass = await serviceUsers.updatepass(id_user, password)
    res.redirect('/users')
 }

exports.add= async(req, res,next)=> {
    
    const valores = req.body
    const newUser = await serviceUsers.addUser(valores)
    res.redirect('/users')
    
          
}

exports.active = async (req, res)=>{
    const id_user = req.params.id
    const userActive = await serviceUsers.active(id_user)
    res.redirect('/users')

}



//roles
exports.allRoles = async(req, res)=>{
    const id = req.params.id
    
    const allrol = await serviceRoles.getAllRolesUser(id)
    const usuario = await serviceUsers.getIdUser(id)
    
   
    res.render ('roles/roles', {roles: allrol, usuario,  user: req.user})
}


exports.createRol = async(req, res)=>{
   
    const id_user = req.params.id
    const roles = await serviceRoles.getAllRole(id_user)
  
   //res.send ('deberian verse roles distintos')
    res.render('roles/addrol', {alert: false, id_user, roles, user: req.user})
}

exports.delrol = async(req, res)=>{
    const id_user =req.params.id_user
    const id_rol= req.params.id_rol
    const deleteMov = await serviceRoles.deleteRol(id_user, id_rol)
    res.redirect('/users/role/' + id_user)

}


exports.addRolUser= async(req, res)=>{
    
    const usuario = req.body.id_user
    const rol = req.body.roles
   
   
   const newRol = await serviceRoles.addRoleUser(usuario, rol,'admin')
     
    res.redirect('/users/role/' + usuario)

}
exports.passChange = async(req, res)=>{
    
    const validaciones=[]
    res.render('users/passuser', {validaciones, alert:false, user: req.user})

 }

 exports.updpassChange = async(req, res)=>{
    const {user_pass_actual, user_pass_new, user_pass_conf, username}=req.body
    const usuario = await serviceUsers.getUserName(username)
    
    const updatepass = await serviceUsers.updatepass(usuario.id_user, user_pass_new)
    res.redirect('/')
    
 }
