const express = require('express');
const router = express.Router();

const {Cities, Areas, Groups, Houses, Schools, Tasks} = require('../../models/');
const registrationLogic = require('../../domain/RegistrationLogic');
router.post('/testSetup', async (req,res) => {
    try{
        await setupCities();
        await setupAreas();
        await setupSchools();
        await setupGroups(); // Add this line to call the new setupGroups function
        await setupStudents();
        await setupStaffs();
        await setupHouses(); // Add this line to call the new setupHouses function
        await setupTasks(); // Add this line to call the new setupTasks function


        res.json('DONE')

    }catch(error) {
        res.json(error);
    }
})

const setupCities = async () => {
    await Cities.create({
        cityName: 'באר שבע',
        cityManagerEmail: 'amielbsv@gmail.com'
    })
    await Cities.create({
        cityName: 'ירושלים',
        cityManagerEmail: 'amieljrs@gmail.com'
    })
}

const setupAreas = async () => {
    await Areas.create({
        areaName:'באר שבע - מזרח',
        areaManagerEmail: 'amieleastbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'באר שבע - מערב',
        areaManagerEmail: 'amielwestbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'ירושלים - מזרח',
        areaManagerEmail: 'amieleastjrs@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName:'ירושלים - מערב',
        areaManagerEmail: 'amielwestjrs@gmail.com',
        cityId: '2'
    })
    
}

const setupSchools = async () => {
    await Schools.create({
        schoolName: 'מקיף א ב"ש',
        schoolId: "1",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'מקיף ב ב"ש',
        schoolId: "2",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'אורט ירושלים',
        schoolId: "3",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'נווה ציון ירושלים',
        schoolId: "4",
        cityId: "2"
    })
}


const setupStudents = async () => {
    //students
    createdUser = await registrationLogic.registerStudent({
        email: "student1@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד1",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "באר שבע",
        school: 'מקיף א ב"ש',
        extraLanguage: "ספרדית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student2@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד2",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "אלרגי לחתולים",
        city: "באר שבע",
        school: 'מקיף א ב"ש',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null, groupId: 1 });

    createdUser = await registrationLogic.registerStudent({
        email: "student3@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד3",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "באר שבע",
        school: 'מקיף א ב"ש',
        extraLanguage: "רוסית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null, groupId: 2});

    createdUser = await registrationLogic.registerStudent({
        email: "student4@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד4",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "באר שבע",
        school: 'מקיף א ב"ש',
        extraLanguage: "ספרדית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null, groupId: 2});

    createdUser = await registrationLogic.registerStudent({
        email: "student5@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד5",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "באר שבע",
        school: 'מקיף ב ב"ש',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student6@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד6",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "באר שבע",
        school: 'מקיף ב ב"ש',
        extraLanguage: "רוסית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student7@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד7",
        phoneNumber: "0548552120",
        gender: "אחר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "ירושלים",
        school: 'אורט ירושלים',
        extraLanguage: "ספרדית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student8@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד8",
        phoneNumber: "0548552120",
        gender: "אחר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "צריך לסיים מוקדם",
        city: "ירושלים",
        school: 'אורט ירושלים',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student9@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד9",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "ירושלים",
        school: 'אורט ירושלים',
        extraLanguage: "רוסית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student10@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד10",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "ירושלים",
        school: 'נווה ציון ירושלים',
        extraLanguage: "ספרדית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student11@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד11",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "אלרגי לחתולים",
        city: "ירושלים",
        school: 'נווה ציון ירושלים',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student12@gmail.com",
        password: "validP1!",
        lastName: "משפחה",
        firstName: "תלמיד12",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "ירושלים",
        school: 'נווה ציון ירושלים',
        extraLanguage: "ערבית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

}
const setupStaffs = async () => {
    //team owners
    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner1@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה1',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'TeamOwner',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner2@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה2',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'TeamOwner',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner3@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה3',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'TeamOwner',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner4@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה4',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'TeamOwner',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner5@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה5',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'TeamOwner',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner6@gmail.com',
        password: 'validP1!',
        lastName: 'קבוצה6',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'TeamOwner',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //area managers
    createdUser = await registrationLogic.registerStaff({
        email: 'amieleastbsv@gmail.com',
        password: 'validP1!',
        lastName: 'מזרח-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'AreaManager',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielwestbsv@gmail.com',
        password: 'validP1!',
        lastName: 'מערב-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'AreaManager',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amieleastjrs@gmail.com',
        password: 'validP1!',
        lastName: 'מזרח-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'AreaManager',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielwestjrs@gmail.com',
        password: 'validP1!',
        lastName: 'מערב-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'AreaManager',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //city managers
    createdUser = await registrationLogic.registerStaff({
        email: 'amieljrs@gmail.com',
        password: 'validP1!',
        lastName: 'מנהל-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'CityManager',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielbsv@gmail.com',
        password: 'validP1!',
        lastName: 'מנהל-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'CityManager',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //admin
    createdUser = await registrationLogic.registerStaff({
        email: 'admin@gmail.com',
        password: 'validP1!',
        lastName: 'מלך',
        firstName: 'אדמין',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'Admin',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

}

const setupGroups = async () => {
    await Groups.create({
        capacity: 2,
        schoolId: 1,
        houseId: null
    });
    await Groups.create({
        capacity: 2,
        schoolId: 1,
        houseId: null
    });
    await Groups.create({
        capacity: 2,
        schoolId: 2,
        houseId: null
    });
}

const setupHouses = async () => {
    await Houses.create({
        teamOwnerEmail: 'teamOwner1@gmail.com',
        teamOwnerEmail_2: 'teamOwner2@gmail.com',
        address: '123 Main St',
        residentLastName: 'Doe',
        residentFirstName: 'John',
        residentPhoneNum: '0505050505',
        residentAlternatePhoneNum: '0505050505',
        residentGender: 'זכר',
        languageNeeded: 'ספרדית',
        numberOfRooms: '3',
        membersNeeded: '5',
        freeText: 'Needs urgent attention',
        areaId: 1,
        cityId: 1
    });

    // Allocate group1 to this house
    const house = await Houses.findOne({ where: { address: '123 Main St' } });
    await Groups.update({ houseId: house.id }, { where: { id: 1 } });
};

const setupTasks = async () => {
    const house = await Houses.findOne({ where: { address: '123 Main St' } });
    await Tasks.create({
        type: 'ניקיון',
        room: 'Living Room',
        freeText: 'Sweep and mop the floor',
        status: 'Pending',
        houseId: house.id
    });
    await Tasks.create({
        type: 'צביעה',
        room: 'Bedroom',
        freeText: 'Paint the walls blue',
        status: 'Pending',
        houseId: house.id
    });
    await Tasks.create({
        type: 'אחר',
        room: 'Bathroom',
        freeText: 'Fix the leaking faucet',
        status: 'In Progress',
        houseId: house.id
    });
};


//const setupGroups = async () => {
//    await Groups.create({
//        teamOwnerEmail: "amiels@gmail.com",
//        capacity: 4,
//        schoolId: 1
//    })
//    await Groups.create({
//        teamOwnerEmail: "amiels@gmail.com",
//        capacity: 4,
//        schoolId: 1
//    })
//}
module.exports = router