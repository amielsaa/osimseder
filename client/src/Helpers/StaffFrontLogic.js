import axios from 'axios';

const URL = 'http://localhost:3001';
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

}

const fetchAllAreasByCity = async (city) => {
    const res = await axios.post(`${URL}/staff/houses/getareas`,{},headers);
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
        console.log(res.data.error);
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

export {updateHouse, removeGroupMember, getGroupById, updateTaskStatus, removeGroupByHouse, fetchGroupsForHouse, fetchAllAreasByCity, assignGroupToHouse, getAllGroupsWithoutHouse, getTaskById, getTasksByHouseId, addTask, fetchAllGroupsStaff, getHouseById, addHouse, fetchAllHouses, fetchAllSchoolsByCity, addGroup}