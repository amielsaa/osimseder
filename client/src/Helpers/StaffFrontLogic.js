import axios from 'axios';

const URL = 'https://osimseder.onrender.com/api';
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

export {fetchAllGroupsStaff, fetchAllSchoolsByCity, addGroup}