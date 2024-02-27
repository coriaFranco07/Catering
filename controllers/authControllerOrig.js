const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs')

const conexion = require('../database/db');

//establezco que vamos a utilizar promesas
const {promisify} = require('util');
const { json } = require('express');
const { use } = require('../routes/router');
const { appendFile } = require('fs');


//procedimientos metodos para registrarnos.
//aca capturamos lo que nos envia form regsiter action ='/register'  method='post' 
//no confundir con el route que tiene app.get(/register) que es para mandar el form en blanco

exports.register =async(req, res)=>{
    //capturamos los datos del formulario name, user y pass
   
    try {
   
        const name=req.body.name;
        const user=req.body.user;
        const pass=req.body.pass;
    
        //ahora encrypto la pass.  como utilice el async  aca utilizo el await
        let passHash = await bcryptjs.hash(pass, 8);
        conexion.query('INSERT INTO users SET ?', {user: user, name: name, pass: passHash}, (error, results)=>{
            if(error){
                console.log(error);
                res.redirect('/');
            }else{
                res.redirect('/login')
            }

        })
         
    } catch (error) {
        console.log(error);
    }
   
    
}

// ahora ralizamos metodo para el login

exports.login = async(req, res)=>{

    try {
        const user = req.body.user
        const pass=req.body.pass;

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
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async(error, results)=>{
                
            
                if(results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))){
                    
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
                    const id = results[0].id;
                    const token= jwt.sign({id:id}, process.env.JWT_SERCRETO,{
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                        //si quiero que el token no expire 
                        //const token= jwt.sign({id:id}, process.env.JWT_SERCRETO)
                    })

                    

                    const cookieOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 *1000),
                        httpOnly: true
                    }

                    req.signedCookies.title='jwt'
                    

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


            })
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
            
            const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SERCRETO); //verficamos el token
            conexion.query('SELECT * FROM users WHERE id = ?', [decodificada.id], (error, results)=>{

                if (!results) {return next()}
                
                req.user=results[0];
                return next();
            })

        } catch (error) {
            
            console.log(error)
            return next();
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
//este register lo debemos expecificar en el enrutador o route