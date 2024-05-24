const express = require('express');
const router = express.Router();

//authmiddleware
const {verfiytoken} = require('../auth/auth.js')

const {loginUser,getAllUser,deleteUser,updateUser} = require('../controller/userController.js');

router.post('/',loginUser); // sign the user
router.get('/all',verfiytoken,getAllUser);     //fetch all teh users    
router.put('/update/:id',verfiytoken,updateUser);   // update the user
router.delete('/delete/:id',deleteUser)     //delete the user

module.exports= router