// models/SchoolModel.js
module.exports = (sequelize, DataTypes) => {
    const Schools = sequelize.define('Schools', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
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
    };


    return Schools;
};
