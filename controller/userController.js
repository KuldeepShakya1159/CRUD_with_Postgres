const sequelize = require('../db/dbConfig.js');
const User = require('../db/models/User.Model.js');

//jwt token
const auth = require('../auth/auth.js');

const loginUser = async (req,res)=>{
    const {username,email,password} = req.body;

    try{
        //generating token
        const token = auth.generatetoken(req.body)
            res.cookie('_session',token,{
                httpOnly:true,
                expires: new Date(new Date().getTime() + 10*60*1000) //10 min expiry
            })
            console.log('==============')
            console.log(token)
            //checking if user exists
        const checkUser = await User.findOne({where:{
            username:username
        }})
        // console.log(checkUser.toJSON())
        if(checkUser){
            if(checkUser.password===password){
                // console.log('=====================',checkUser.toJSON())
                return res.status(200).json({result:checkUser.toJSON()})
            }else{
                return res.status(400).json({result:'invalid credentials'})
            }
            
        }else{
            const user = await User.create({username:username,email:email,password:password})
            if(user){
                return res.status(201).json({result:user.toJSON()});
            }
        }
       
    }catch(err){
        return res.status(400).json({result:'cannot register user , try again after some time'})
    }
}


// fetching all db users
const getAllUser = async(req,res)=>{
    console.log('inside getallusers')
    try{
        const users = await User.findAll();
        // console.log(users)
        return res.status(200).json({result:users});

    }catch(err){
        return res.status(400).json({result:'error while fetching users'})
    }
}



//updating the user with its id
const updateUser = async(req,res)=>{
    try{
        let Olduser = await User.findByPk(req.params.id);
        if(!Olduser){
            return res.status(400).json({result:'not a valid user'})
        }

          await User.update(
        {username:req.body.username,
            email:req.body.email,
            password:req.body.password
        },{
            where: {
                id: req.params.id
            },
            returning: true // Include the updated record in the result
        }

       );
       
        return res.status(200).json({result:`user updated successfully`})
    }catch(err){
        return res.status(400).json({result:`error while updating user ${err}`})
    }
}


// deleting the user with id
const deleteUser = async(req,res)=>{
    try{
        const user = await User.findByPk(req.params.id);
        if(!user){
            return res.status(404).json({result:'user is not found'})
        }

        const deleteduser = await user.destroy();
        return res.status(200).json({result:` this user ${user} successfuly deleted . Deleted User ${deleteduser}`})
    }
    catch(err){
        return res.status(400).result({result:`error while deleting the user ${err}`})
    }
}



module.exports = {loginUser , getAllUser , deleteUser , updateUser};
