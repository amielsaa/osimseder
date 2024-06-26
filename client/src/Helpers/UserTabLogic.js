import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};

// This function will return all the volunteers in the system by the requester's access level
// C+
// Input: filterByDict - a dictionary of filters to apply to the query
//          For example: {cityId: 1, FirstName: 'יעקב'}
// Output: a list of all volunteers 
const getAllVolunteers = async (filterByDict) => {
    const res = await axios.get(`${URL}/auth/getAllStudents`, { filterBy: filterByDict }, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

// This function will return all the volunteers in the system by the requester's access level
// C+
// Input: filterByDict - a dictionary of filters to apply to the query
//          For example: {cityId: 1, FirstName: 'יעקב'}
// Output: a list of all volunteers 
const getAllStaffs = async (filterByDict) => {
    const res = await axios.get(`${URL}/auth/getAllStaffs`, /*{ filterBy: filterByDict },*/ headers);
    if (res.data.error) {
        alert(res.data.error)
    } else {
        return res.data;
    }
}

// This function will remove a volunteer from the system
// E+
// Input: email - the email of the volunteer to remove
// Output: true if the volunteer was removed successfully, false otherwise
const removeVolunteer = async (email) => {
    const res = await axios.delete(`${URL}/auth/deleteStudent/${email}`, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

// This function will remove a staff from the system
// E+
// Input: email - the email of the staff to remove
// Output: true if the staff was removed successfully, false otherwise
const removeStaff = async (email) => {
    const res = await axios.delete(`${URL}/auth/deleteStaff/${email}`, headers)
    if (res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

// This function will add a new volunteer to the system
// D+
// Input: newVolunteerData - a dictionary containing the new volunteer's data
//          For example: {FirstName: 'יעקב', LastName: 'כהן', ...}
// Output: true if the volunteer was added successfully, false otherwise
const adminAddVolunteer = async (newVolunteerData) => {
    const res = await axios.put(`${URL}/auth/addVolunteer`, { newVolunteerData: newVolunteerData }, headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

// This function will add a new staff to the system
// D+
// Input: newStaffData - a dictionary containing the new staff's data
//          For example: {FirstName: 'יעקב', LastName: 'כהן', ...}
// Output: true if the staff was added successfully, false otherwise
const adminAddStaff = async (newStaffData) => {
    const res = await axios.put(`${URL}/auth/addStaff`, { newStaffData: newStaffData }, headers);
    if(res.data.error) {
        alert(res.data.error);
        return false;
    } else {
        return true;
    }
}

// This function will edit a volunteer in the system
// D+
// Input: email - the email of the volunteer to edit
//        newVolunteerData - a dictionary containing the new volunteer's data
//          For example: {FirstName: 'יעקב', LastName: 'כהן', ...}
// Output: true if the volunteer was edited successfully, false otherwise
const editVolunteer = async (email, newVolunteerData) => {
    const res = await axios.get(`${URL}/auth/updateVolunteer/${email}`, { newVolunteerData: newVolunteerData }, headers)
    if (res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

// This function will edit a staff in the system
// D+
// Input: email - the email of the staff to edit
//        newStaffData - a dictionary containing the new staff's data
//          For example: {FirstName: 'יעקב', LastName: 'כהן', ...}
// Output: true if the staff was edited successfully, false otherwise
const editStaff = async (email, newStaffData) => {
    const res = await axios.get(`${URL}/auth/updateStaff/${email}`, { newStaffData: newStaffData }, headers)
    if (res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

// This function will approve a staff role in the system
// C+
// Input: email - the email of the staff to approve
//        alternateRole - the alternate role of the staff   ARI
// Output: true if the staff was approved successfully, false otherwise
const approveStaffRole = async (email, alternateRole) => {
    const res = await axios.post(`${URL}/auth/approveStaff/${email}`, { alternateRole: alternateRole },headers);
    if(res.data.error) {
        alert(res.data.error);
    } else {
        return res.data;
    }
}

export {
    getAllStaffs, getAllVolunteers, removeVolunteer, adminAddVolunteer, editVolunteer, adminAddStaff, removeStaff , editStaff, approveStaffRole
}