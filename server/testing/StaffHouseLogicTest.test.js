// const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json'); // Assuming you're using a separate configuration for testing
// const sequelizeConfig = require('../jest.config.js'); 
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const StaffHouseLogic = require('../domain/StaffHouseLogic');
const RegistrationLogic = require('../domain/RegistrationLogic');
const LoginLogic = require('../domain/LoginLogic');
// const { Students, Groups, Schools } = require('../models/');
const Students = require('../models/Students');
const Schools = require('../models/Schools');
const Groups = require('../models/Groups');
const Cities = require('../models/Cities');
const Areas = require('../models/Areas');
const Staffs = require('../models/Staffs');
const Houses = require("../models/Houses");
const { sequelize, DataTypes } = require('../SetupTestDatabase'); // Adjust the path accordingly


process.env.NODE_ENV = 'test';
const db = require('../models');
const { database, username, password, host, dialect } = sequelizeConfig.test;



// describe('createHouse', () => {
//   // let sequelize;
//   let student;
//   let group;
//   let school;
//   let city;
//   let area;
//   let staff;
//   let house;


//   beforeEach(async () => {
//       // sequelize = new Sequelize(sequelizeConfig);

//       // Define your Sequelize model
      
//       student = Students(sequelize, DataTypes);
//       group = Groups(sequelize, DataTypes);
//       school = Schools(sequelize, DataTypes);
//       city = Cities(sequelize, DataTypes);
//       area = Areas(sequelize, DataTypes);
//       staff = Staffs(sequelize, DataTypes);
//       house = Houses(sequelize, DataTypes);
//       // Sync all models
//       await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
//   });

//   // afterEach(async () => {
//   //     // Drop all tables
//   //     await sequelize.drop(); // This drops all the tables defined through your models
//   // });


//   describe('createHouse - good', () => {
    
//     it('given address, residentLastName, residentFirstName, residentPhoneNum, languageNeeded, teamOwnerEmail, residentAlternatePhoneNum, residentGender - create a new house', async () => { 
//       const newHouse = {
//           address: "address1",
//           residentLastName: "shlomi",
//           residentFirstName: "vaturi", 
//           residentPhoneNum: "0525555555", 
//           languageNeeded: "amharit",
//           teamOwnerEmail: "amiels@gmail.com",
//           residentAlternatePhoneNum: "0123456789",
//           residentGender: "male"
//       };

//       // const school1 = await db.Schools.create({
//       //     schoolName:"bs",
//       //     schoolId: "1",
//       //     cityId: "1"
//       // })

//       // const group1 = await db.Groups.create({
//       //   teamOwnerEmail:"amiels@gmail.com",
//       //   capacity:4,
//       //   schoolId:1
//       // });
      
//       const result = await StaffHouseLogic.createHouse(
//         newHouse.address,
//         newHouse.residentLastName,
//         newHouse.residentFirstName,
//         newHouse.residentPhoneNum,
//         newHouse.languageNeeded,
//         newHouse.teamOwnerEmail,
//         newHouse.residentAlternatePhoneNum,
//         newHouse.residentGender
//       );
        
//       expect(result).toHaveProperty('id', 1);
//       expect(result).toHaveProperty('address', newHouse.address);
//       expect(result).toHaveProperty('residentLastName', newHouse.residentLastName);
//       expect(result).toHaveProperty('residentFirstName', newHouse.residentFirstName);
//       expect(result).toHaveProperty('residentPhoneNum', newHouse.residentPhoneNum);
//       expect(result).toHaveProperty('languageNeeded', newHouse.languageNeeded);
//       expect(result).toHaveProperty('teamOwnerEmail', newHouse.teamOwnerEmail);
//       expect(result).toHaveProperty('residentAlternatePhoneNum', newHouse.residentAlternatePhoneNum);
//       expect(result).toHaveProperty('residentGender', newHouse.residentGender);

