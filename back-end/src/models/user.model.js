// var dbConn  = require('../../config/db.config');

// const { sequelize } = require("../../config/db.config");

// const db = require('../../config/db.config');
module.exports = (sequelize, DataTypes) => {

    let User = sequelize.define("users", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull:false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull:false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false
        },
        phoneNumber: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        country: {
            type: DataTypes.STRING,
            allowNull:false
        },
        afm: {
            type: DataTypes.INTEGER,
            allowNull:false
        }, 
        role: {
            type: DataTypes.ENUM("User", "Admin"),
            allowNull: false,
            defaultValue: "User"
        }
    });

    return User;
    
}



