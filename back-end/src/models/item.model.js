module.exports = (sequelize, DataTypes) => {

    const Item = sequelize.define("items", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        seller_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        current_bid: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        first_bid: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        nof_bids: {
            type: DataTypes.FLOAT,
            allowNull:false
        },
        buy_price: {
            type: DataTypes.FLOAT,
            allowNull:true
        },
        location: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        latitude: {
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        longitude: {
            type: DataTypes.DOUBLE,
            allowNull:true
        },
        country: {
            type: DataTypes.STRING,
            allowNull:false
        },
        started: {
            type: DataTypes.DATE,
            allowNull:false
        }, 
        ended: {
            type: DataTypes.DATE,
            allowNull:false
        }, 
        description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Item;
}
