// models/student.js
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        ID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        PhoneNumber: DataTypes.STRING,
        Password: DataTypes.STRING,
        LastName: DataTypes.STRING,
        FirstName: DataTypes.STRING,
        Gender: DataTypes.ENUM('Male', 'Female'),
        ParentName: DataTypes.STRING,
        ParentPhoneNumber: DataTypes.STRING,
        ParentEmail: DataTypes.STRING,
        City: DataTypes.STRING,
        School: DataTypes.ENUM('School1', 'School2', 'School3'), // Add more schools as necessary
        Issues: DataTypes.TEXT,
        Languages: DataTypes.ENUM('English', 'Spanish', 'French', 'Others'),
        IsInGroup: DataTypes.STRING,
        DidParentApprove: DataTypes.BOOLEAN
    });

    return Student;
};