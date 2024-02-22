// models/SchoolModel.js
module.exports = (sequelize, DataTypes) => {
    const Schools = sequelize.define('Schools', {
        schoolName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });


    Schools.associate = (models) => {
        Schools.hasMany(models.Students, {
            foreignKey: 'schoolId'
        });

        Schools.hasMany(models.Groups, {
            foreignKey: 'schoolId'
        });

        Schools.belongsTo(models.Areas, {
            foreignKey: 'areaId'
        });

        Schools.belongsTo(models.Cities, {
            foreignKey: 'cityId'
        });

    };


    return Schools;
};
