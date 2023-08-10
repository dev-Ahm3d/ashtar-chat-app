const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Application = sequelize.define('Application', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true 
    },
    name: {
        type: DataTypes.STRING,
        allowNull : false ,
        unique : true 
    },
    token : {
        type : DataTypes.STRING ,
        allowNull : false ,
        unique : true 
    }
},{
    indexes : [
        {
            fields : ["token"]
        } 
    ]
})

module.exports = Application 