import axios from 'axios';

const URL = 'http://localhost:3001';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const fetchAllGroupsStaff = async () => {
    const res = await axios.get(`${URL}/staff/groups/getgroups`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        console.log(res.data)
        return res.data;
    }
}

const fetchAllSchoolsByCity = async (cityName) => {
    const res = await axios.post(`${URL}/staff/groups/schools`, {city:cityName} ,headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        console.log(res.data);
        return res.data;
    }
}

const addGroup = async (cityName, schoolId, capacity) => {
    const res = await axios.post(`${URL}/staff/groups/`, {city:cityName, schoolId:schoolId, capacity:capacity} ,headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        console.log('adding group')
        return true;
    }
}

const fetchAllHouses = async () => {
    const res = await axios.get(`${URL}/staff/houses`, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        console.log(res.data);
        return res.data;
    }
}
const getHouseById = async (id) => {
    const res = await axios.get(`${URL}/staff/houses/${id}`, headers)
    if(res.data.error) {
        alert(res.data.error);
    } else {
        console.log(res.data);
        return res.data;
    }
}

const addHouse = async (information) => {
    const res = await axios.post(`${URL}/staff/houses`,information, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        console.log('adding house')
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
        console.log(res);
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

export {fetchAllAreasByCity, getTaskById, getTasksByHouseId, addTask, fetchAllGroupsStaff, getHouseById, addHouse, fetchAllHouses, fetchAllSchoolsByCity, addGroup}