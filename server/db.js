const {Sequelize} = require('sequelize')


module.exports = new Sequelize(
  //  process.env.DB_NAME,
  //  process.env.DB_USER,
  //  process.env.DB_PASSWORD,
    process.env.DB_URI
    // {
    //     dialect: 'postgres',
    //     host: process.env.DB_HOST,
    //     port: process.env.DB_PORT
    //    
    // }
)