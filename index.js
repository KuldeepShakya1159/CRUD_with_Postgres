require('dotenv').config();
const express = require('express');
const cookieparser = require('cookie-parser');

const app = express();


//middleware
app.use(express.json());
app.use(cookieparser());


//database
require('./db/dbConfig.js')

//importing router
const userRouter = require('./router/userRouter.js')


//routes
app.use('/user',userRouter);
app.get('/',(req,res)=>{
    res.json({"Welcome ":"Server is running"
    })
})



//starting server
app.listen(process.env.PORT,(err)=>{
    if(err){
        console.log(`err while running the sever${err}`)
    }else{
        console.log('server started...')
    }
})