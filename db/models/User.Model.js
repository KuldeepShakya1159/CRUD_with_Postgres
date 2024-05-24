const {DataTypes} = require('sequelize');
const sequelize = require('../dbConfig.js');

const User = sequelize.define('User',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
        defaultValue:DataTypes.UUIDV4
    },
    username:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    }
})

module.exports = User;