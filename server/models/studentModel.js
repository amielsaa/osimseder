// models/studentModel.js
module.exports = (sequelize, DataTypes) => {
    const Students = sequelize.define('Students', {
        ID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        Email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        LastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        FirstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        PhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        Gender: {
            type: DataTypes.ENUM('Male', 'Female', 'Other', 'Not Relevant'),
            allowNull: false,
        },
        ParentName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ParentPhoneNumber: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ParentEmail: { // TODO YOAV check with Ofir if needed
            type: DataTypes.STRING,
            allowNull: false
        },  
        City: {
            type: DataTypes.ENUM('BSV', 'JRS', 'TLV'),
            allowNull: false,
        },
        School: { // Add more schools as necessary
            type: DataTypes.ENUM('SchoolTest1', 'SchoolTest2', 'SchoolTest3'), 
            allowNull: false
        },
        IssuesChoose: {
            type: DataTypes.ENUM('accessability', 'timing', 'allergy', 'other'),
            allowNull: true
        }, 
        IssuesText: { // free text explaining
            type: DataTypes.STRING,
            allowNull: true

        }, 
        Languages: {
            type: DataTypes.ENUM('English', 'Russian', 'Amharic', 'Arabic', 'French', 'other'),
            allowNull: true
        }, 
        IsInGroup: { // '' for no value, group ID if in
            type: DataTypes.STRING,
            allowNull: false
        }, 
        DidParentApprove: { // TODO YOAV let the student know in screen but don't stop him from doing actions
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });

    return Students;
};


