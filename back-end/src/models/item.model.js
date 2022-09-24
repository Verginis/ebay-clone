module.exports = (sequelize, DataTypes) => {

    const Item = sequelize.define("items", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        },
        category: {
            type: DataTypes.JSON,
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
            allowNull:false,
            default: 0
        },
        buy_price: {
            type: DataTypes.FLOAT,
            allowNull:true,
            get() {
                return this.getDataValue('buy_price');
            },
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
        sellerId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
            allowNull:false
        },
        started: {
            type: DataTypes.DATE
        }, 
        ended: {
            type: DataTypes.DATE
        }, 
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        runningAuction: {
            type: DataTypes.BOOLEAN,
            default: false,
            allowNull: true
        }
        
    });

    return Item;
}
