// const { Sequelize, DataTypes } = require('sequelize');
const sequelizeConfig = require('../config/config.json'); // Assuming you're using a separate configuration for testing
// const sequelizeConfig = require('../jest.config.js'); 
// const { LoginLogic, RegistrationLogic, GroupLogic } = require('../domain');
const StaffGroupLogic = require('../domain/StaffGroupLogic');
const RegistrationLogic = require('../domain/RegistrationLogic');
const LoginLogic = require('../domain/LoginLogic');
// const { Students, Groups, Schools } = require('../models/');
const Students = require('../models/Students');
const Schools = require('../models/Schools');
const Groups = require('../models/Groups');
const Cities = require('../models/Cities');
const Areas = require('../models/Areas');
const Staffs = require('../models/Staffs');
// const { sequelize, Cities, Areas, Schools, Houses, Staffs, Students } = require('../models/');
// const { sequelize } = require('../models/index');
const { sequelize, DataTypes } = require('../SetupTestDatabase'); // Adjust the path accordingly






// TODO: clean up routes (move all logic to back):
//       make sure all functions returns the same dict






process.env.NODE_ENV = 'test';
const db = require('../models');

// Import Sequelize configuration
// const sequelizeConfig = require('./config/config.json');

// Use the "test" environment configuration
const { database, username, password, host, dialect } = sequelizeConfig.test;

// Create a Sequelize instance for the "test" environment
// const sequelize = require('../SetupTestDatabase');

// Create a Sequelize instance for the "test" environment
// const sequelize = new Sequelize(database, username, password, {
//   host,
//   dialect,
//   logging: false, // Suppress Sequelize logging to keep test output clean
// });

describe('getAllGroupsBySchool', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;
  let area;
  let staff;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getAllGroupsBySchool - good', () => {
    it('given 0 groups, return empty list', async () => {  
      const studentPassword = "password123";
      await db.Cities.create({
          cityName: 'JRS',
          cityManagerEmail: 'amieljrs@gmail.com'
      })

      const createdSchool = await db.Schools.create({
        schoolName: "school1",
        schoolId: "1",
        cityId: "1"
      });
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })

      // // Call the function under test and await its result
      const result = await StaffGroupLogic.getAllGroupsBySchool(createdSchool.id);
      
      // // Assertions
      expect(result).toEqual([]);
      
    }); 
    it('given 1 school and 2 groups, return 2 groups', async () => {  
      const studentPassword = "password123";
      await db.Cities.create({
          cityName: 'JRS',
          cityManagerEmail: 'amieljrs@gmail.com'
      })

      const createdSchool = await db.Schools.create({
        schoolName: "school1",
        schoolId: "1",
        cityId: "1"
      });
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })


      const groupWithSchool1 = await db.Groups.create({
          teamOwnerEmail: "mashu@g.com",
          capacity: 1,
          schoolId: createdSchool.id 
      });

      const groupWithSchool2 = await db.Groups.create({
          teamOwnerEmail: "mashuaher@g.com",
          capacity: 2,
          schoolId: createdSchool.id 
      });
      
      const groupWithSchool3 = await db.Groups.create({
          teamOwnerEmail: "wrong@g.com",
          capacity: 5
      });
      
      // // Call the function under test and await its result
      const result = await StaffGroupLogic.getAllGroupsBySchool(createdSchool.id);
      
      // // Assertions
      expect(result[0]).toHaveProperty('capacity', 1);
      expect(result[0]).toHaveProperty('teamOwnerEmail', 'mashu@g.com');
      expect(result[0]).toHaveProperty('schoolId', 1);
      expect(result[1]).toHaveProperty('capacity', 2);
      expect(result[1]).toHaveProperty('teamOwnerEmail', 'mashuaher@g.com');
      expect(result[1]).toHaveProperty('schoolId', 1);
    }); 

  });

  describe('getAllGroupsBySchool - bad', () => {
    it('bad schoolId', async () => {  
      const studentPassword = "password123";
      await db.Cities.create({
          cityName: 'JRS',
          cityManagerEmail: 'amieljrs@gmail.com'
      })

      const createdSchool = await db.Schools.create({
        schoolName: "school1",
        schoolId: "1",
        cityId: "1"
      });
      const newStudent = await RegistrationLogic.registerStudent({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false
      })

      const groupWithSchool1 = await db.Groups.create({
          teamOwnerEmail: "mashu@g.com",
          capacity: 1,
          schoolId: createdSchool.id 
      });

      const groupWithSchool2 = await db.Groups.create({
          teamOwnerEmail: "mashuaher@g.com",
          capacity: 2,
          schoolId: createdSchool.id 
      });
      
      const groupWithSchool3 = await db.Groups.create({
          teamOwnerEmail: "wrong@g.com",
          capacity: 5
      });
      
      // // Call the function under test and await its result
      const result = await StaffGroupLogic.getAllGroupsBySchool(5);
      
      // // Assertions
      expect(result).toEqual([]);
    });      
    
  });


});

