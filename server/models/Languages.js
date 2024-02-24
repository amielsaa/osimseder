// models/Languages.js
module.exports = (sequelize, DataTypes) => {
    const Languages = sequelize.define('Languages', {
        language: {
            type: DataTypes.STRING,
            primaryKey: true
        }
    });
    Languages.associate = (models) => {
        Languages.belongsTo(models.Students, {
            foreignKey: 'studentId',
            primaryKey: true
        });
    };
    return Languages;
};


