// models/houses.js
module.exports = (sequelize, DataTypes) => {
    const HouseInfo = sequelize.define('Houses', {
        HouseID: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        Address: DataTypes.STRING,
        ResidentName: DataTypes.STRING,
        PhoneNumber: DataTypes.STRING,
        NeedLanguageAssist: DataTypes.ENUM('Yes', 'No')
    });

    return HouseInfo;
};
