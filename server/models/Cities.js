// models/Cities.js
module.exports = (sequelize, DataTypes) => {
    const Cities = sequelize.define('Cities', {
        cityName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cityManagerEmail: {
            type: DataTypes.STRING,
            allowNull: true
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
        