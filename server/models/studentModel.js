// models/studentModel.js
module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
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
        parentEmail: { // TODO YOAV check with Ofir if needed
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
        didParentApprove: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.BOOLEAN,
            allowNull: false
        }, 
        verificationToken: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.STRING,
            allowNull: true
        }
    });


    return Students;
};


