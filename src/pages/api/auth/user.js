import {verify} from 'jsonwebtoken'

export default function userHandler(req,res){
    
    
    
    const {myTokenName} = req.cookies
   

    console.log(myTokenName);
    if(!myTokenName){
        return res.status(401).json({error: 'no token'})
    }else{
        try{
            const user = verify(myTokenName,'token')
            return res.json({user : user.user_name, role: user.roles[0], token: myTokenName});
        }catch(error){
            return res.status(401).json({error:'invalid token'})
        }
    }

}