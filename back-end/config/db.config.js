module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "1a2r3i4s@",
    DB: "user",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };

// const mysql = require('mysql');

// const {Sequelize, DataTypes} = require("sequelize");
// const sequelize = new Sequelize(
//     'user',
//     'root',
//     '',
//     {
//         host: 'localhost',
//         dialect: 'mysql'
//     }
// );


// sequelize.authenticate()
// .then(() => {
//     console.log('connected..')
// })
// .catch(err => {
//     console.log('Error'+ err)
// })

// const db = {};
// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// db.users = require('../src/models/user.model')(sequelize, DataTypes);
// db.items = require('../src/models/item.model')(sequelize, DataTypes);

// db.sequelize.sync({ force: false })
// .then(() => {
//     console.log('yes re-sync done!')
// })

// db.users.hasMany(db.items, {
//     foreignKey: 'id',
//     as: 'items'
// })

// db.items.belongsTo(db.users, {
//     foreignKey:"seller_id",
//     as: "users"
// });


// module.exports = db;