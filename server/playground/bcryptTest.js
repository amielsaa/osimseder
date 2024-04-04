// bcryptTest.js

const bcrypt = require('bcrypt');

// Function to hash a password
async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error:", error);
    }
}

// List of names and passwords
const namesAndPasswords = [
    "Shirafuchs5453010!!",
    "Ronililling2044!!",
    "Ellalevishaked053216!!",
    "Ayalabernat8077!!",
    "Gilishalmon2.88888!!",
    "Yarinorion701328!!",
    "Shayzamir42028!!",
    "Oshratd12127005!!",
    "Gilx12307490!!",
    "Advabismut504606!!",
    "Ochayonmichal0557!!",
    "Itamarkaplan247355!!",
    "Korendanok54393!!",
    "Penkovmichel7327!!",
    "Ronny.benmelech15441!!",
    "Gidonlesinger5530!!",
    "Yoavi19483070!!",
    "Tehilacn08236!!",
    "Hodayaabu24688875!!",
    "Peleg.shultz1238506!!",
    "Edenyelizrov172878!!",
    "Shrb9341832!!",
    "Zucker.sapir4165!!",
    "Enemy1264!!",
    "Naamahamdi.191059!!",
    "David.hershkowitz123663!!",
    "Yuvalzur20051718!!"
];

// Hash passwords and print original and hashed passwords
async function hashAndPrintPasswords() {
    for (const password of namesAndPasswords) {
        const hashedPassword = await hashPassword(password);
        console.log(`${hashedPassword}`);
    }
}

// Call the hashAndPrintPasswords function
hashAndPrintPasswords();
   