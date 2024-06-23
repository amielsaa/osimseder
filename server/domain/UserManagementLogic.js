// Student Management
const { Students, Staffs, Areas } = require('../models');
const bcrypt = require('bcrypt');
const { formatStaffValues, formatStudentValues } = require('./utils/JsonValueAdder')
const EmailService = require('./services/EmailService');
const RegistrationLogic = require('./RegistrationLogic');
const { usersLogger } = require('../utils/Logger');
const argumentChecker = require('./utils/ArgumentChecker');
const String2Int = require('./utils/String2Int');
const StaffLogic = require('./StaffLogic');

class UserManagementLogic {


 // get area of manager email
 // Input: managerEmail - the email of the manager
// Output: the area object
async getAreaByManager(managerEmail) {
    try {
        usersLogger.debug('Getting area by manager email: ' + managerEmail);
        await argumentChecker.checkSingleArugments([managerEmail], ["managerEmail"]);

        const area = await Areas.findOne({
            where: { areaManagerEmail: managerEmail }
        });
        if (!area) {
            throw new Error('No area with this manager email');
        }

        usersLogger.debug('Successfully found area by manager email: ' + managerEmail);
        return area;
    } catch (error) {
        usersLogger.error('Failed to fetch area: ' + error);
        throw new Error('Failed to fetch area: ' + error);
    }
}

// get all students
// Output: a list of all students
    async getAllStudents(filterBy) {
        try {
            usersLogger.debug('Getting all volunteers');

            // Construct the where clause based on the filterBy object
            const whereClause = {};
            if (filterBy) {
                Object.keys(filterBy).forEach(key => {
                    whereClause[key] = filterBy[key];
                });
            }

            // Find all students based on the constructed where clause
            const students = await Students.findAll({ where: whereClause });

            // Fetch schoolName and cityName for each student
            const enhancedStudents = await Promise.all(students.map(async student => {
                const schoolName = await String2Int.getSchoolNameById(student.schoolId);
                const cityName = await String2Int.getCityNameById(student.cityId);

                return {
                    ...student.dataValues,
                    schoolName: schoolName,
                    cityName: cityName
                };
            }));

            usersLogger.debug('Successfully found all volunteers');
            return enhancedStudents;
        } catch (error) {
            usersLogger.error('Failed to fetch volunteers: ' + error);
            throw new Error('Failed to fetch volunteers');
        }
    }

// get all staffs
// Input: requesterEmail - the email of the requester
//        requesterRole - the role of the requester
//        filterBy - the filter object
// Output: a list of all staffs
    async getAllStaffs(requesterEmail, requesterRole, filterBy) {
        try {
            usersLogger.debug("Getting all staffs for email: " + requesterEmail + "with requesterRole: " + requesterRole);
            // Construct the where clause based on the filterBy object
            const whereClause = {};
            console.log("filterBy: ", filterBy);
            if (filterBy) {
                Object.keys(filterBy).forEach(key => {
                    whereClause[key] = filterBy[key];
                });
            }
            console.log("whereClause: ", whereClause);
            const staffs = await Staffs.findAll({
                where: whereClause,
                order: [
                    ['firstName', 'ASC'], // Sort by first name in ascending order
                    ['lastName', 'ASC']   // Then sort by last name in ascending order
                ]
            });

            var areaName = ''

// Fetch cityName for each staff
            const enhancedStaffs = await Promise.all(staffs.map(async staff => {
                const cityName = await String2Int.getCityNameById(staff.cityId);
                var areaName = ''
                if (staff.accesses == "C") {
                    console.log(staff.email)
                    const area = await this.getAreaByManager(staff.email);
                    areaName = area.areaName;
                }

                return {
                    ...staff.dataValues,
                    cityName: cityName,
                    areaName: areaName
                };
            }));
            console.log("staffs: ", enhancedStaffs);

            usersLogger.debug('Successfully found all staffs');
            return enhancedStaffs;
        } catch (error) {
            usersLogger.error('Failed to fetch staffs: ' + error);
            throw new Error('Failed to fetch staffs');
        }
    }

// get all team owners
// Input: managerEmail - the email of the manager
//        filterBy - the filter object
// Output: a list of all team owners
    async getAllTeamOwners(managerEmail, cityId, filterBy) {
        try {
            usersLogger.debug("Getting all team owners for email: " + managerEmail, "with cityId: " + cityId);
            // Construct the where clause based on the filterBy object

            filterBy.accesses = 'B'; //Team Owners Only
            const whereClause = {};
            if (filterBy) {
                Object.keys(filterBy).forEach(key => {
                    whereClause[key] = filterBy[key];
                });
            }

            // Find all team owners based on the constructed where clause
            const teamOwners = await Staffs.findAll({ where: whereClause });

            const cityName = await String2Int.getCityNameById(cityId);
            // Fetch cityName for each team owner
            const enhancedTeamOwners = await Promise.all(teamOwners.map(async teamOwner => {

                return {
                    ...teamOwner.dataValues,
                    cityName: cityName
                };
            }));

            usersLogger.debug('Successfully found all team owners');
            return enhancedTeamOwners;
        } catch (error) {
            usersLogger.error('Failed to fetch team owners: ' + error);
            throw new Error('Failed to fetch team owners');
        }
    }

// get user by email
// Input: email - the email of the user
// Output: the user object
    async getUserByEmail(email) {
        try {
            usersLogger.debug('Getting user by email: ' + email);
            await argumentChecker.checkSingleArugments([email], ["email"]);

            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                const staff = await Staffs.findOne({
                    where: { email: email }
                });
                if (!staff) {
                    throw new Error('No user with this email');
                }
                else {
                    const staffJson = await formatStaffValues(staff);
                    return staffJson;
                }
            }
            else {
                const studentJson = await formatStudentValues(student);
                return studentJson;
            }

            usersLogger.debug('Successfully found user by email: ' + email);
        } catch (error) {
            usersLogger.error('Failed to fetch user: ' + error);
            throw new Error('Failed to fetch user: ' + error);
        }
    }

