import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const handleJoinGroup = (groupId, userId) => 
    axios.post(`${URL}/student/groups/join/${groupId}`,{id:userId},{headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
    })   
//Amiel handle leave group !!!


const fetchAllGroupsBySchool = async (user) => {
  if (user.role === "Student") {
    const res = await axios.post('http://localhost:3001/api/student/groups/',{schoolId:user.schoolId},{headers: {accessToken: localStorage.getItem('accessToken')}} );
    if(res.data.error) {alert(res.data.error)};
    return res.data.groups;

    // axios.post('http://localhost:3001/api/student/groups/',{schoolId:user.schoolId},{headers: {accessToken: localStorage.getItem('accessToken')}} ).then((res) => {
    //   //setGroupIds(res.body.groups);
    //   if(res.data.error) {alert(res.data.error)};
    //   return res.data.groups;
    // })
    // Amiel - get all the groups from this student's school!   
  } else if (user.role === "TeamOwner") {
    // Amiel - get all the groups that the team owner can manage - teams from his city.
  }
}

const fetchGroupById = async (groupId) => {
  const res = await axios.get(`${URL}/student/groups/${groupId}`, headers);
  //.then((res) => {
  if(res.data.error) {alert(res.data.error)};
  return res.data.group
  //})
}

const fetchAllSchoolsByCityForRegister = async (cityName) => {
  const res = await axios.post(`${URL}/staff/groups/schools_for_register`, {city:cityName});
  if(res.data.error) {
      alert(res.data.error);
  } else {
      return res.data;
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


export {fetchAllSchoolsByCityForRegister, handleJoinGroup, fetchAllGroupsBySchool, fetchGroupById, fetchAllCities}