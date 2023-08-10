const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Chat = sequelize.define('Chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    number : {
        type: DataTypes.INTEGER,
        allowNull : false 
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    indexes : [
        {
            fields : ["number"]
        } 
    ]
})

module.exports = Chat 