describe('getGroupById', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getGroupById - good', () => {
    it('given 1 group with id 1 - return it', async () => {  
      const studentPassword = "password123";
      const newStudent = await db.Students.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        parentName: "itzik",
        parentPhoneNumber: "0529875509",
        parentEmail: "mashu@mashu.com",
        city: "JRS",
        school: "school1",
        issuesChoose: "Accessability",
        issuesText: "idk1",
        languages: "English",
        isInGroup: '',
        didParentApprove: false,
        isVerified : false
      })

      // const createdSchool = await db.Schools.create({schoolName: "school1"});
      await db.Cities.create({
          cityName: 'BSV',
          cityManagerEmail: 'amielbsv@gmail.com'
      })
      await db.Schools.create({
          schoolName:"bs",
          schoolId: "1",
          cityId: "1"
      })
      const groupWithSchool1 = await db.Groups.create({
          teamOwnerEmail: "mashu@g.com",
          capacity: 1,
          schoolId:1
      });

      // // Call the function under test and await its result
      const result = await StaffGroupLogic.getGroupById(groupWithSchool1.id);
      
      // // Assertions
      expect(result).toHaveProperty('id', groupWithSchool1.id);
      expect(result).toHaveProperty('capacity', groupWithSchool1.capacity);
      
    }); 

  });

  describe('getGroupById - bad', () => {
    it('bad groupId', async () => {  
      await expect(StaffGroupLogic.getGroupById(5))
        .rejects.toThrowError(/Group not found/);
    });      
    
  });


});

// ------------------------------------------------------------------------

describe('createGroup', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;
  let area;
  let staff;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

//   afterEach(async () => {
//       // Drop all tables
//       await sequelize.drop(); // This drops all the tables defined through your models
//   });


  describe('createGroup - good', () => {
    it('given a school, creates a group successfully for that school', async () => { 
      const resultList = [];
      
      const newSchool = await db.Schools.create({
        schoolName: "school1"
      });

      for(let i=1; i<=10; i++) { 
        resultList[i-1] = await StaffGroupLogic.createGroup(i, newSchool.id);
      }
      // // Assertions
      for(let i=1; i<=10; i++) { 
        expect(resultList[i-1]).toHaveProperty('id', i);
        expect(resultList[i-1]).toHaveProperty('students', []);
        // expect(resultList[i-1]).toHaveProperty('membersCount', i);
        // expect(resultList[i-1]).toHaveProperty('schoolId', newSchool.id);
        /*
        

        */
      }
      
      
    }); 

    
  });

  describe('createGroup - bad', () => {
    
    
    it('zero groupSize', async () => {  
      const newSchool = await db.Schools.create({
        schoolName: "school1"
      });
      await expect(StaffGroupLogic.createGroup(0, newSchool.id))
        .rejects.toThrowError(/Failed to create group: Error: Group size can't be negative or 0./);
    });
    
    it('null groupSize', async () => {  
      const newSchool = await db.Schools.create({
        schoolName: "school1"
      });
      await expect(StaffGroupLogic.createGroup(null, newSchool.id))
        .rejects.toThrowError(/Failed to create group: Error: Group size and school ID can't be null/);
    });

    it('negative groupSize', async () => {  
      const newSchool = await db.Schools.create({
        schoolName: "school1"
      });
      for(let i=1; i<=10; i++) { 
        await expect(StaffGroupLogic.createGroup(-1, newSchool.id))
          .rejects.toThrowError(/Failed to create group: Error: Group size can't be negative or 0./);
        }
    });
      
    it('schoolId doesnt exist', async () => {  
      const newSchool = await db.Schools.create({
        schoolName: "school1"
      });

      await expect(StaffGroupLogic.createGroup(3, newSchool.id + 1))
        .rejects.toThrowError(/Failed to create group: Error: School doesn't exist./);

    });

  });


});

describe('getGroupsByTeamOwner', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;
  let area;
  let staff;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getGroupsByTeamOwner - good', () => {
    it('given a team owner and a group he manages - get group', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 4
      });
      
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      expect(result[0]).toHaveProperty('id', 1);
    //   expect(result[0]).toHaveProperty('teamOwnerEmail', newStaff1.email);
      expect(result[0]).toHaveProperty('students', []);

    }); 
    it('given a team owner and a several group he manages - get all his groups', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      for(let i=0; i<3; i++) {
        expect(result[i]).toHaveProperty('id', i+1);
        // expect(result[i]).toHaveProperty('teamOwnerEmail', newStaff1.email);
        expect(result[i]).toHaveProperty('students', []);
      }

    }); 

    it('given a team owner and a several group he manages - when get group by another team manager - return undefined', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const newStaff2 = await db.Staffs.create({
        email: "test1@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      // const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff2.email);

      expect(result[0]).toEqual(undefined);
      
    }); 
    
  });

  describe('getGroupsByTeamOwner - bad', () => {

    it('teamOwner is null - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(null))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });

    it('teamOwner is undefined - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(undefined))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });
  });
});

