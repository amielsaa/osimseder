const { roleGroup } = require('../../utils/Accesses')
const Encryptor = require('./Encryptor');
const string2Int = require('./String2Int');

async function formatStaffValues(staff) {
    const { password, ...staffJson } = staff;
    staffJson.dataValues.role = roleGroup[staff.accesses];
    staffJson.dataValues.cityName = await string2Int.getCityNameById(staff.cityId);
    staffJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(staff.email);
    return staffJson;
}

async function formatStudentValues(student) {
    const { password, ...studentJson } = student;
    studentJson.dataValues.role = "Student";
    studentJson.dataValues.cityName = await string2Int.getCityNameById(student.cityId);
    studentJson.dataValues.schoolName = await string2Int.getSchoolNameById(student.schoolId);
    studentJson.dataValues.encryptedEmail = await Encryptor.encryptEmail(student.email);
    return studentJson;
}

module.exports = {
    formatStaffValues,
    formatStudentValues
};