import {verify} from 'jsonwebtoken'

export default function userHandler(req,res){
    
    const {myTokenName} = req.cookies

    console.log(myTokenName);
    if(!myTokenName){
        return res.status(401).json({error: 'no token'})
    }else{
        try{
            const user = verify(myTokenName,'secret')
            return res.json({user : user.username, password: user.password});
        }catch(error){
            return res.status(401).json({error:'invalid token'})
        }
    }

}