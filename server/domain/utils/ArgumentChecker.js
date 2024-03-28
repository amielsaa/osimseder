// ArgumentChecker.js
class ArgumentChecker {

    //parameterKeys = ["address", "residentLastName", "residentFirstName", "residentPhoneNum", "languageNeeded"];
// ^ Just what need to be checked, not all the parameters
    async checkByKeys(parameter, parameterName, parameterKeys = null) {
        if (parameter === undefined || parameter === null) {
            throw new Error(`Parameter ${parameterName} is undefined or null`);
        }
        if (parameterKeys) {
            for (let i = 0; i < parameterKeys.length; i++) {
                let keyName = parameterKeys[i];
                const param = parameter[keyName];
                if (param === undefined || param === null) {
                    throw new Error(`Value ${keyName} of argument ${parameterName} is undefined or null`);
                }
            }
        }
    }

    async checkSingleArugments(parameters, parametersNames) {
        for (let i = 0; i < parameters.length; i++) {
            if (parameters[i] === undefined || parameters[i] === null) {
                throw new Error(`Parameter ${parametersNames[i]} is undefined or null`);
            }
        }
    }
}

module.exports = new ArgumentChecker();


