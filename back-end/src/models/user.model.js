// var dbConn  = require('../../config/db.config');
const db = require('../../config/db.config');
const { DataTypes} = require("sequelize");

// var User = function(user){
//     this.firstname     =   user.first_name;
//     this.lastname      =   user.last_name;
//     this.email          =   user.email;
//     this.password          =   user.password;
//     this.phoneNumber          =   user.phoneNumber;
//     this.country          =   user.country;
//     this.afm          =   user.afm;
//     this.created_at     =   new Date();
// }

// // get all employees
// User.getAllUsers = (result) =>{
//     dbConn.query('SELECT * FROM user ', (err, res)=>{
//         if(err){
//             console.log('Error while fetching employess', err);
//             result(null,err);
//         }else{
//             console.log('Users fetched successfully');
//             result(null,res);
//         }
//     })
// }

const User = db.define("users", {
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
    }
});



module.exports = User;