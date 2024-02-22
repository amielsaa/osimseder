// models/Student.js
module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        parentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parentPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        issuesChoose: {
            type: DataTypes.STRING,
            allowNull: true
        }, 
        issuesText: { // free text explaining
            type: DataTypes.STRING,
            allowNull: true
        }, 
        languages: {
            type: DataTypes.STRING,
            allowNull: true
        },
        verificationToken: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    Students.associate = (models) => {
        Students.belongsTo(models.Cities, {
            foreignKey: 'cityId'
        });
        Students.belongsTo(models.Schools, {
            foreignKey: 'schoolId'
        });
        Students.belongsTo(models.Groups, {
            foreignKey: 'groupId'
        });
    };


    return Students;
};


