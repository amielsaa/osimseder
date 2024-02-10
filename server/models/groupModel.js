// models/groups.js
module.exports = (sequelize, DataTypes) => {
    const Groups = sequelize.define('Groups', {
        GroupID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        GroupMembersIds: DataTypes.STRING,
        HouseID: DataTypes.STRING
    });

    return Groups;
};