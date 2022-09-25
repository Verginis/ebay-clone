const config = require('../../config/db.config.js');
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: 0,
        pool: {
          max: config.pool.max,
          min: config.pool.min,
          acquire: config.pool.acquire,
          idle: config.pool.idle
        }
      }
    );

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.bid = require('./bid.model.js')(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);
db.category = require('./category.model.js')(sequelize, Sequelize);
db.message = require('./message.model.js')(sequelize, Sequelize);

db.bid.belongsTo(db.item);
db.bid.belongsTo(db.user, { as : 'bidder'});

db.user.hasMany(db.item, { foreignKey: 'sellerId' });

db.message.belongsTo(db.user, { as : 'sender' });
db.user.hasMany(db.message, { foreignKey : 'recieverId' });

module.exports = db;

