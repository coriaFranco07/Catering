const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')
const serviceUser = require('../service/users')
const serviceRoles = require('../service/roles')
const {promisify} = require('util');
const { ro } = require('date-fns/locale');


//establezco que vamos a utilizar promesas


//procedimientos metodos para registrarnos.
//aca capturamos lo que nos envia form regsiter action ='/register'  method='post' 
//no confundir con el route que tiene app.get(/register) que es para mandar el form en blanco

// ahora ralizamos metodo para el login

exports.login = async(req, res)=>{
    const user = req.body.user
    const pass=req.body.pass;
   
    try {
        

        //controlo si se ingreso usuario y contrasña y utilizo libreria 
        //para esto instalo sweetalert2

        if(!user || !pass){

            //hago un res.render de login, con los datos de alert de sweetalert2

            res.render('login', {
                //aca van datos de sweetalert2
                alert: true,
                alertTitle: 'Advertencia',
                AlertMessage: 'Ingrese Usuario y Contraseña',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 4000,
                ruta: 'login' 

            })


        }else{
            //para el caso que ingreso user y pass
           
            const getUser = await serviceUser.getUserName(user)
            
            if(getUser){
                
            
                if(!(await bcryptjs.compare(pass, getUser.password))){
                    
                    res.render('login', {
                        //aca van datos de sweetalert2
                        alert: true,
                        alertTitle: 'Advertencia',
                        AlertMessage: 'Credenciales Erroneas',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 4000,
                        ruta: 'login' 
        
                    }) 
                }else{

                    // ahora genero el token porque el usuario esta autenticado 
                    const id = getUser.id_user;
                    const rolesUse= await serviceRoles.rolesUsers(id)

                    const payload = {
                        
                        user: id,
                        username: getUser.username,
                        roles: rolesUse
                        
                    }
                    
                    const token= jwt.sign(payload, process.env.JWT_SERCRETO,{
                       expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        //si quiero que el token no expire 
                        //const token= jwt.sign({id:id}, process.env.JWT_SERCRETO)
                    })

                    

                    const cookieOptions = {
                        //expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000),
                        expires: new Date(Date.now() +  24 * 60 * 60 * 1000 ),
                       
                        httpOnly: true
                    }
                    
                    req.signedCookies.title='jwt'
                    
                    /////aca error option expired is invalid
                    res.cookie('jwt', token, cookieOptions) //'jwt es el nombre que le doy a la cookie y aparecera en el navegador
                    
                   
                    res.render('login', {
                        //aca van datos de sweetalert2
                        alert: true,
                        alertTitle: 'Conexion Exitosa',
                        AlertMessage: 'Usuario Correcto',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 4000,
                        ruta: '/'

                    })
                
                
                }


            }else{
                res.render('login', {
                    //aca van datos de sweetalert2
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Credenciales Erroneas',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: 'login' 
    
                }) 
            }
        }
        
    } catch (error) {
        console.log(error);
    }
    // luego de la configuracion voy a router y en router.get(/login debo 
    //agregar el alert para enviar a la plantilla si no daria error)

}


//verifico si el usuario esta autenticado

exports.isAuthenticated = async(req, res, next)=>{
   
    if (req.cookies.jwt){   //pregunto si la cookie de nombre jwt es verdadero 
        
        try {
            
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,  process.env.JWT_SERCRETO); //verficamos el token
            if(decodificada){

                req.user=decodificada.username
                req.userid=decodificada.user
                req.roles=decodificada.roles
                
                next()
            }else{
                
                res.render('../login', {user: req.user,})
            }
            
   
        } catch (error) {
            
            console.log(error)
           
        }
       
    }else{
        
        res.redirect('/login') //si no hay token se envia de nuevo al login
    }
}
//procedimiento de cerrar session

exports.logout = (req, res)=>{
    
   
    res.clearCookie('jwt') //borro la cookie
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   
     return res.redirect('/')
    }


exports.logo=(req, res)=>{
    res.render ('login', {alert: false})
}

exports.isAuthorizated = (roles)=>async(req, res, next)=>{
    let mio=[];
    if (req.cookies.jwt){   //pregunto si la cookie de nombre jwt es verdadero 
      // let aut=false
        try {
            
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt,  process.env.JWT_SERCRETO); //verficamos el token
            if(decodificada){

                decodificada.roles.forEach(rol=>{

                     
                    mio.push(rol.name_rol)

                   })


                   

                if(roles.some(r=> mio.includes(r))){
                    next()
                }else{
                    res.render('index', {user: req.user, 
                        alert: true,
                        alertTitle: 'Advertencia',
                        AlertMessage: 'Función No Autorizada',
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: 4000,
                        ruta: '/' 
                    })

                }
            }else{
                
                res.render('index', {user: req.user,
                    alert: true,
                    alertTitle: 'Advertencia',
                    AlertMessage: 'Función No Autorizada',
                    alertIcon: 'info',
                    showConfirmButton: true,
                    timer: 4000,
                    ruta: '/' 
                })
                
            }
            
   
        } catch (error) {
            
            console.log(error)
           
        }
       
    }else{
        
        res.redirect('/login') //si no hay token se envia de nuevo al login
    }
}