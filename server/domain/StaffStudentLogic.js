const {Groups, Schools, Students, Areas, Cities, Staffs, Houses} = require('../models');

class StaffStudentLogic {
    checkArguments(parameters, parameterNames) {
        // const parameterNames = ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "languageNeeded"];
        for (let i = 0; i < parameters.length; i++) {
            const param = parameters[i];
            if (param === undefined || param === null) {
                throw new Error(`Parameter ${parameterNames[i]} is undefined`);
            }
            if (param === null) {
                throw new Error(`Parameter ${parameterNames[i]} is null`);
            }
        }
        return true;
    }

    async updateStudent(email, updatedFields) {
        try {
            this.checkArguments([email],
                ["email"]);
            const student = await Students.findOne({
                where: {email: email}
            });
            if(!student){
                throw new Error('Couldn\'t find a student with that email.');
            }

            for (const key in updatedFields) {
                if (Object.hasOwnProperty.call(updatedFields, key)) {
                    student[key] = updatedFields[key];
                }
            }

            await student.save();
        
            return student;

        } catch (error) {
            throw new Error('Failed to update a student by email: ' + error);
        }
    }

    

}

module.exports = new StaffStudentLogic();
