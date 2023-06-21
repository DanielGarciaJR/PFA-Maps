import jwt from 'jsonwebtoken'; 
import { serialize } from 'cookie';

export default function loginHandler(req,res){

    const { username, password } = req.body;

    
    if(username === "admin" && password === "adminTaskr"){
        
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
    }
    
   if(username === "daniel21" && password === "client"){
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
    }

    return res.status(401).json({error: 'invalid credentials'})
}