//deletes student
// Input: studentEmail - the email of the student
//        requesterEmail - the email of the requester
// Output: none
    async deleteStudent(studentEmail, requesterEmail) {
        try {
            usersLogger.info('Deleting student with id: ' + studentEmail + ". Requester email: " + requesterEmail);
            argumentChecker.checkSingleArugments([studentEmail, requesterEmail], ['studentEmail', 'requesterEmail']);

            const student = await Students.findByPk(studentEmail);
            if (!student) {
                throw new Error('Student not found');
            }
            await student.destroy();
            usersLogger.info('Successfully deleted student with id: ' + studentEmail + ". Requester email: " + requesterEmail);

        } catch (error) {
            usersLogger.error('Failed to delete student: ' + error);
            throw new Error('Failed to delete student');
        }
    }

//deletes staff
// Input: staffEmail - the email of the staff
//        requesterEmail - the email of the requester
// Output: none
    async deleteStaff(staffEmail, requesterEmail) {
        try {
            usersLogger.info('Deleting staff with id: ' + staffEmail + ". Requester email: " + requesterEmail);
            argumentChecker.checkSingleArugments([staffEmail, requesterEmail], ['staffEmail', 'requesterEmail']);

            const staff = await Staffs.findByPk(staffEmail);
            if (!staff) {
                throw new Error('Staff not found');
            }
            await staff.destroy();
            usersLogger.info('Successfully deleted staff with email: ' + studentEmail + ". Requester email: " + requesterEmail);

        } catch (error) {
            usersLogger.error('Failed to delete staff: ' + error);
            throw new Error('Failed to delete staff');
        }
    }

