import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};

//usecase: view groups
const fetchAllGroupsStaff = async () => {
    const res = await axios.get(`${URL}/staff/groups/getgroups`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}
//usecase: addgroup, used by addGroup
const fetchAllSchoolsByCity = async (cityName) => {
    const res = await axios.post(`${URL}/staff/groups/schools`, {city:cityName} ,headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

//usecase: addgroup
const addGroup = async (cityName, schoolId, capacity) => {
    const res = await axios.post(`${URL}/staff/groups/`, {city:cityName, schoolId:schoolId, capacity:capacity} ,headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}
//usecase: view houses
const fetchAllHouses = async () => {
    const res = await axios.get(`${URL}/staff/houses`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: get house
const getHouseById = async (id) => {
    const res = await axios.get(`${URL}/staff/houses/${id}`, headers)
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

//usecase: add new house
const addHouse = async (information) => {
    const res = await axios.post(`${URL}/staff/houses`,information, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }

}

//usecase: update house
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

}

const fetchAllAreasByCity = async (city) => {
    const res = await axios.post(`${URL}/staff/houses/getareas`,{},headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: add new task
const addTask = async (data) => {
    const res = await axios.post(`${URL}/staff/tasks/`,data, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return true;
    }
}
//usecase: view tasks of house
const getTasksByHouseId = async (id) => {
    const res = await axios.get(`${URL}/staff/tasks/${id}`,headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: view task
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
//usecase: assign group to house
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
//usecase: remove assosiated group from house
const removeGroupByHouse = async (groupId) => {
    const res = await axios.put(`${URL}/staff/groups/${groupId}`,{houseId:null},headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}
//usecase: update task
const updateTaskStatus = async (taskId, taskStatus) => {
    const res = await axios.put(`${URL}/staff/tasks/${taskId}`,{status:taskStatus}, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: view group
const getGroupById = async (groupId) => {
    const res = await axios.get(`${URL}/staff/groups/${groupId}`,headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}
//usecase: remove group member from group
const removeGroupMember = async (email) => {
    const res = await axios.put(`${URL}/staff/students/${email}`,{groupId:null}, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }

}
//usecase: 
const getStudentsWithoutGroupBySchoolId = async (schoolId) => {
    const res = await axios.get(`${URL}/staff/students/getStudentsWithoutGroupBySchool/${schoolId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return res.data;
    }
}
//usecase: add group member to a group
const addGroupMember = async (email, groupId) => {
    const res = await axios.put(`${URL}/staff/students/addGroupMember/${email}`, { groupId: groupId }, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return res.data;
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
//usecase: assign team owner to a house
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
//usecase: delete house
const deleteHouse = async (houseId) => {
    const res = await axios.delete(`${URL}/staff/houses/${houseId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: delete group
const deleteGroup = async (groupId) => {
    const res = await axios.delete(`${URL}/staff/groups/deleteGroup/${groupId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}
//usecase: delete task
const deleteTask = async (taskId) => {
    const res = await axios.delete(`${URL}/staff/tasks/${taskId}`, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}
export {deleteHouse, deleteGroup, deleteTask, fetchTeamOwnerInfo, assignTeamOwner, fetchTeamOwners, updateHouse, removeGroupMember, getGroupById,
     updateTaskStatus, removeGroupByHouse, fetchGroupsForHouse,
      fetchAllAreasByCity, assignGroupToHouse, getAllGroupsWithoutHouse,
       getTaskById, getTasksByHouseId, addTask, fetchAllGroupsStaff,
    getHouseById, addHouse, fetchAllHouses, fetchAllSchoolsByCity, addGroup, getStudentsWithoutGroupBySchoolId
    , addGroupMember
}