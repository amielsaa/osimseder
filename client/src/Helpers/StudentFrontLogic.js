import axios from 'axios';

const URL = 'http://localhost:3001';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const handleJoinGroup = (groupId, userId) => {
    return () => {
        axios.post(`${URL}/student/groups/join/${groupId}`,{id:userId},{headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
      })
    }
  //Amiel - Student joins in a group backend logic.
}

const fetchAllGroupsBySchool = async (user) => {
  if (user.role === "Student") {
    const res = await axios.post('http://localhost:3001/student/groups/',{schoolId:user.schoolId},{headers: {accessToken: localStorage.getItem('accessToken')}} );
    if(res.data.error) {alert(res.data.error)};
    return res.data.groups;

    // axios.post('http://localhost:3001/student/groups/',{schoolId:user.schoolId},{headers: {accessToken: localStorage.getItem('accessToken')}} ).then((res) => {
    //   //setGroupIds(res.body.groups);
    //   if(res.data.error) {alert(res.data.error)};
    //   return res.data.groups;
    // })
    // Amiel - get all the groups from this student's school!   
  } else if (user.role === "TeamOwner") {
    console.log('imhere');
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


export {handleJoinGroup, fetchAllGroupsBySchool, fetchGroupById}