// models/groups.js
module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        teamOwnerEmail: {
            type: DataTypes.STRING,
            allowNull: true
        },
        membersCount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });

    Groups.associate = (models) => {
        Groups.hasMany(models.Students, {
            foreignKey: 'groupId',
            allowNull: true
        });

        Groups.belongsTo(models.Schools, {
            foreignKey: 'schoolId',
            allowNull: false
        });

        Groups.belongsTo(models.Houses, {
            foreignKey: 'houseId',
            allowNull: true
        });


    };

    return Groups;
};