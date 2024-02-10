module.exports = (sequelize, DataTypes) => {
    const Example = sequelize.define("Example", {
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return Example;
}