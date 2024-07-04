const express = require("express");
const router = express.Router();
const RegistrationLogic = require('../../domain/RegistrationLogic');
const loginLogic = require('../../domain/LoginLogic');
const { generateToken, validateToken } = require("../../utils/JsonWebToken");
const {accessGroup, validateAccess} = require('../../utils/Accesses');
const LoginLogic = require("../../domain/LoginLogic");
const StaffCitiesLogic = require('../../domain/StaffCitiesLogic')
const StaffHouseLogic = require('../../domain/StaffHouseLogic')

const EmailEncryptor = require("../../domain/utils/EmailEncryptor");
// Endpoint to register a new student
router.post('/register_student', async (req, res) => {
    const studentData = req.body;
    try {
        const createdStudent = await RegistrationLogic.registerStudent(studentData);
        res.json(createdStudent);
    } catch (error) {
        res.json({ error: error.message });
    }
});

//================== VERIFY FOR TESTING ==================
router.post('/verify', async (req, res) => {
    const studentData = req.body.email;
    try {
        const createdStudent = await RegistrationLogic.instantVerifyTesting(studentData);
        res.json(createdStudent);
    } catch (error) {
        res.json({ error: error.message });
    }
});
//================== VERIFY FOR TESTING ==================

// Endpoint to log in a user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await loginLogic.verifyLogin(email, password)
        res.json(user);
    } catch (error) {
        
        res.json({ error: error.message });
    }
});
// Endpoint to update user session
router.get('/update_user_session', validateToken, async (req, res) => {
    try{
        const token = req.header("accessToken");
        const user = await loginLogic.verifyToken(token);
        res.json(user);
    } catch(error) {
        res.json({ error: error.message });
    }
});


router.get('/cities_for_register', async (req, res) => {
    try {
        const cities = await StaffCitiesLogic.fetchAllCities();

        const cleanedCities = await cities.map(city => {
            const {createdAt, updatedAt, cityManagerEmail, ...cleanedCity } = city.dataValues;
            return cleanedCity;
        });
        res.json(cleanedCities);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to register a new staff
router.post('/register_staff', async (req, res) => {
    const staffData = req.body;
    try {
        const createdStaff = await RegistrationLogic.registerStaff(staffData);
        res.json(createdStaff);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.post('/reset_password', async (req, res) => {
    const {email} = req.body;
    try {
        const createdStudent = await RegistrationLogic.forgotPassword(email);
        res.json(createdStudent);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to handle password change
router.post('/change_password', validateToken, async (req, res) => {
    try {
        const { password, newPassword, isStudent }  = req.body;
        // Call the logic method to verify the email and token
        await RegistrationLogic.changePassword(req.user.email, password, newPassword, isStudent);
        res.json(true);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to handle edit personal details
router.put('/edit_personal_details', validateToken, async (req, res) => {
    try {
        const userData  = req.body.userData;
        // Call the logic method to verify the email and token
        const user = await RegistrationLogic.editPersonalDetails(req.user.email, req.user.role, userData, userData.isStudent);
        res.json(user);
    } catch (error) {
        res.json({ error: error.message });
    }
});

// Endpoint to handle password change
router.post('/log_out', async (req, res) => {
    try {
        const { email } = req.body;
        // Call the logic method to verify the email and token
        await LoginLogic.logout();
        res.send(true);
    } catch (error) {
        console.error('Error logging out user ' + email + "for the reason: ", error);
        res.status(500).send('Internal server error.');
    }
});

// decrypt an email (GET)
router.get('/decryptEmail/:encryptedEmail', validateToken, validateAccess(accessGroup.A), async (req, res) => {
    try {
        const encryptedEmail = req.params.encryptedEmail;
        const decryptedEmail = await EmailEncryptor.decryptEmail(encryptedEmail);
        res.json(decryptedEmail);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/getareas', async (req, res) => {
    try {
        
        const areas = await StaffHouseLogic.getAllAreasByCity();
        const transformedAreas = Object.keys(areas).reduce((acc, key) => {
            acc[key] = new Set(areas[key].map(item => item.areaName));
            return acc;
        }, {});
        
        // Convert Sets to Arrays for JSON serialization
        const responseData = Object.keys(transformedAreas).reduce((acc, key) => {
            acc[key] = Array.from(transformedAreas[key]);
            return acc;
        }, {});

        res.json(responseData);

        // returns like this:
        /*
        {
            "BSV": [
                {
                    "id": 1,
                    "areaName": "eastbsv",
                    "areaManagerEmail": "amieleastbsv@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.446Z",
                    "updatedAt": "2024-02-28T17:26:24.446Z",
                    "cityId": 1
                }
            ],
            "JRS": [
                {
                    "id": 2,
                    "areaName": "eastjrs",
                    "areaManagerEmail": "amieleastjrs@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.452Z",
                    "updatedAt": "2024-02-28T17:26:24.452Z",
                    "cityId": 2
                },
                {
                    "id": 3,
                    "areaName": "testbsv",
                    "areaManagerEmail": "amieleastjrs@gmail.com",
                    "createdAt": "2024-02-28T17:26:24.452Z",
                    "updatedAt": "2024-02-28T17:26:24.452Z",
                    "cityId": 2
                }
            ]
        }
        */
        
    } catch (err) {
        res.json({ error: err.message });
    }
});
module.exports = router;