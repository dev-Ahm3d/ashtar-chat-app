const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Message = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number : {
        type: DataTypes.INTEGER,
        allowNull : false 
    },
    body: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    indexes : [
        {
            fields : ["number"]
        } ,
    ]
})

module.exports = Message 