// models/Area.js
module.exports = (sequelize, DataTypes) => {
    const Areas = sequelize.define('Areas', {
        areaName: {
            type: DataTypes.STRING,
            allowNull: false,
            // Custom validation function to ensure uniqueness of areaName within the same city
            validate: {
                isUniquePerCity: async function () {
                    const existingArea = await Areas.findOne({
                        where: {
                            areaName: this.areaName,
                            cityId: this.cityId
                        }
                    });
                    if (existingArea) {
                        throw new Error('Area name must be unique within the same city');
                    }
                }
            }
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
