// models/Cities.js
module.exports = (sequelize, DataTypes) => {
    const Cities = sequelize.define('Cities', {
        cityName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        cityManagerEmail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Cities.associate = (models) => {
        Cities.hasMany(models.Areas, {
            foreignKey: 'cityId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Cities.hasMany(models.Schools, {
            foreignKey: 'cityId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Cities.hasMany(models.Houses, {
            foreignKey: 'cityId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Cities.hasMany(models.Staffs, {
            foreignKey: 'cityId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Cities.hasMany(models.Students, {
            foreignKey: 'cityId',
            allowNull: false,
            onDelete: 'CASCADE'
        });
    };

    return Cities;
};
        