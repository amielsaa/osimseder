// models/Staff.js
module.exports = (sequelize, DataTypes) => {
    const Staffs = sequelize.define('Staffs', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
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
            type: DataTypes.STRING,
            allowNull: false
        },
        accesses: {
            type: DataTypes.STRING,
            allowNull: true
        },
        verificationToken: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.STRING,
            allowNull: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Staffs.associate = (models) => {
        Staffs.belongsTo(models.Cities, {
            foreignKey: 'cityId',
            allowNull: true
        });
    };

    return Staffs;
};


