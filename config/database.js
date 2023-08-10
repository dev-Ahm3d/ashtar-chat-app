const { Sequelize } = require('sequelize');

exports.sequelize = new Sequelize(
    process.env.DB_NAME,  
    process.env.DB_USERNAME ,
    process.env.DB_PASSWORD , {
    host: 'localhost',
    dialect: 'mysql'
})


exports.dbConnect = async ()=>{
    try {
        await this.sequelize.sync()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database')
        console.log(error)
    }
}