//     }); 
    
    
//     // it('', async () => { 

//     // });

//   });

  
// });

describe('StaffHouseLogic', () => {
  // let staffHouseLogic;
  let student;
  let group;
  let school;
  let city;
  let area;
  let staff;
  let house;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      house = Houses(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });
  

  describe('createHouse', () => {
    it('should create a new house with valid parameters', async () => {
      // Arrange
      const address = "address1";
      const residentLastName = "shlomi";
      const residentFirstName = "vaturi";
      const residentPhoneNum = "0525555555";
      const languageNeeded = "amharit";
      const teamOwnerEmail = "amiels@gmail.com";
      const residentAlternatePhoneNum = "0123456789";
      const residentGender = "male";

      // Act
      const result = await StaffHouseLogic.createHouse(
        address,
        residentLastName,
        residentFirstName,
        residentPhoneNum,
        languageNeeded,
        teamOwnerEmail,
        residentAlternatePhoneNum,
        residentGender
      );

      // Assert
      // expect(result).toBeInstanceOf(Houses);
      expect(result.address).toBe(address);
      expect(result.residentLastName).toBe(residentLastName);
      expect(result.residentFirstName).toBe(residentFirstName);
      expect(result.residentPhoneNum).toBe(residentPhoneNum);
      expect(result.languageNeeded).toBe(languageNeeded);
      expect(result.teamOwnerEmail).toBe(teamOwnerEmail);
      expect(result.residentAlternatePhoneNum).toBe(residentAlternatePhoneNum);
      expect(result.residentGender).toBe(residentGender);
    });

    it('should throw an error if any parameter is undefined', async () => {
      // Arrange
      const address = "address1";
      const residentLastName = "shlomi";
      const residentFirstName = "vaturi";
      const residentPhoneNum = undefined; // Invalid parameter
      const languageNeeded = "amharit";
      const teamOwnerEmail = "amiels@gmail.com";
      const residentAlternatePhoneNum = "0123456789";
      const residentGender = "male";

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.createHouse(
          address,
          residentLastName,
          residentFirstName,
          residentPhoneNum,
          languageNeeded,
          teamOwnerEmail,
          residentAlternatePhoneNum,
          residentGender
        );
      }).rejects.toThrowError('Parameter residentPhoneNum is undefined');
    });

    it('should throw an error if any parameter is null', async () => {
      // Arrange
      const address = "address1";
      const residentLastName = "shlomi";
      const residentFirstName = "vaturi";
      const residentPhoneNum = null; // Invalid parameter
      const languageNeeded = "amharit";
      const teamOwnerEmail = "amiels@gmail.com";
      const residentAlternatePhoneNum = "0123456789";
      const residentGender = "male";

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.createHouse(
          address,
          residentLastName,
          residentFirstName,
          residentPhoneNum,
          languageNeeded,
          teamOwnerEmail,
          residentAlternatePhoneNum,
          residentGender
        );
      }).rejects.toThrowError('Failed to create house: Error: Parameter residentPhoneNum is undefined');
    });
  });

  describe('getAllHousesOfCity', () => {
    it('should return all houses of a city for a valid staff email (access C)', async () => {
      // Arrange
      
      const staffEmail = 'amiels@gmail.com';
      const staffPassword = '123456';
      const staffLastName = 'to';
      const staffFirstName = 'amiel';
      const staffPhoneNumber = '0549552120';
      const staffGender = 'Male';
      const staffAccesses = 'C';
    
      const staffUser = await db.Staffs.create({
        "email": staffEmail,
        "password": staffPassword,
        "lastName": staffLastName,
        "firstName": staffFirstName,
        "phoneNumber": staffPhoneNumber,
        "gender": staffGender,
        // "verificationToken": verificationToken,
        "isVerified": false,
        "accesses": staffAccesses,
        "cityId": 1
      });

      const address = "address1";
      const residentLastName = "shlomi";
      const residentFirstName = "vaturi";
      const residentPhoneNum = "0565656565";
      const languageNeeded = "amharit";
      const teamOwnerEmail = "amiels@gmail.com";
      const residentAlternatePhoneNum = "0123456789";
      const residentGender = "male";

      const newHouse = await db.Houses.create({
        teamOwnerEmail: teamOwnerEmail,
        address: address,
        residentLastName:residentLastName,
        residentFirstName: residentFirstName,
        residentPhoneNum: residentPhoneNum,
        residentAlternatePhoneNum: residentAlternatePhoneNum,
        residentGender: residentGender,
        languageNeeded: languageNeeded
      });
    });
    
      it('should throw an error if the staff user is not found', async () => {
        // Arrange
        const userEmail = "nonexistentuser@example.com";

        // Act & Assert
        await expect(async () => {
          await StaffHouseLogic.getAllHousesOfCity(userEmail);
        }).rejects.toThrowError('Couldn\'t find a staff user.');
      });
  });

  describe('getAllHousesOfTeamOwner', () => {
    it('should return all houses of a team owner for a valid user email', async () => {
      // Arrange
      const userEmail = "user@example.com";

      // Act
      const result = await StaffHouseLogic.getAllHousesOfTeamOwner(userEmail);

      // Assert
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Houses);
    });
  

     

    it('should throw an error if the staff user is not found', async () => {
      // Arrange
      const userEmail = "nonexistentuser@example.com";

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.getAllHousesOfCity(userEmail);
      }).rejects.toThrowError('Couldn\'t find a staff user.');
    });
  });
  

  describe('getAllHousesOfTeamOwner', () => {
    it('should return all houses of a team owner for a valid user email', async () => {
      // Arrange
      const userEmail = "user@example.com";

      // Act
      const result = await StaffHouseLogic.getAllHousesOfTeamOwner(userEmail);

      // Assert
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBeInstanceOf(Houses);
    });

    it('should throw an error if no houses are found for the team owner', async () => {
      // Arrange
      const userEmail = "userwithoutanyhouses@example.com";

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.getAllHousesOfTeamOwner(userEmail);
      }).rejects.toThrowError('Couldn\'t find houses.');
    });
  });

  describe('getHouseById', () => {
    it('should return the house with the specified ID', async () => {
      // Arrange
      const houseId = 1;

      // Act
      const result = await StaffHouseLogic.getHouseById(houseId);

      // Assert
      expect(result).toBeInstanceOf(Houses);
      expect(result.id).toBe(houseId);
    });

    it('should throw an error if no house is found with the specified ID', async () => {
      // Arrange
      const houseId = 999; // Invalid ID

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.getHouseById(houseId);
      }).rejects.toThrowError('Couldn\'t get house with that ID.');
    });

    it('should throw an error if the house ID is undefined', async () => {
      // Arrange
      const houseId = undefined; // Invalid ID

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.getHouseById(houseId);
      }).rejects.toThrowError('Parameter houseId is undefined');
    });
  });

  describe('deleteHouse', () => {
    it('should delete the house with the specified ID', async () => {
      // Arrange
      const houseId = 1;

      // Act
      const result = await StaffHouseLogic.deleteHouse(houseId);

      // Assert
      expect(result).toEqual({ success: true, message: 'House deleted successfully' });
    });

    it('should throw an error if no house is found with the specified ID', async () => {
      // Arrange
      const houseId = 999; // Invalid ID

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.deleteHouse(houseId);
      }).rejects.toThrowError('Couldn\'t get house with that ID.');
    });

    it('should throw an error if the house ID is undefined', async () => {
      // Arrange
      const houseId = undefined; // Invalid ID

      // Act & Assert
      await expect(async () => {
        await StaffHouseLogic.deleteHouse(houseId);
      }).rejects.toThrowError('Parameter houseId is undefined');
    });
  });
});
