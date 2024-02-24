'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Groups', {
        ID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        groupName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        teamOwnerId: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Groups');
  }
};
