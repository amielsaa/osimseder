// models/AreaModel.js
module.exports = (sequelize, DataTypes) => {
    const Cities = sequelize.define('Cities', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        areaName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Cities.associate = (models) => {
        Cities.hasMany(models.Areas, {
            foreignKey: 'cityId'
        });

        Cities.hasMany(models.Schools, {
            foreignKey: 'cityId'
        });

        Cities.hasMany(models.Houses, {
            foreignKey: 'cityId'
        });

        Cities.hasMany(models.Staffs, {
            foreignKey: 'cityId'
        });

        Cities.hasMany(models.Students, {
            foreignKey: 'cityId'
        });
    };

    return Cities;
};
        