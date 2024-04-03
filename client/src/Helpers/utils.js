import axios from 'axios';

const URL = 'https://garineiudi.org.il/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};


const decryptEmail = async (encryptedEmail) => {
    const res = await axios.get(`${URL}/auth/decryptEmail/${encryptedEmail}`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}
const getUserByEmail = async (email) => {
    const res = await axios.get(`${URL}/auth/getUser/${email}`, headers);
    if(res.data.error) {
        alert(res.data.error)
    } else {
        return res.data.dataValues;
    }
}
const authenticateRegisterEmail = async (token, encryptedEmail) => {
    const res = await axios.post(`${URL}/auth/verify-email/${token}/${encryptedEmail}`, {}, headers);
    if (res.data.error) {
        return false;
    }
    else { return true; }
}


export {decryptEmail, getUserByEmail, authenticateRegisterEmail}