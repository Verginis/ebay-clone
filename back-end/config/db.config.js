const mysql = require('mysql');

// create here mysql connection

// const dbConn = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'user'
// });

// dbConn.connect(function(error){
//     if(error) throw error;
//     console.log('Database Connected Successfully!!!');
// });

const Sequelize = require("sequelize");
const db = new Sequelize(
    'user',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;
// db.user = require('../src/models/user.model')(sequelize, Sequelize);
// module.exports = db;

// sequelize.authenticate().then(() => {
//     console.log('Connection has been established successfully.');
//  }).catch((error) => {
//     console.error('Unable to connect to the database: ', error);
//  });

module.exports = db;