// add a volunteer without email authorization
// Input: newVolunteerData - the data of the volunteer
//        requesterEmail - the email of the requester
// Output: the volunteer object
    async addVolunteer(newVolunteerData, requesterEmail) {
        try {
            usersLogger.info("Initiating add volunteer as manager for email: " + newVolunteerData.email + ". Executed by: " + requesterEmail);
            argumentChecker.checkByKeys(newVolunteerData, "newVolunteerData", ["email", "password", "lastName", "firstName", "phoneNumber", "gender", "parentName", "parentPhoneNumber", "city", "school"]);
            const hashedPassword = await bcrypt.hash(newVolunteerData.password, 10);
            const cityId = await string2Int.getCityId(newVolunteerData.city);
            const schoolId = await string2Int.getSchoolId(newVolunteerData.school);

            const createdStudent = await Students.create({
                "email": newVolunteerData.email,
                "password": hashedPassword,
                "lastName": newVolunteerData.lastName,
                "firstName": newVolunteerData.firstName,
                "phoneNumber": newVolunteerData.phoneNumber,
                "gender": newVolunteerData.gender,
                "parentName": newVolunteerData.parentName,
                "parentPhoneNumber": newVolunteerData.parentPhoneNumber,
                "issuesText": newVolunteerData.issuesText,
                "verificationToken": null,
                "cityId": cityId,
                "schoolId": schoolId,
                "isVerified": true,
                "extraLanguage": newVolunteerData.extraLanguage
            });

            usersLogger.info("Successfully add volunteer as manager for email: " + newVolunteerData.email + "in city: " + newVolunteerData.city + "in school: " + newVolunteerData.school)
            return createdStudent;

        } catch (error) {
            usersLogger.error("Error adding volunteer with email: " + newVolunteerData.email + ". Reason: " + error)
            throw new Error('Failed to create student: ' + error);
        }
    }
    
// add a staff without email authorization
// Input: newStaffData - the data of the staff
//        requesterEmail - the email of the requester
// Output: the staff object
    async addStaff(newStaffData, requesterEmail) {
        try {
            usersLogger.info("Initiating add staff as manager for email: " + newStaffData.email + ". Executed by: " + requesterEmail);
            argumentChecker.checkByKeys(newStaffData, "newStaffData", ["email", "password", "lastName", "firstName", "phoneNumber", "city"]);
            const cityId = await string2Int.getCityId(newStaffData.city);

            const createdStaff = await Students.create({
                "email": newStaffData.email,
                "password": hashedPassword,
                "lastName": newStaffData.lastName,
                "firstName": newStaffData.firstName,
                "phoneNumber": newStaffData.phoneNumber,
                "gender": newStaffData.gender,
                "verificationToken": null,
                "cityId": cityId,
                "isVerified": true,
            });

            usersLogger.info("Successfully add staff as manager for email: " + newStaffData.email + "in city: " + newStaffData.city)
            return createdStaff;

        } catch (error) {
            usersLogger.error("Error adding staff with email: " + newStaffData.email + ". Reason: " + error)
            throw new Error('Failed to create staff: ' + error);
        }
    }


// update a volunteer
// Input: volunteerEmail - the email of the volunteer
//        requesterEmail - the email of the user who is updating the volunteer
//        updatedFields - the fields to update
// Output: the updated volunteer object
    async updateVolunteerByManager(volunteerEmail, updatedFields, requesterEmail) {
        try {
            usersLogger.info('Updating a volunteer by manager for email: ' + volunteerEmail + '. By email: ' + requesterEmail);
            argumentChecker.checkSingleArugments([volunteerEmail, requesterEmail], ['volunteerEmail', 'requesterEmail']);
            //TODO add check on the updated fields values
            const student = await Students.findOne({
                where: { email: volunteerEmail }
            });
            if (!student) {
                throw new Error('Couldn\'t find a student with that email.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    student[key] = updatedFields[key];
                }
            }

            await student.save();

            usersLogger.info('Successfully updated a volunteer by manager for email: ' + volunteerEmail + '. Performed by email: ' + requesterEmail);
            return student;

        } catch (error) {
            usersLogger.error('Failed to update a volunteer by manager for email: ' + volunteerEmail + ". Error: " + error);
            throw new Error('Failed to update a student by manager for email: ' + volunteerEmail + ". Error: " + error);
        }
    }


