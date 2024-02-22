// models/groups.js
module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        teamOwnerEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        membersCount: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });

    Groups.associate = (models) => {
        Groups.hasMany(models.Students, {
            foreignKey: 'groupId'
        });

        Groups.belongsTo(models.Schools, {
            foreignKey: 'schoolId'
        });

        Groups.belongsTo(models.Houses, {
            foreignKey: 'houseId'
        });


    };

    return Groups;
};