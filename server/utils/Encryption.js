const bcrypt = require('bcrypt');
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/;

// bcrypt hashes a password and it is not reversable

const encryptPassword = (password) => {
    if (!passwordRegex.test(password)) {
        return Error("Password is too weak");
    } else {
        bcrypt.hash(password, 8)
        .then((res) => {return res})
    }
}

const ComparePasswords = (password, hashedPassword) => {
    return bcrypt.compareSync(password, hashedPassword);
}

module.exports = {encryptPassword, ComparePasswords}