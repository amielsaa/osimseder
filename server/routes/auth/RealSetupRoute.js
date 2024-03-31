const express = require('express');
const router = express.Router();

const { Schools } = require('../../models/');
const { Groups } = require('../../models/');
const { Staffs, Cities, Areas } = require('../../models/');
const registrationLogic = require('../../domain/RegistrationLogic');
router.post('/realSetup', async (req, res) => {
    try {
        await setupCities();
        await setupAreas();
        await setupSchools();
        await setupStaffs();
        await setupStudents();
        res.json('DONE')

    } catch (error) {
        res.json(error);
    }
})

const setupCities = async () => {
    await Cities.create({
        cityName: 'באר שבע',
        cityManagerEmail: 'ofirnp@gmail.com'
    })
    await Cities.create({
        cityName: 'ירושלים',
        cityManagerEmail: 'Itamar.chol@gmail.com'
    })
}

const setupAreas = async () => {
    await Areas.create({
        areaName: 'נתיבי עם',
        areaManagerEmail: 'noafue@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName: 'רמות',
        areaManagerEmail: 'noafue@gmail.com',
        cityId: '1'
    })
    await Areas.create({
        areaName: 'בקעה רבתי',
        areaManagerEmail: 'daniellegeva21@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName: 'גוננים',
        areaManagerEmail: 'he9790126@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName: 'גילה',
        areaManagerEmail: 'ahrvvnkfv10@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName: 'פסגת זאב',
        areaManagerEmail: 'enat.dilian@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName: 'קריית יובל/מנחם',
        areaManagerEmail: 'yardenfurman61@gmail.com',
        cityId: '2'
    })
    await Areas.create({
        areaName: 'רמות',
        areaManagerEmail: 'estervaserman@gmail.com',
        cityId: '2'
    })
}

const setupSchools = async () => {
    await Schools.create({
        schoolName: 'מקיף ז',
        schoolId: "1",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'זיברמן',
        schoolId: "2",
        cityId: "1"
    })
    await Schools.create({
        schoolName: 'אורט גבעת רם',
        schoolId: "3",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'המסורתי',
        schoolId: "4",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'טדי קולק',
        schoolId: "5",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'פלך בנות',
        schoolId: "6",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'פלך בנים',
        schoolId: "7",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'קשת סליסברג',
        schoolId: "8",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'רעות',
        schoolId: "9",
        cityId: "2"
    })
    await Schools.create({
        schoolName: 'תבל רמות',
        schoolId: "10",
        cityId: "2"
    })
}


