// models/housesTasks.js
module.exports = (sequelize, DataTypes) => {
    const HousesTasks = sequelize.define('HousesTasks', {
        HouseID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        TaskID: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });

    return HousesTasks;
};
