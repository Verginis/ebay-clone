module.exports = (sequelize, DataTypes) => {

    let Bid = sequelize.define("bidds", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        bidderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull:true
        } 
    });
        
    return Bid;
};