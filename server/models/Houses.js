// models/Houses.js
module.exports = (sequelize, DataTypes) => {
    const Houses = sequelize.define('Houses', {
        teamOwnerEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamOwnerEmail_2: {
            type: DataTypes.STRING,
            allowNull: true
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
        residentAlternatePhoneNum: {
            type: DataTypes.STRING,
            allowNull: false
        },
        residentGender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        languageNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        },
        numberOfRooms: {
            type: DataTypes.STRING,
            allowNull: true
        },
        membersNeeded: {
            type: DataTypes.STRING,
            allowNull: true
        },
        freeText: {
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
            allowNull: false
        });
        Houses.hasMany(models.Photos, {
            foreignKey: 'houseId',
            allowNull: false
        });
    };


    return Houses;
};

