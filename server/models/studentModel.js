// models/students.js
module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
        ID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        PhoneNumber: DataTypes.STRING,
        Password: DataTypes.STRING,
        LastName: DataTypes.STRING,
        FirstName: DataTypes.STRING,
        Gender: DataTypes.ENUM('Male', 'Female', 'Other', 'Not Relevant'),
        ParentName: DataTypes.STRING,
        ParentPhoneNumber: DataTypes.STRING,
        ParentEmail: DataTypes.STRING,  // TODO YOAV check with Ofir if needed
        City: DataTypes.ENUM('BSV','JRS', 'TLV'),
        School: DataTypes.ENUM('SchoolTest1', 'SchoolTest2', 'SchoolTest3'), // Add more schools as necessary
        IssuesChoose: DataTypes.TEXT, // accessability, timing, allergy
        IssuesText: DataTypes.TEXT, // free text explaining
        Languages: DataTypes.ENUM('English', 'Russian', 'Amharic', 'Arabic', 'French', 'other'),
        IsInGroup: DataTypes.STRING, // '' for no value, group ID if in
        DidParentApprove: DataTypes.BOOLEAN // TODO YOAV let the student know in screen but don't stop him from doing actions
    });

    return Student;
};


