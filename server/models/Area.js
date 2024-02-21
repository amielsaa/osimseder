// models/Area.js
module.exports = (sequelize, DataTypes) => {
    const Areas = sequelize.define('Areas', {
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

    Areas.associate = (models) => {
        Areas.hasMany(models.Schools, {
            foreignKey: 'areaId'
        });

        Areas.hasMany(models.Students, {
            foreignKey: 'areaId'
        });

        Areas.hasMany(models.Staffs, {
            foreignKey: 'areaId'
        });

        Areas.hasMany(models.Houses, {
            foreignKey: 'areaId'
        });
    };

    return Areas;
};
