// models/groups.js
module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamOwnerId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Groups.associate = (models) => {
        Groups.hasMany(models.Students, {
            foreignKey: 'groupId'
        });

        Groups.hasOne(models.Houses, {
            foreignKey: 'groupId'
        });
    };

    return Groups;
};