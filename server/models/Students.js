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
        issuesText: { // "is there anything we should know about? (accessability issues, timimng, allergies, diet, etc..)
            type: DataTypes.STRING,
            allowNull: true
        },
        verificationToken: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.STRING,
            allowNull: true
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    Students.associate = (models) => {
        Students.hasMany(models.Languages, {
            foreignKey: 'languageId',
            allowNull: false
        })
        Students.belongsTo(models.Cities, {
            foreignKey: 'cityId',
            allowNull: false
        });
        Students.belongsTo(models.Schools, {
            foreignKey: 'schoolId',
            allowNull: false
        });
        Students.belongsTo(models.Groups, {
            foreignKey: 'groupId',
            allowNull: true
        });
    };


    return Students;
};


