// models/Houses.js
module.exports = (sequelize, DataTypes) => {
    const Houses = sequelize.define('Houses', {
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
        },
        picBefore: {
            type: DataTypes.STRING,
            allowNull: true
        },
        picAfter: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Houses.associate = (models) => {
        Houses.belongsTo(models.Areas, {
            foreignKey: 'areaId',
            allowNull: false
        });
        Houses.belongsTo(models.Cities, {
            foreignKey: 'cityId',
            allowNull: false
        });
        Houses.hasMany(models.Groups, {
            foreignKey: 'houseId',
            allowNull: true
        });
        Houses.hasMany(models.Tasks, {
            foreignKey: 'houseId',
            allowNull: true
        });
    };


    return Houses;
};

