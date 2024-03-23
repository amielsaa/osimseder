import axios from 'axios';

const URL = 'http://localhost:3001';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const decryptEmail = async (encryptedEmail) => {
    const res = await axios.get(`${URL}/auth/decryptEmail/${encryptedEmail}`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}


export {decryptEmail}