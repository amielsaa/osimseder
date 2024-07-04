import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const fetchAllGroupsStaff = async () => {
    const res = await axios.get(`${URL}/staff/groups/getgroups`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}

const fetchAllSchoolsByCity = async (cityName) => {
    const res = await axios.post(`${URL}/staff/groups/schools`, {city:cityName} ,headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const addGroup = async (cityName, schoolId, capacity) => {
    const res = await axios.post(`${URL}/staff/groups/`, {city:cityName, schoolId:schoolId, capacity:capacity} ,headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const fetchAllHouses = async () => {
    const res = await axios.get(`${URL}/staff/houses`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
const getHouseById = async (id) => {
    const res = await axios.get(`${URL}/staff/houses/${id}`, headers)
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const addHouse = async (information) => {
    const res = await axios.post(`${URL}/staff/houses`,information, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }

}

const updateHouse = async (information, id) => {
    const res = await axios.put(`${URL}/staff/houses/${id}`, information, headers)
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const fetchAllCities = async () => {
    const res = await axios.get(`${URL}/auth/cities_for_register`, headers)
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const fetchAllAreasByCity = async (city) => {
    const res = await axios.post(`${URL}/staff/houses/getareas`,{},headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const fetchAllAreasByCityRegisterStaff = async (city) => {
    const res = await axios.post(`${URL}/auth/getareas`,{},headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const addTask = async (data) => {
    const res = await axios.post(`${URL}/staff/tasks/`,data, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return true;
    }
}

const getTasksByHouseId = async (id) => {
    const res = await axios.get(`${URL}/staff/tasks/${id}`,headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const getTaskById = async (id) => {
    const res = await axios.post(`${URL}/staff/tasks/${id}`,{}, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const getAllGroupsWithoutHouse = async (schoolId) => {
    const res = await axios.post(`${URL}/staff/groups/emptygroups`,{schoolId: schoolId}, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const assignGroupToHouse = async (groupId, houseId) => {
    const res = await axios.post(`${URL}/staff/houses/${houseId}/${groupId}`,{},headers);
    if(res.data.error) { 
        return false; 
    }
    else { return true; }
}

const fetchGroupsForHouse = async (houseId) => {
    const res = await axios.get(`${URL}/staff/houses/getgroups/${houseId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data
    }
}

const removeGroupByHouse = async (groupId) => {
    const res = await axios.put(`${URL}/staff/groups/${groupId}`,{houseId:null},headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const updateTaskStatus = async (taskId, taskStatus) => {
    const res = await axios.put(`${URL}/staff/tasks/${taskId}`,{status:taskStatus}, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const getGroupById = async (groupId) => {
    const res = await axios.get(`${URL}/staff/groups/${groupId}`,headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}

const removeGroupMember = async (email) => {
    const res = await axios.put(`${URL}/staff/students/${email}`,{groupId:null}, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }

}

const getStudentsWithoutGroupBySchoolId = async (schoolId) => {
    const res = await axios.get(`${URL}/staff/students/getStudentsWithoutGroupBySchool/${schoolId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return res.data;
    }
}

const addGroupMember = async (email, groupId) => {
    const res = await axios.put(`${URL}/staff/students/addGroupMember/${email}`, { groupId: groupId }, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const fetchTeamOwners = async (cityName) => {
    const res = await axios.post(`${URL}/staff/staff/teamowners`,{cityName:cityName}, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}

const assignTeamOwner = async (email, index, id) => {
    if(index === 'A') {
        return updateHouse({teamOwnerEmail: email}, id);
    } else {
        return updateHouse({teamOwnerEmail_2: email}, id);
    }
}

const fetchTeamOwnerInfo = async (email) => {
    const res = await axios.post(`${URL}/staff/staff/staffinfo`, {staffEmail:email}, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const deleteHouse = async (houseId) => {
    const res = await axios.delete(`${URL}/staff/houses/${houseId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const deleteGroup = async (groupId) => {
    const res = await axios.delete(`${URL}/staff/groups/deleteGroup/${groupId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

const deleteTask = async (taskId) => {
    const res = await axios.delete(`${URL}/staff/tasks/${taskId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const registerStaff = async (staffData) => {
    const res = await axios.post(`${URL}/auth/register_staff`, staffData, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

const changeUserPasswordInPersonal = async (data) => {
    const res = await axios.post(`${URL}/auth/password_change_personal`, {password:data.currentPassword, newPassword:data.newPassword, isStudent:data.isStudent}, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    } 
}
const sendResetPasswordMail = async (email) => {
    console.log("WHAT", email)
    const res = await axios.post(`${URL}/auth/reset_password_login`, { email: email}, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    } 
}
const changeUserPasswordExternal = async (data) => {
    const res = await axios.post(`${URL}/auth/password_change_external`, { encryptedEmail: data.encryptedEmail, newPassword: data.newPassword }, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    } 
}
const changeUserDetails = async (data) => {
    
    const res = await axios.put(`${URL}/auth/edit_personal_details`, {userData:data} ,headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return res.data;
    } 
}

export {deleteHouse, deleteGroup, deleteTask, fetchTeamOwnerInfo, assignTeamOwner, fetchTeamOwners, updateHouse, removeGroupMember, getGroupById,
     updateTaskStatus, removeGroupByHouse, fetchGroupsForHouse,
      fetchAllAreasByCity, assignGroupToHouse, getAllGroupsWithoutHouse,
       getTaskById, getTasksByHouseId, addTask, fetchAllGroupsStaff,
    getHouseById, addHouse, fetchAllHouses, fetchAllSchoolsByCity, addGroup, getStudentsWithoutGroupBySchoolId
    , addGroupMember, fetchAllCities, registerStaff, changeUserPasswordInPersonal, sendResetPasswordMail, changeUserPasswordExternal, changeUserDetails, fetchAllAreasByCityRegisterStaff
}
