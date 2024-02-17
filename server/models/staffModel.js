// models/staffModel.js
module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define('Staffs', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other', 'Not Relevant'),
            allowNull: false,
        },
        city: {
            type: DataTypes.ENUM('BSV', 'JRS', 'TLV'),
            allowNull: false,
        }
    });

    return Staffs;
};


