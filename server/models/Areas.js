// models/Area.js
module.exports = (sequelize, DataTypes) => {
    const Areas = sequelize.define('Areas', {
        areaName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        areaManagerEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Areas.associate = (models) => {
        Areas.hasMany(models.Houses, {
            foreignKey: 'areaId',
            allowNull: false
        });

        Areas.belongsTo(models.Cities, {
            foreignKey: 'cityId',
            allowNull: false
        });
    };

    return Areas;
};
