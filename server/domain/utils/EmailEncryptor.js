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

// Encode the encrypted email in hexadecimal
function encodeHex(data) {
    return Buffer.from(data).toString('hex');
}

// Encode the email address using XOR and then encode in hexadecimal
function encryptEmail(email) {
    const encryptedEmail = xorEncryptDecrypt(Buffer.from(email), Buffer.from(key));
    return encodeHex(encryptedEmail);
}

// Decode the hexadecimal encoded data
function decodeHex(encodedData) {
    return Buffer.from(encodedData, 'hex');
}

// Decrypt the email address using XOR and then decode from hexadecimal
function decryptEmail(encodedEmail) {
    const decodedEmail = decodeHex(encodedEmail);
    const decryptedEmail = xorEncryptDecrypt(decodedEmail, Buffer.from(key));
    return decryptedEmail.toString();
}

module.exports = {
    encryptEmail,
    decryptEmail
};