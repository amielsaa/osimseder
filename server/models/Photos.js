// models/Photos.js
module.exports = (sequelize, DataTypes) => {
    const Photos = sequelize.define('Photos', {
        photoName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photoPath: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Photos.associate = (models) => {
        Photos.belongsTo(models.Houses, {
            foreignKey: 'houseId',
            allowNull: false
        });
    };

    return Photos;
};
