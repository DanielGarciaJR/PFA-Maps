import {NextResponse} from "next/server";
import { jwtVerify } from "jose";

//Verify if the token is the correct
export async function middleware(request) {
    
    const token = request.cookies.get('myTokenName');
    
        if(token == undefined){
            return NextResponse.redirect(new URL('/app/MapClient',request.url))
        }

        try{
            const {payload} = await jwtVerify(token.value, new TextEncoder().encode('token'));
            
            console.log(payload);
            return NextResponse.next();

        }catch(error){
            console.log(error);
            return NextResponse.redirect(new URL("/app/MapClient",request.url))
        }
}

//rutas que quieres que esten protegidas por el login
export const config = {
    matcher : ['/','/app/Map','/app/Catalog']
}