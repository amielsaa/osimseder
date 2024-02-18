
const accessGroup = {
    A: ["Student","TeamOwner","AreaManager","CityManager","Admin"],
    B: ["TeamOwner","AreaManager","CityManager","Admin"],
    C: ["AreaManager","CityManager","Admin"],
    D: ["CityManager","Admin"],
    E: ["Admin"],
}

const validateAccess = (permissions) => {
    return (req,res,next) => {
        if(permissions.includes(req.user.role)) {
            next();
        } else {
            res.json({error:"You don't have the permission to perform this action!"})
        }
    }
}

module.exports = {accessGroup, validateAccess}