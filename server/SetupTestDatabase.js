// SetupTestDatabase.js
const { Sequelize } = require('sequelize');
const { exec } = require('child_process');

// Import Sequelize configuration
const sequelizeConfig = require('./config/config.json');

// Use the "test" environment configuration
const { database, username, password, host, dialect } = sequelizeConfig.test;

// Create a Sequelize instance for the "test" environment
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  // logging: false, // Suppress Sequelize logging
});

// Run Sequelize migrations before running tests
beforeAll(async () => {
  // Run migrations using Sequelize CLI
  await new Promise((resolve, reject) => {
    exec('npx sequelize-cli db:migrate --env test', (error, stdout, stderr) => {
      console.log(`Migration output: ${stdout}`);
      if (error) {
        console.error(`Migration errors: ${stderr}`);
        reject(error);
        return;
      }
      if (stdout.includes('No migrations were executed')) {
        console.log('No migrations were executed, database schema was already up to date.');
      }
      resolve();
    });
  });
});

// Close the Sequelize connection after all tests
afterAll(async () => {
  await sequelize.close();
});
