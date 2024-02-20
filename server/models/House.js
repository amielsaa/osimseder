// models/Houses.js
module.exports = (sequelize, DataTypes) => {
    const Houses = sequelize.define('Houses', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residentLastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residentFirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residentPhoneNum: {
            type: DataTypes.STRING,
            allowNull: false
        },
        languageNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        },
        freeText: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Houses.associate = (models) => {
        Houses.hasOne(models.Groups, {
            foreignKey: 'houseId'
        });
        Houses.hasMany(models.Tasks, {
            foreignKey: 'houseId'
        });
    };


    return Houses;
};

