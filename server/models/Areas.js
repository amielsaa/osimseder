// models/Area.js
module.exports = (sequelize, DataTypes) => {
    const Areas = sequelize.define('Areas', {
        areaName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        areaManagerEmail: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Areas.associate = (models) => {
        Areas.hasMany(models.Schools, {
            foreignKey: 'areaId'
        });

        Areas.belongsTo(models.Cities, {
            foreignKey: 'cityId'
        });
    };

    return Areas;
};
