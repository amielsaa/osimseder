const express = require('express');
const router = express.Router();

const {Schools} = require('../../models/');
const {Groups} = require('../../models/');
const {Staffs, Cities, Areas} = require('../../models/');
const registrationLogic = require('../../domain/RegistrationLogic');
router.post('/setup', async (req,res) => {
    try{
        await setupCities();
        await setupAreas();
        await setupSchools();
        await setupStudents();
        await setupStaffs();
        await verifyUsers();
        await setupGroups();
        res.json('DONE')

    }catch(error) {
        res.json(error);
    }
})

const setupCities = async () => {
    await Cities.create({
        cityName: 'ירושלים',
        cityManagerEmail: 'amieljrs@gmail.com'
    })
    await Cities.create({
        cityName: 'באר שבע',
        cityManagerEmail: 'amielbsv@gmail.com'
    })
}

const setupAreas = async () => {
    await Areas.create({
        areaName:'בקעה רבתי',
        areaManagerEmail: 'amieleastbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'גוננים',
        areaManagerEmail: 'amielwestbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'גילה',
        areaManagerEmail: 'amieleastbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'פסגת זאב',
        areaManagerEmail: 'amielwestbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'קריית יובל/מנחם',
        areaManagerEmail: 'amieleastbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'רמות',
        areaManagerEmail: 'amielwestbsv@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName:'נתיבי עם',
        areaManagerEmail: 'amieleastjrs@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName:'רמות',
        areaManagerEmail: 'amielwestjrs@gmail.com',
        cityId: '2'
    })
    
}

const setupSchools = async () => {
    await Schools.create({
        schoolName: 'אורט גבעת רם',
        schoolId: "1",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'המסורתי',
        schoolId: "2",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'טדי קולק',
        schoolId: "3",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'פלך בנות',
        schoolId: "4",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'פלך בנים',
        schoolId: "5",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'קשת סליסברג',
        schoolId: "6",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'רעות',
        schoolId: "7",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'תבל רמות',
        schoolId: "8",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'מקיף ז',
        schoolId: "9",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'זיברמן',
        schoolId: "10",
        cityId: "2"
    })
}


const setupStudents = async () => {
    //students
    createdUser = await registrationLogic.registerStudent({
        email: "student1@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד1",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "BSV",
        school: 'מקיף א ב"ש',
        extraLanguage: "English"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student2@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד2",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "אלרגי לחתולים",
        city: "BSV",
        school: 'מקיף א ב"ש',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student3@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד3",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "BSV",
        school: 'מקיף א ב"ש',
        extraLanguage: "Russian"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student4@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד4",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "BSV",
        school: 'מקיף ב ב"ש',
        extraLanguage: "Spanish"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student5@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד5",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "BSV",
        school: 'מקיף ב ב"ש',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student6@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד6",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "BSV",
        school: 'מקיף ב ב"ש',
        extraLanguage: "Russian"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student7@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד7",
        phoneNumber: "0548552120",
        gender: "אחר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "JRS",
        school: 'אורט ירושלים',
        extraLanguage: "English"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student8@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד8",
        phoneNumber: "0548552120",
        gender: "אחר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "צריך לסיים מוקדם",
        city: "JRS",
        school: 'אורט ירושלים',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student9@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד9",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "JRS",
        school: 'אורט ירושלים',
        extraLanguage: "Russian"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student10@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד10",
        phoneNumber: "0548552120",
        gender: "זכר",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "JRS",
        school: 'נווה ציון ירושלים',
        extraLanguage: "English"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student11@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד11",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "אלרגי לחתולים",
        city: "JRS",
        school: 'נווה ציון ירושלים',
        extraLanguage: ""
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student12@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד12",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "",
        city: "JRS",
        school: 'נווה ציון ירושלים',
        extraLanguage: "Arabic"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

}
//ALL PASSWORDS ARE EMAIL_START+phonenum
const setupStaffs = async () => {
    //admin
    createdUser = await registrationLogic.registerStaff({
        email: 'Itaibc@udi.org.il',
        password: 'Itaibc0549552120',
        lastName: 'בן חיים',
        firstName: 'איתי',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'E',
        city: ''
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //city managers
    createdUser = await registrationLogic.registerStaff({
        email: 'amieljrs@gmail.com',
        password: '123456',
        lastName: 'מנהל-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'D',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielbsv@gmail.com',
        password: '123456',
        lastName: 'מנהל-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'D',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //area managers
    createdUser = await registrationLogic.registerStaff({
        email: 'amieleastbsv@gmail.com',
        password: '123456',
        lastName: 'מזרח-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'C',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielwestbsv@gmail.com',
        password: '123456',
        lastName: 'מערב-בש',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'C',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amieleastjrs@gmail.com',
        password: '123456',
        lastName: 'מזרח-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'C',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'amielwestjrs@gmail.com',
        password: '123456',
        lastName: 'מערב-ים',
        firstName: 'עמיאל',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'C',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //team owners
    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner1@gmail.com',
        password: '123456',
        lastName: 'קבוצה1',
        firstName: 'איתח',
        phoneNumber: '0526864229',
        gender: 'זכר',
        accesses: 'B',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner2@gmail.com',
        password: '123456',
        lastName: 'קבוצה2',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'B',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner3@gmail.com',
        password: '123456',
        lastName: 'קבוצה3',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'B',
        city: 'BSV'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner4@gmail.com',
        password: '123456',
        lastName: 'קבוצה4',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'B',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner5@gmail.com',
        password: '123456',
        lastName: 'קבוצה5',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'זכר',
        accesses: 'B',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner6@gmail.com',
        password: '123456',
        lastName: 'קבוצה6',
        firstName: 'ראש',
        phoneNumber: '0549552120',
        gender: 'נקבה',
        accesses: 'B',
        city: 'JRS'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

}


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