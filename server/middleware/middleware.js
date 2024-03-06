const { VerifyToken } = require("../utility/JWTToken");

async function middleware(req,res,next){

    try{

        const token = req.cookies.token;
        const payload = await VerifyToken(token);
        const email = payload['email'];
        const user_id = payload['id'];

        if(payload === null){
            return res.json({status:"error", message:"Unauthorized User!"});
        }else{

            req.headers.email = email;
            req.headers.id = user_id;
            next();
            
        }
        

    }catch(error){
        return res.json({status:"error", message:"Unauthorized User!"});
    }

}

module.exports = middleware;