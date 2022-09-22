module.exports = (sequelize, DataTypes) => {

    const Category = sequelize.define("categories", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false
        }
    });

    return Category;
}
