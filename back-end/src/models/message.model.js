module.exports = (sequelize, DataTypes) => {

    const Message = sequelize.define("messages", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        recieverId: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        text: {
            type: DataTypes.STRING,
            allowNull:false
        },
        seen: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    });

    return Message;
}
