// models/taskGearList.js
module.exports = (sequelize, DataTypes) => {
    const TaskGears = sequelize.define('TaskGears', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option: {
            type: DataTypes.STRING,
            allowNull: true
        },
        gears: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return TaskGears;
};
