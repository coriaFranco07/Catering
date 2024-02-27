//vamos hacer la conexion a mysql

const mysql=require('mysql');

const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    database: process.env.DB_DATABASE
});

conexion.connect((error)=>{
    if(error){
        console.log('error de conexion ' + error);
        return
    }else{
        console.log('Conexion DB');
    }
})

module.exports=conexion;
//exporto y debo llamar desde enrutador