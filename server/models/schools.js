// models/schools.js
module.exports = (sequelize, DataTypes) => {
    const Schools = sequelize.define('Schools', {
        SchoolID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        SchoolName: DataTypes.STRING,
        AreaID: DataTypes.STRING,
        AreaName: DataTypes.STRING,
        CityID: DataTypes.STRING,
        CityName: DataTypes.STRING
    });

    return Schools;
};