//ALL PASSWORDS ARE EMAIL_START+phonenum
const setupStaffs = async () => {

    //admins 
    //emailName(with first letter CAPS) + 4_last_digits_phonenum + @admin
    createdUser = await registrationLogic.registerStaff({
        email: 'Itaibc@udi.org.il',
        password: 'Itaibc4229@admin',
        lastName: 'בן חיים',
        firstName: 'איתי',
        phoneNumber: '0526864229',
        gender: 'זכר',
        accesses: 'E',
        city: 'ירושלים'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //city managers
    //emailName(with first letter CAPS) + 4_last_digits_phonenum + @city
    //אופיר	נעמן פרי	526065129	ofirnp@gmail.com	נ	באר שבע
    createdUser = await registrationLogic.registerStaff({
        email: 'ofirnp@gmail.com',
        password: 'Ofirnp5129@city',
        lastName: 'נעמן פרי',
        firstName: 'אופיר',
        phoneNumber: '0526065129',
        gender: 'נקבה',
        accesses: 'D',
        city: 'באר שבע'
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    //איתמר 	קולנברג	542009640	Itamar.chol@gmail.com 	ז	ירושלים 	ירושלים	מנהל איזור
    createdUser = await registrationLogic.registerStaff({
        email: 'Itamar.chol@gmail.com',
        password: 'Itamar.chol9640@city', // Please provide the password
        lastName: 'קולנברג',
        firstName: 'איתמר',
        phoneNumber: '0542009640',
        gender: 'זכר',
        accesses: 'D',
        city: 'ירושלים',
    });
    await createdUser.update({ isVerified: true, verificationToken: null });



    //area managers
    //emailName(with first letter CAPS) + 4_last_digits_phonenum + @#@

    //דניאל	גבע	0542454740	daniellegeva21@gmail.com	נ	ירושלים	בקעה רבתי
    createdUser = await registrationLogic.registerStaff({
        email: 'daniellegeva21@gmail.com',
        password: 'Daniellegeva214740@#@',
        lastName: 'גבע',
        firstName: 'דניאל',
        phoneNumber: '0542454740',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    //יהודית	קלרמן	556808024	he9790126@gmail.com	נ	ירושלים	גוננים	רכזת גרעין
    createdUser = await registrationLogic.registerStaff({
        email: 'he9790126@gmail.com',
        password: 'He97901268024@#@', // Please provide the password
        lastName: 'קלרמן',
        firstName: 'יהודית',
        phoneNumber: '0556808024',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // שירה	מרקוביץ	503344416	ahrvvnkfv10@gmail.com	נ	ירושלים	גילה	רכזת גרעין
    createdUser = await registrationLogic.registerStaff({
        email: 'ahrvvnkfv10@gmail.com',
        password: 'Ahrvvnkfv104416@#@', // Please provide the password
        lastName: 'מרקוביץ',
        firstName: 'שירה',
        phoneNumber: '0503344416',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    //עינת	דיליאן	506512551	enat.dilian@gmail.com 	נ	ירושלים	פסגת זאב	רכזת גרעין
    createdUser = await registrationLogic.registerStaff({
        email: 'enat.dilian@gmail.com',
        password: 'Enat.dilian2551@#@',
        lastName: 'דיליאן',
        firstName: 'עינת',
        phoneNumber: '0506512551',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // ירדן	פורמן	506659899	yardenfurman61@gmail.com	נ
    createdUser = await registrationLogic.registerStaff({
        email: 'yardenfurman61@gmail.com',
        password: 'Yardenfurman619899@#@', // Please provide the password
        lastName: 'פורמן',
        firstName: 'ירדן',
        phoneNumber: '0506659899',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    //אסתר	וסרמן	584250119	estervaserman@gmail.com	נ	ירושלים	רמות	רכזת גרעין
    createdUser = await registrationLogic.registerStaff({
        email: 'estervaserman@gmail.com',
        password: 'Estervaserman0119@#@', // Please provide the password
        lastName: 'וסרמן',
        firstName: 'אסתר',
        phoneNumber: '0584250119',
        gender: 'נקבה',
        accesses: 'C',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Noa Fuechttonger
    createdUser = await registrationLogic.registerStaff({
        email: 'noafue@gmail.com',
        password: 'Noafue7495@#@', // Please provide the password
        lastName: 'פויכטונגר',
        firstName: 'נועה',
        phoneNumber: '0525377495',
        gender: 'נקבה',
        accesses: 'C',
        city: 'באר שבע'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    //team owners
    //emailName(with first letterin english CAPS) + 4_last_digits_phonenum + !!
    // Asael
    createdUser = await registrationLogic.registerStaff({
        email: '2008asael@gmail.com',
        password: '2008Asael1621!!', // Please provide the password
        lastName: '',
        firstName: 'עשהאל',
        phoneNumber: '0586361621',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Zimrat
    createdUser = await registrationLogic.registerStaff({
        email: 'zimratg.2007@gmail.com',
        password: 'Zimratg.20078294!!', // Please provide the password
        lastName: '',
        firstName: 'זמרת',
        phoneNumber: '0534648294',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Noa Brosh
    createdUser = await registrationLogic.registerStaff({
        email: 'noa.brosh12@gmail.com',
        password: 'Noa.brosh126848!!', // Please provide the password
        lastName: '',
        firstName: 'נועה',
        phoneNumber: '0538466848',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Shira
    createdUser = await registrationLogic.registerStaff({
        email: 'shira33122@gmail.con',
        password: 'Shira331227292!!', // Please provide the password
        lastName: '',
        firstName: 'שירה',
        phoneNumber: '0524417292',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Yaal
    createdUser = await registrationLogic.registerStaff({
        email: 'yl5803069@gmail.com',
        password: 'Yl58030698535!!', // Please provide the password
        lastName: '',
        firstName: 'יעל',
        phoneNumber: '+972559128535',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Yotam Avitan
    createdUser = await registrationLogic.registerStaff({
        email: 'yotamavitan1@gmail.com',
        password: 'Yotamavitan16301!!', // Please provide the password
        lastName: '',
        firstName: 'יותם',
        phoneNumber: '0548006301',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Shoham
    createdUser = await registrationLogic.registerStaff({
        email: 'shohambock234@gmail.com',
        password: 'Shohambock2345844!!', // Please provide the password
        lastName: '',
        firstName: 'שוהם',
        phoneNumber: '0544415844',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Ya'ir
    createdUser = await registrationLogic.registerStaff({
        email: 'yaakobiyair@gmail.com',
        password: 'Yaakobiyair6127!!', // Please provide the password
        lastName: '',
        firstName: 'יאיר',
        phoneNumber: '0584466127',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Elian
    createdUser = await registrationLogic.registerStaff({
        email: 'Eliannnsegal@gmail.com',
        password: 'Eliannnsegal8910!!', // Please provide the password
        lastName: '',
        firstName: 'אליאן',
        phoneNumber: '0584448910',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Agam
    createdUser = await registrationLogic.registerStaff({
        email: 'Agamitzko@gmail.com',
        password: 'Agamitzko2293!!', // Please provide the password
        lastName: '',
        firstName: 'אגם',
        phoneNumber: '0532552293',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });

    // Shnei
    createdUser = await registrationLogic.registerStaff({
        email: 'shnimun1@gmail.com',
        password: 'Shnimun19679!!', // Please provide the password
        lastName: '',
        firstName: 'שני',
        phoneNumber: '0506219679',
        gender: '',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });
    //=======================================================================================================
    // Ours
    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner1@gmail.com',
        password: '123456', // Please provide the password
        lastName: 'שש',
        firstName: 'ראש קבוצה בש',
        phoneNumber: '0505050505',
        gender: 'זכר',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });
    // Ours
    createdUser = await registrationLogic.registerStaff({
        email: 'teamOwner2@gmail.com',
        password: '123456', // Please provide the password
        lastName: 'שש',
        firstName: 'ראש קבוצה בש',
        phoneNumber: '0505050505',
        gender: 'נקבה',
        accesses: 'B',
        city: 'ירושלים'
    });
    await createdUser.update({ isVerified: true, verificationToken: null });
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
        city: "באר שבע",
        school: 'זיברמן',
        extraLanguage: "ספרדית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student2@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמיד2",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "אלרגי לחתולים",
        city: "באר שבע",
        school: 'זיברמן',
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
        city: "באר שבע",
        school: 'זיברמן',
        extraLanguage: "רוסית"
    })
    await createdUser.update({ isVerified: true, verificationToken: null });

    createdUser = await registrationLogic.registerStudent({
        email: "student4@gmail.com",
        password: "123456",
        lastName: "משפחה",
        firstName: "תלמידה4",
        phoneNumber: "0548552120",
        gender: "נקבה",
        parentName: "אבוש",
        parentPhoneNumber: "0549552120",
        issuesText: "בעייה בסחיבת חפצים כבדים",
        city: "באר שבע",
        school: "מקיף ז",
        extraLanguage: "אמהרית"
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
        city: "באר שבע",
        school: "מקיף ז",
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
        city: "באר שבע",
        school: "מקיף ז",
        extraLanguage: "רוסית"
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
        city: "ירושלים",
        school: 'אורט גבעת רם',
        extraLanguage: ""
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
        city: "ירושלים",
        school: 'אורט גבעת רם',
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
        issuesText: "צמחוני",
        city: "ירושלים",
        school: 'אורט גבעת רם',
        extraLanguage: ""
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
        city: "ירושלים",
        school: 'תבל רמות',
        extraLanguage: "ערבית"
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
        city: "ירושלים",
        school: 'תבל רמות',
        extraLanguage: "אחר"
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
        city: "ירושלים",
        school: 'תבל רמות',
        extraLanguage: ""
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