// setupTestDatabase.js
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
});

// Run Sequelize migrations before running tests
beforeAll(async () => {
  // Run migrations using Sequelize CLI
  await new Promise((resolve, reject) => {
    exec('npx sequelize-cli db:migrate --env test', (error, stdout, stderr) => {
      if (error) {
        console.error(`Migration failed: ${error.message}`);
        reject(error);
        return;
      }
      console.log(`Migration output: ${stdout}`);
      console.error(`Migration errors: ${stderr}`);
      resolve();
    });
  });
});

// Close the Sequelize connection after all tests
afterAll(async () => {
  await sequelize.close();
});
