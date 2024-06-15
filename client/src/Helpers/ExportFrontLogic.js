import axios from 'axios';

const URL = 'http://localhost:3001/api';
const headers = {headers: {accessToken: localStorage.getItem('accessToken')}};

const TABLES_HEADER = {
    "Areas": ["id", "areaName", "areaManagerEmail", "createdAt", "updatedAt", "cityId"],
    "Cities": ["id", "cityName", "cityManagerEmail", "createdAt", "updatedAt"],
    "Groups": ["id", "capacity", "createdAt", "updatedAt", "schoolId", "houseId"],
    "Houses": ["id", "teamOwnerEmail", "teamOwnerEmail_2", "address", "residentLastName", "residentFirstName", "residentPhoneNum", "residentAlternatePhoneNum", "residentGender", "languageNeeded", "numberOfRooms", "membersNeeded", "freeText", "createdAt", "updatedAt", "areaId", "cityId"],
    "Schools": ["id", "schoolName", "createdAt", "updatedAt", "cityId"],
    "Staffs": ["email", "password", "lastName", "firstName", "phoneNumber", "gender", "accesses", "isVerified", "createdAt", "updatedAt", "cityId" ],
    "Students": ["email", "password", "lastName", "firstName", "phoneNumber", "gender","parentName","parentPhoneNumber","issuesText", "isVerified","extraLanguage", "createdAt", "updatedAt", "cityId", "groupId", "schoolId" ],
    "Tasks": ["id", "type", "room","freeText", "status", "createdAt", "updatedAt", "houseId"],
};

const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    // Format to "YYYY-MM-DD HH:mm:ss.SSS+00"
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}+00`;
};

const downloadCSVs = async (tableNames) => {

    for (const tableName of tableNames) {
        try {
            const res = await axios.post(`${URL}/staff/export/`, { table: tableName }, headers);
            console.log(res.data);
            
            if (res.data.error) {
                alert(res.data.error);
                continue;
            }
            
            const data = res.data;
            const headersCSV = TABLES_HEADER[tableName];
            
            if (!headersCSV) {
                console.error(`No headers found for table: ${tableName}`);
                continue;
            }
            
            // Create CSV header
            const csvHeader = headersCSV.join(",") + "\n";
            
            // Create CSV content
            const csvContent = data.map(row => {
                return headersCSV.map(header => {
                    let value = row[header];
                    if (header.includes('At')) {
                        value = formatTimestamp(value);
                    }
                    return `"${value}"`; // Wrap each value in quotes to handle commas and special characters
                }).join(",");
            }).join("\n");
            
            const fullCsvContent = "\uFEFF" + csvHeader + csvContent; // Add BOM for UTF-8 encoding
            
            // Encode the CSV content
            const encodedURI = encodeURI("data:text/csv;charset=utf-8," + fullCsvContent);
            
            // Create a download link
            const link = document.createElement("a");
            link.setAttribute("href", encodedURI);
            link.setAttribute("download", `${tableName}.csv`);
            document.body.appendChild(link);
            link.click();
            
            // Wait for a short delay before removing the link
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Remove the link after downloading
            document.body.removeChild(link);
        } catch (error) {
            console.error(`Failed to export table: ${tableName}, reason: ${error.message}`);
        }
    }
};


export {downloadCSVs}