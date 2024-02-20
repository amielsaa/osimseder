'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Students', {
      ID: {
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
          type: DataTypes.ENUM('Male', 'Female', 'Other', 'Not Relevant'),
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
      city: {
          type: DataTypes.ENUM('BSV', 'JRS', 'TLV'),
          allowNull: false,
      },
      school: { // Add more schools as necessary
          type: DataTypes.ENUM('SchoolTest1', 'SchoolTest2', 'SchoolTest3'), 
          allowNull: false
      },
      issuesChoose: {
          type: DataTypes.ENUM('Accessability', 'Timing', 'Allergy', 'Other'),
          allowNull: true
      }, 
      issuesText: { // free text explaining
          type: DataTypes.STRING,
          allowNull: true

      }, 
      languages: {
          type: DataTypes.ENUM('English', 'Russian', 'Amharic', 'Arabic', 'French', 'other'),
          allowNull: true
      }, 
      isInGroup: { // '' for no value, group ID if in
          type: DataTypes.STRING,
          allowNull: false
      }, 
      didParentApprove: { // TODO YOAV let the student know in screen but don't stop him from doing actions
          type: DataTypes.BOOLEAN,
          allowNull: false
      },
      // Define other columns based on the model...
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Students');
  }
};
