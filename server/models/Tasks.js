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
            allowNull: false
        },
        room: {
            type: DataTypes.STRING,
            allowNull: false
        },
        freeText: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picBefore: {
            type: DataTypes.STRING,
            allowNull: false
        },
        picAfter: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Tasks.associate = (models) => {
        Tasks.belongsTo(models.Houses, {
            foreignKey: 'houseId'
        });
    };

    return Tasks;
};
