import { serialize } from 'cookie';
import jwt from 'jsonwebtoken'; 
import axios from 'axios';



export default async function loginHandler(req,res){

   
    
   try{
        const response = await axios.post('https://pfa-production.up.railway.app/pfa/login', req.body, {
            headers: { 'Content-Type': 'multipart/form-data'},
            mode: 'cors',  
        });

        if(response.data.data == 'Invalid credentials'){
            console.log('Invalid User');
        }else{
            const token = response.data.data;
           

             //serializar token para pasarlo a la cabecera.
            const serialized = serialize('myTokenName', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV == 'production',
                sameSite: 'strict', //Si nos comunicamos con un servidor externo 'none' es mejor, strict es para comunicarse en el mismo dominio
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: '/'
            });

            //enviar token en cabecera.
            res.setHeader('Set-Cookie', serialized);

            return res.json('success');
        }
    }catch(error){
        console.log(error);
    }
    
    
   /* if(username === "admin" && password === "adminTaskr"){
        
        //Haces la firma de cualquier dato guardado en la base de datos para crear el token.
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //token valido por 30 dias. 
            username: 'admin21',  //esto se saca de la base de datos , es dato para el token.
            password: 'adminTaskr' // esto se saca de la base de datos , es dato para el token.
        },'secret')

         //serializar token para pasarlo a la cabecera.
        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict', //Si nos comunicamos con un servidor externo 'none' es mejor, strict es para comunicarse en el mismo dominio
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        //enviar token en cabecera.
        res.setHeader('Set-Cookie', serialized)

        
        return res.json('success');
    }*/
    
  /* if(username === "daniel21" && password === "client"){
        //Haces la firma de cualquier dato guardado en la base de datos para crear el token.
        const token = jwt.sign({
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, //token valido por 30 dias. 
            username: 'client21',  //esto se saca de la base de datos , es dato para el token.
            password: 'client' // esto se saca de la base de datos , es dato para el token.
        },'secret')

        //serializar token para pasarlo a la cabecera.
        const serialized = serialize('myTokenName', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV == 'production',
            sameSite: 'strict', //Si nos comunicamos con un servidor externo 'none' es mejor, strict es para comunicarse en el mismo dominio
            maxAge: 1000 * 60 * 60 * 24 * 30,
            path: '/'
        })

        //enviar token en cabecera.
        res.setHeader('Set-Cookie', serialized)


        return res.json('success client');
    }*/

  // return res.status(401).json({error: 'Invalid Credentials'})
}