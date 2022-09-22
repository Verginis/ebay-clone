module.exports = (sequelize, DataTypes) => {

    let Bidder = sequelize.define("bidder", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull:false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull:true
        }
    });

    return Bidder;
};