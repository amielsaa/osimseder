// const { Sequelize } = require('sequelize');
// const { exec } = require('child_process');

// // Ensure the NODE_ENV is set to 'test'. This is crucial for protecting non-test environments.
// process.env.NODE_ENV = 'test';

// // Import Sequelize configuration
// const sequelizeConfig = require('./config/config.json');

// // Use the "test" environment configuration
// const { database, username, password, host, dialect } = sequelizeConfig.test;

// // Create a Sequelize instance for the "test" environment
// const sequelize = new Sequelize(database, username, password, {
//   host,
//   dialect,
//   logging: false, // Suppress Sequelize logging to keep test output clean
// });

// // Run Sequelize migrations before running tests
// beforeAll(async () => {
//   // Run migrations using Sequelize CLI specifically for the 'test' environment
//   await new Promise((resolve, reject) => {
//     exec('npx sequelize-cli db:migrate --env test', (error, stdout, stderr) => {
//       console.log(`Migration output: ${stdout}`);
//       if (error) {
//         console.error(`Migration errors: ${stderr}`);
//         reject(error);
//         return;
//       }
//       if (stdout.includes('No migrations were executed')) {
//         console.log('No migrations were executed, database schema was already up to date.');
//       }
//       resolve();
//     });
//   });
// });

// // Close the Sequelize connection after all tests
// afterAll(async () => {
//   await sequelize.close();
// });

// testsetup.js
const { Sequelize, DataTypes } = require('sequelize');
const { exec } = require('child_process');

// Ensure the NODE_ENV is set to 'test'.
process.env.NODE_ENV = 'test';

// Import Sequelize configuration
const sequelizeConfig = require('./config/config.json');

// Use the "test" environment configuration
const { database, username, password, host, dialect } = sequelizeConfig.test;

// Create a Sequelize instance for the "test" environment
const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false, // Suppress Sequelize logging to keep test output clean
});

// Define your Sequelize models
// const Students = require('./models/Student')(sequelize, DataTypes);
// const Schools = require('./models/School')(sequelize, DataTypes);
// const Groups = require('./models/Group')(sequelize, DataTypes);
// const Cities = require('./models/City')(sequelize, DataTypes);

// Sync all models to create tables
beforeAll(async () => {
  await sequelize.sync({ force: true }); // This creates the tables, dropping them first if they already existed
});

// Close the Sequelize connection after all tests
afterAll(async () => {
  await sequelize.close();
});

module.exports = { sequelize, DataTypes };
