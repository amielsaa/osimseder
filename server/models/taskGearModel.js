// models/taskGearList.js
module.exports = (sequelize, DataTypes) => {
    const TaskGearList = sequelize.define('TaskGearList', {
        TaskType: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        Option: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        GearCollection: DataTypes.TEXT
    });

    return TaskGearList;
};