describe('getGroupsByAreaManager', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;
  let area;
  let staff;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getGroupsByTeamOwner - good', () => {
    it('given a team owner and a group he manages - get group', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 4
      });
      
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      expect(result[0]).toHaveProperty('id', 1);
    //   expect(result[0]).toHaveProperty('teamOwnerEmail', newStaff1.email);
      expect(result[0]).toHaveProperty('students', []);

    }); 
    it('given a team owner and a several group he manages - get all his groups', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      for(let i=0; i<3; i++) {
        expect(result[i]).toHaveProperty('id', i+1);
        // expect(result[i]).toHaveProperty('teamOwnerEmail', newStaff1.email);
        expect(result[i]).toHaveProperty('students', []);
      }

    }); 

    it('given a team owner and a several group he manages - when get group by another team manager - return undefined', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const newStaff2 = await db.Staffs.create({
        email: "test1@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      // const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff2.email);

      expect(result[0]).toEqual(undefined);
      
    }); 
    
  });

  describe('getGroupsByTeamOwner - bad', () => {

    it('teamOwner is null - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(null))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });

    it('teamOwner is undefined - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(undefined))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });
  });
});

describe('getSchoolsByCity', () => {
  // let sequelize;
  let student;
  let group;
  let school
  let city;
  let area;
  let staff;


  beforeEach(async () => {
      // sequelize = new Sequelize(sequelizeConfig);

      // Define your Sequelize model
      
      student = Students(sequelize, DataTypes);
      group = Groups(sequelize, DataTypes);
      school = Schools(sequelize, DataTypes);
      city = Cities(sequelize, DataTypes);
      area = Areas(sequelize, DataTypes);
      staff = Staffs(sequelize, DataTypes);
      // Sync all models
      await db.sequelize.sync({ force: true }); // This creates the table, dropping it first if it already existed
  });

  // afterEach(async () => {
  //     // Drop all tables
  //     await sequelize.drop(); // This drops all the tables defined through your models
  // });


  describe('getSchoolsByCity - good', () => {
    it('given a city name and a school assigned to it - get school', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 4
      });
      
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      expect(result[0]).toHaveProperty('id', 1);
    //   expect(result[0]).toHaveProperty('teamOwnerEmail', newStaff1.email);
      expect(result[0]).toHaveProperty('students', []);

    }); 
    
    /*
    it('given a team owner and a several group he manages - get all his groups', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff1.email);

      for(let i=0; i<3; i++) {
        expect(result[i]).toHaveProperty('id', i+1);
        // expect(result[i]).toHaveProperty('teamOwnerEmail', newStaff1.email);
        expect(result[i]).toHaveProperty('students', []);
      }

    }); 

    it('given a team owner and a several group he manages - when get group by another team manager - return undefined', async () => { 
      const newStaff1 = await db.Staffs.create({
        email: "test@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const newStaff2 = await db.Staffs.create({
        email: "test1@example.com",
        password: "password123",      
        lastName: "lastname",
        firstName: "firstname",
        phoneNumber: "0524587746",
        gender: "Male",
        city: "JRS",
        accesses: "B",
        isVerified: false
      });
      const group1 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 1
      });
      
      const group2 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 2
      });

      const group3 = await db.Groups.create({
          teamOwnerEmail: newStaff1.email,
          capacity: 3
      });
      // const groups = [group1, group2, group3];
      const result = await StaffGroupLogic.getGroupsByTeamOwner(newStaff2.email);

      expect(result[0]).toEqual(undefined);
      
    }); 
    */

  });

  /*
  describe('getSchoolsByCity - bad', () => {

    it('teamOwner is null - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(null))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });

    it('teamOwner is undefined - throws error', async () => {  
      await expect(StaffGroupLogic.getGroupsByTeamOwner(undefined))
        .rejects.toThrowError(/Failed to find an area by team owner: Error: Team owner email is null./);
    });
  });
  */
 
});
