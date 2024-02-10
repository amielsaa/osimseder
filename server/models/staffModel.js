// models/staff.js
module.exports = (sequelize, DataTypes) => {
    const Staff = sequelize.define('Staff', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        PhoneNumber: DataTypes.STRING,
        Email: DataTypes.STRING,
        Password: DataTypes.STRING,
        LastName: DataTypes.STRING,
        FirstName: DataTypes.STRING,
        Gender: DataTypes.ENUM('Male', 'Female'),
        City: DataTypes.STRING,
        School: DataTypes.ENUM('School1', 'School2', 'School3'), // Add more schools as necessary
        Accesses: DataTypes.ENUM('Admin', 'Teacher', 'Staff')
    });

    return Staff;
};
