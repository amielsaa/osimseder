import axios from 'axios';

const URL = 'http://localhost:3001';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const fetchAllGroupsTeamOwner = async () => {
    const res = await axios.get(`${URL}/staff/groups/to`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        console.log(res.data);
        return res.data;
    }
}

export {fetchAllGroupsTeamOwner}