// models/Tasks.js
module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define('Tasks', {
        type: {
            type: DataTypes.STRING,
            allowNull: false
        },
        taskName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        option: {
            type: DataTypes.STRING,
            allowNull: true
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        freeText: {
            type: DataTypes.STRING,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Houses, {
            foreignKey: 'houseId',
            allowNull: false
        });
    };

    return Tasks;
};
