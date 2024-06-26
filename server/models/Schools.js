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
            foreignKey: 'schoolId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Schools.hasMany(models.Groups, {
            foreignKey: 'schoolId',
            allowNull: false,
            onDelete: 'CASCADE'
        });

        Schools.belongsTo(models.Cities, {
            foreignKey: 'cityId',
            allowNull: false
        });

    };


    return Schools;
};
