module.exports = (sequelize, DataTypes) => {
    const UsersToDelete = sequelize.define("UsersToDelete", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    })
    return UsersToDelete;
}