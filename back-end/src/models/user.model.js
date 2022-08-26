var dbConn  = require('../../config/db.config');

var User = function(user){
    this.firstname     =   user.first_name;
    this.lastname      =   user.last_name;
    this.email          =   user.email;
    this.password          =   user.password;
    this.phoneNumber          =   user.phoneNumber;
    this.country          =   user.country;
    this.afm          =   user.afm;
    this.created_at     =   new Date();
}

// get all employees
User.getAllUsers = (result) =>{
    dbConn.query('SELECT * FROM user ', (err, res)=>{
        if(err){
            console.log('Error while fetching employess', err);
            result(null,err);
        }else{
            console.log('Users fetched successfully');
            result(null,res);
        }
    })
}

module.exports = User;