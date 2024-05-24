const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('erpassignment','postgres',process.env.DBPASS,{
    host:'localhost',
    dialect:'postgres'
})

//connecting to db
sequelize.authenticate()
.then(()=>console.log(`db connected`))
.catch((err)=>console.log(`error while connecting db ${db}`))


//sync the db 
sequelize.sync()
.then(()=>console.log('database and tables are creted'))
.catch((err)=>console.log( `error while making table/db ${err}`))

module.exports = sequelize;