const crypto = require('crypto');
const key = "AriGeverRetzah";

// XOR encryption/decryption function
function xorEncryptDecrypt(data, key) {
    let result = Buffer.alloc(data.length);
    for (let i = 0; i < data.length; i++) {
        result[i] = data[i] ^ key[i % key.length];
    }
    return result;
}

// Encode the encrypted email in base64
function encodeBase64(data) {
    return Buffer.from(data).toString('base64');
}

// Encode the email address using XOR and then encode in base64
function encryptEmail(email) {
    const encryptedEmail = xorEncryptDecrypt(Buffer.from(email), Buffer.from(key));
    return encodeBase64(encryptedEmail);
}

// Decode the base64 encoded data
function decodeBase64(encodedData) {
    return Buffer.from(encodedData, 'base64');
}

// Decrypt the email address using XOR and then decode from base64
function decryptEmail(encodedEmail) {
    const decodedEmail = decodeBase64(encodedEmail);
    const decryptedEmail = xorEncryptDecrypt(decodedEmail, Buffer.from(key));
    return decryptedEmail.toString();
}

// Example usage
/* const email = "student7@gmail.com";

// Encrypt the email address
const encryptedEmail = encryptEmail(email);
console.log("Encrypted email:", encryptedEmail);

// Decrypt the email address
const decryptedEmail = decryptEmail(encryptedEmail);
console.log("Decrypted email:", decryptedEmail); */
module.exports = {
    encryptEmail,
    decryptEmail
};