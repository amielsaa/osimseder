import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const fetchAllSchools = async (cityId) => {
    const res = await axios.get(`${URL}/staff/schools/${cityId}`, headers);
    return processResult(res);
}


const addSchool = async (schoolName, cityId) => {
    const res = await axios.post(`${URL}/staff/schools`, {schoolName: schoolName, cityId: cityId} , headers);
    return processResult(res);
}


const editSchool = async (schoolId, newSchoolName) => {
    const res = await axios.put(`${URL}/staff/schools/${schoolId}`, {schoolName: newSchoolName}, headers);
    return processResult(res);
}

const deleteSchool = async (schoolId) => {
    const res = await axios.delete(`${URL}/staff/schools/${schoolId}`, headers);
    return processResult(res);
}

const fetchAllAreas = async (cityId) => {
    const res = await axios.get(`${URL}/staff/areas/${cityId}`, headers);
    return processResult(res);
}


const addArea = async (areaName, cityId) => {
    const res = await axios.post(`${URL}/staff/areas`, {areaName: areaName, cityId: cityId} , headers);
    return processResult(res);
}


const editArea = async (areaId, newAreaName) => {
    const res = await axios.put(`${URL}/staff/areas/${areaId}`, {areaName: newAreaName}, headers);
    return processResult(res);
}

const deleteArea = async (areaId) => {
    const res = await axios.delete(`${URL}/staff/areas/${areaId}`, headers);
    return processResult(res);
}



const fetchAllCities = async () => {
    const res = await axios.get(`${URL}/staff/cities`, headers);
    return processResult(res);
}

const addCity = async (cityName) => {
    const res = await axios.post(`${URL}/staff/cities`, {cityName: cityName} , headers);
    return processResult(res);
}


const editCity = async (cityId, newCityName) => {
    const res = await axios.put(`${URL}/staff/cities/${cityId}`, {cityName: newCityName}, headers);
    return processResult(res);
}

const deleteCity = async (cityId) => {
    const res = await axios.delete(`${URL}/staff/cities/${cityId}`, headers);
    return processResult(res);
}

const processResult = (res) => {
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}



export {fetchAllSchools, addSchool, editSchool, deleteSchool,
        fetchAllCities, addCity, editCity, deleteCity,
        fetchAllAreas, addArea, editArea, deleteArea}