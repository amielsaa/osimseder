module.exports = {
    fieldErrorMessage: '.error-message' ,
    urls: {
        loginPage: 'http://localhost:3000',
        signup: 'http://localhost:3000/register',
        home: 'http://localhost:3000/Home',
        personalPage: 'http://localhost:3000/Personal',
        editPersonalPage: 'http://localhost:3000/logout', //TODO
        editPasswordPage: 'http://localhost:3000/logout', //TODO
        house1Page: 'http://localhost:3000/HousePage/1',
        group1Page: 'http://localhost:3000/GroupPage/1',
        teamOwner1Page: 'http://localhost:3000/Personal/3517082a2a010b172054341d0c09281e47240a1b',
        allGroups: 'http://localhost:3000/Groups',
        staff: {
            allHouses: 'http://localhost:3000/My-Houses',
            addHouse: 'http://localhost:3000/addHouse',
            addTask: 'http://localhost:3000/addTask',
            editHouse: 'http://localhost:3000/editHouse',
            allGroups: 'http://localhost:3000/My-Groups',
            addGroup: 'http://localhost:3000/addGroup',
            allVolunteers: 'http://localhost:3000/staff/volunteers', //TODO
            allStaffs: 'http://localhost:3000/staff/staff', //TODO
            allLocations: 'http://localhost:3000/staff/locations' //TODO
        }

    },
    selectors: {
        volunteer: {
            tabs: {
                burgerMenu: 'xpath///nav[1]/button[1]/div[1]', 
                homePage: 'a[href="/Home"]',
                volunteer: {
                    groups: 'xpath///nav[1]/ul[1]/li[1]/a[1]', //
                    myGroup: 'xpath///nav[1]/ul[1]/li[2]/a[1]',  // New selector for the My Group button based on text content
                    personal: 'xpath///nav[1]/ul[1]/li[3]/a[1]', //
                    logout: 'xpath///nav[1]/ul[1]/li[4]/a[1]', //
                    invalid: 'xpath///nav[1]/ul[1]/li[5]/a[1]' // New selector for the Invalid selector
                }
            },
            login: {
                emailInput: 'xpath///form[1]/div[1]/input[1]',
                passwordInput: 'xpath///form[1]/div[2]/input[1]',
                loginButton: 'xpath///form[1]/div[4]/button[1]',
                signupLink: 'a=[href"/register"]' // Updated selector for the signup link
            },
            signup: {
                emailInput: 'input[name="email"]',
                firstNameInput: 'input[name="firstName"]',
                lastNameInput: 'input[name="lastName"]',
                passwordInput: 'input[name="password"]',
                confirmPasswordInput: 'input[name="confirmPassword"]',
                phoneNumberInput: 'input[name="phoneNumber"]',
                genderSelect: 'select[name="gender"]',
                parentNameInput: 'input[name="parentName"]',
                parentPhoneNumberInput: 'input[name="parentPhoneNumber"]',
                citySelect: 'select[name="city"]',
                languageSelect: 'select[name="languages"]',
                freeText: 'textarea[name="issuesText"]',
                signupButton: '.RegisterButton',
                confirmationMessage: '#confirmationMessage',
                errorMessage: '.error-message'
            },
            groups: {
                joinGroup1Button: 'xpath///div[2]/div[1]/button[2]',
                joinGroup2Button: 'xpath///div[2]/div[2]/button[2]',
                joinGroup2ButtonWHENinGroup1: 'xpath///div[2]/div[1]/button[2]',
                joinGroup3Button_invalid: 'xpath///div[2]/div[3]/button[2]',
                verifyJoinGroupButton: '.confirmation-modal button.confirmation-button:nth-of-type(2)',
                groupIsFull: 'xpath///div[2]/div[3]/p[1]'
            },
            myGroup: {
                navigateToHouse1: '.house_for_group'
            },
            personal: {
                editButton: '#editPersonalButton',
                saveButton: '#savePersonalButton',
                passwordEditButton: '#editPasswordButton',
                savePasswordButton: '#savePasswordButton'
            }
        },
        staff: {
            burgerMenu: 'xpath///nav[1]/button[1]/div[1]',
            homePage: 'a[href="/Home"]',//
            teamOwnerTabs: {
                houses: 'xpath///nav[1]/ul[1]/li[1]/a[1]', 
                personal: 'xpath///nav[1]/ul[1]/li[2]/a[1]', 
                logout: 'xpath///nav[1]/ul[1]/li[3]/a[1]', //
                invalid: 'xpath///nav[1]/ul[1]/li[4]/a[1]' 
            },
            managersTabs: {
                groups: 'xpath///nav[1]/ul[1]/li[1]/a[1]', 
                houses: 'xpath///nav[1]/ul[1]/li[2]/a[1]', 
                personal: 'xpath///nav[1]/ul[1]/li[3]/a[1]', 
                logout: 'xpath///nav[1]/ul[1]/li[4]/a[1]', //
                invalid: 'xpath///nav[1]/ul[1]/li[5]/a[1]' 
            },
            adminTabs: {
                groups: 'xpath///nav[1]/ul[1]/li[1]/a[1]', 
                houses: 'xpath///nav[1]/ul[1]/li[2]/a[1]',  
                volunteers: 'xpath///nav[1]/ul[1]/li[3]/a[1]', 
                staffs: 'xpath///nav[1]/ul[1]/li[4]/a[1]', 
                locations: 'xpath///nav[1]/ul[1]/li[5]/a[1]', 
                exportData: 'xpath///nav[1]/ul[1]/li[6]/a[1]', 
                logout: 'xpath///nav[1]/ul[1]/li[7]/a[1]', //
                invalid: 'xpath///nav[1]/ul[1]/li[8]/a[1]' 
            },
            login: {
                emailInput: 'xpath///form[1]/div[1]/input[1]',
                passwordInput: 'xpath///form[1]/div[2]/input[1]',
                loginButton: 'xpath///form[1]/div[4]/button[1]',
                signupLink: 'a=[href"/register-staff"]' // Updated selector for the signup link
            },
            signup: { //
                emailInput: 'input[name="email"]',
                firstNameInput: 'input[name="firstName"]',
                lastNameInput: 'input[name="lastName"]',
                passwordInput: 'input[name="password"]',
                confirmPasswordInput: 'input[name="confirmPassword"]',
                phoneNumberInput: 'input[name="phoneNumber"]',
                genderSelect: 'select[name="gender"]',
                roleSelect: 'input[name="role"]',
                citySelect: 'select[name="city"]',
                signupButton: '.RegisterButton',
                errorMessage: '.error-message'
            },
            groups: {

            },
            personal: {
                editButton: '#editPersonalButton',
                saveButton: '#savePersonalButton',
                passwordEditButton: '#editPasswordButton',
                savePasswordButton: '#savePasswordButton'
            },
            housechore: {
                addChoreButton: '#addChoreButton',
                editChoreButton: '.editChoreButton',
                deleteChoreButton: '.deleteChoreButton',
                choreNameInput: 'input[name="choreName"]',
                choreStatusSelect: 'select[name="choreStatus"]',
                saveChoreButton: '#saveChoreButton'
            },
            house: {
                addHouseButton: '#addHouseButton',
                editHouseButton: '.editHouseButton',
                deleteHouseButton: '.deleteHouseButton',
                houseNameInput: 'input[name="houseName"]',
                houseAddressInput: 'input[name="houseAddress"]',
                saveHouseButton: '#saveHouseButton'
            },
        }
    },
    loginDetails: {
        validVolunteer: { email: 'student1@gmail.com', password: 'validP1!' },
        validTeamOwner: { email: 'teamOwner1@gmail.com', password: 'validP1!' },
        validAreaManager: { email: 'amieleastbsv@gmail.com', password: 'validP1!' },
        validCityManager: { email: 'amielbsv@gmail.com', password: 'validP1!' },
        validAdmin: { email: 'admin@gmail.com', password: 'validP1!' }
    }
};
