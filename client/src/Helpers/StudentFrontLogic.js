import axios from 'axios';

const URL = 'http://localhost:3001';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};

const handleJoinGroup = (groupId, userId) => {
    return () => {
        axios.post(`${URL}/student/groups/join/${groupId}`,{id:userId},{headers: {accessToken: localStorage.getItem('accessToken')}}).then((res) => {
        console.log(res);
      })
    }
  //Amiel - Student joins in a group backend logic.
}

export {handleJoinGroup}