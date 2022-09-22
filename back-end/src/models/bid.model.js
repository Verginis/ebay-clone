const Bidder = require('./bidder.model.js');
const User = require('./user.model.js');

module.exports = (sequelize, DataTypes) => {

    let Bid = sequelize.define("bid", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        itemId: {
            type: DataTypes.INTEGER,
            references: {
                model: Item,
                key: 'id'
            }
        },
        bidderId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key:'id'
            }
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull:true
        }, 
        timestamps: true
       

    });
        
    return Bid;
};