// update a staff
// Input: staffEmail - the email of the staff
//        requesterEmail - the email of the user who is updating the staff
//        updatedFields - the fields to update
// Output: the updated staff object
    async updateStaffByManager(staffEmail, updatedFields, requesterEmail) {
        try {
            usersLogger.info('Updating a staff by manager for email: ' + staffEmail + '. By email: ' + requesterEmail);
            argumentChecker.checkSingleArugments([staffEmail, requesterEmail], ['staffEmail', 'requesterEmail']);
            //TODO add check on the updated fields values
            const staff = await Staffs.findOne({
                where: { email: staffEmail }
            });
            if (!staff) {
                throw new Error('Couldn\'t find a staff with that email.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    staff[key] = updatedFields[key];
                }
            }

            await staff.save();

            usersLogger.info('Successfully updated a staff by email: ' + staffEmail + '. Performed by email: ' + requesterEmail);
            return staff;

        } catch (error) {
            usersLogger.error('Failed to update a staff by email: ' + error);
            throw new Error('Failed to update a staff by email: ' + error);
        }
    }

// approve a staff role
// Input: staffEmail - the email of the staff
//        alternateRole - the alternate role to assign
//        requesterEmail - the email of the user who is updating the staff
// Output: the updated staff object
    async approveStaffRole(staffEmail, alternateRole, requesterEmail) {
        try {
            usersLogger.info('Approving a staff role by manager for email: ' + staffEmail + '. By email: ' + requesterEmail);
            argumentChecker.checkSingleArugments([staffEmail, requesterEmail], ['staffEmail', 'requesterEmail']);
            //TODO add check on the updated fields values
            const staff = await Staffs.findOne({
                where: { email: staffEmail }
            });
            if (!staff) {
                throw new Error('Couldn\'t find a staff with that email.');
            }
            if (alternateRole) {
                staff[accesses] = alternateRole;
            }
            staff[isVerified] = true;
            await staff.save();

            usersLogger.info('Successfully approved a staff role by manager for email: ' + staffEmail + '. Performed by email: ' + requesterEmail);
            return staff;

        } catch (error) {
            usersLogger.error('Failed to approve a staff by email: ' + error);
            throw new Error('Failed to approve a staff by email: ' + error);
        }
    }




// reset password
// Input: email - the email of the student
// Output: the reset token
    async resetPassword(email) {
        try {
            usersLogger.info('Initiate password reset for email: ' + email);
            argumentChecker.checkSingleArugments([email], ['email']);

            const student = await Students.findOne({
                where: { email: email }
            });
            if (!student) {
                throw new Error('Student not found');
            }
            const resetToken = await RegistrationLogic.generateVerificationToken();
            await EmailService.sendResetPasswordEmail(email, resetToken);

            usersLogger.debug('Successfully initiated password reset for email: ' + email);
            return resetToken;
        } catch (error) {
            usersLogger.error('Failed to reset password: ' + error);
            throw new Error('Failed to reset password: ' + error);
        }
    }

// handle reset password
// Input: token - the reset token
//        newPassword - the new password
// Output: none
    async handleResetPassword(token, newPassword) {
        try {
            usersLogger.info('Handling password reset');
            argumentChecker.checkSingleArugments([token, newPassword], ['token', 'newPassword']);

            const decodedToken = await EmailService.decodeResetToken(token);
            const student = await Students.findByPk(decodedToken.studentId);
            if (!student) {
                throw new Error('Student not found');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await student.update({ password: hashedPassword });

            usersLogger.info('Successfully handled password reset');
        } catch (error) {
            usersLogger.error('Failed to handle password reset: ' + error); 
            throw new Error('Failed to handle password reset: ' + error);
        }
    }
}

module.exports = new UserManagementLogic();

