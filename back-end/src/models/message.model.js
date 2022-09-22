module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("messages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        sender_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        reciever_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        sender: {
            type: DataTypes.STRING,
            allowNull:false
        },
        reciever: {
            type: DataTypes.STRING,
            allowNull:false
        },
        text: {
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return Category;
}
