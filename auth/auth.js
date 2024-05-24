const jwt = require('jsonwebtoken');

const generatetoken = (user)=>{
    try{
        const token = jwt.sign({user},process.env.SECRETKEY,{
            expiresIn:'10m'
        })
        return token
    }
    catch(err){
        return {result:`err while generating token ${err}`}
    }
    
}


const verfiytoken = (req,res,next)=>{
    const token = req.cookies._session;
    console.log(token)
    try{
        const user = jwt.verify(token,process.env.SECRETKEY)
        if(user){
    
            next();
        }else{
            res.clearCookie("_session");
            return res.status(404).json({result:'unauthorized_user'})
        }

    }catch(err){
        return res.status(400).json({result:`error with unauthorized_user ${err}`})
    }
}

module.exports = {generatetoken,verfiytoken};