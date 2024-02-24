'use strict';

const { DataTypes } = require('sequelize');

module.exports = {
    up: async (queryInterface, Sequelize) => {
      // Add column 'cityId' to 'Areas'
      await queryInterface.addColumn('Areas', 'cityId', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  
      // Add column 'cityId' to 'Schools'
      await queryInterface.addColumn('Schools', 'cityId', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  
      // Add column 'cityId' to 'Houses'
      await queryInterface.addColumn('Houses', 'cityId', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  
      // Add column 'cityId' to 'Staffs'
      await queryInterface.addColumn('Staffs', 'cityId', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
  
      // Add column 'cityId' to 'Students'
      await queryInterface.addColumn('Students', 'cityId', {
        type: DataTypes.INTEGER,
        references: {
          model: 'Cities',
          key: 'ID',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      });
    },
  
    down: async (queryInterface, Sequelize) => {
      // Remove column 'cityId' from 'Areas'
      await queryInterface.removeColumn('Areas', 'cityId');
  
      // Remove column 'cityId' from 'Schools'
      await queryInterface.removeColumn('Schools', 'cityId');
  
      // Remove column 'cityId' from 'Houses'
      await queryInterface.removeColumn('Houses', 'cityId');
  
      // Remove column 'cityId' from 'Staffs'
      await queryInterface.removeColumn('Staffs', 'cityId');
  
      // Remove column 'cityId' from 'Students'
      await queryInterface.removeColumn('Students', 'cityId');
    }
  };
  