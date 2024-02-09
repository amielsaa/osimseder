// models/tasks.js
module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('Tasks', {
        TaskID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        TaskType: DataTypes.INTEGER,
        TaskName: DataTypes.ENUM('Type1', 'Type2', 'Type3'), // Add more types as necessary
        Option: DataTypes.ENUM('Option1', 'Option2', 'Option3'), // Add more options as necessary
        Room: DataTypes.STRING,
        FreeText: DataTypes.STRING,
        Progress: DataTypes.ENUM('1', '2', '3'),
        PictureBefore: DataTypes.STRING,
        PictureAfter: DataTypes.STRING
    });

    return Tasks;
};
