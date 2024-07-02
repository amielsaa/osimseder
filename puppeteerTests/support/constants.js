module.exports = {
    urls: {
        loginPage: 'http://localhost:3000',
        signup: 'http://localhost:3000/register',
        home: 'http://localhost:3000/Home',
        personalPage: 'http://localhost:3000/Personal',
        editPersonalPage: 'http://localhost:3000/logout', //TODO - Change this to the correct URL
        editPasswordPage: 'http://localhost:3000/logout', //TODO - Change this to the correct URL
        housePage: 'http://localhost:3000/housePage',
        groupPage: 'http://localhost:3000/GroupPage',
        allGroups: 'http://localhost:3000/Groups',
        staff: {
            allHouses: 'http://localhost:3000/My-Houses',
            addHouse: 'http://localhost:3000/addHouse',
            addTask: 'http://localhost:3000/addTask',
            editHouse: 'http://localhost:3000/editHouse',
            allGroups: 'http://localhost:3000/My-Groups',
            addGroup: 'http://localhost:3000/addGroup',
            allVolunteers: 'http://localhost:3000/staff/volunteers', //TODO - Change this to the correct URL
            allStaffs: 'http://localhost:3000/staff/staff', //TODO - Change this to the correct URL
            allLocations: 'http://localhost:3000/staff/locations' //TODO - Change this to the correct URL
        }

    },
    selectors: {
        volunteer: {
            tabs: {
                burgerMenu: 'xpath///nav[1]/button[1]/div[1]', //
                homePage: '#home',
                personal: 'a:has-text("פרטים אישיים")',
                logout: 'a:has-text("התנתק/י ")',
                houses: '#houses',
                specificGroup: '#specificGroup',
                specificHouse: '#specificHouse',
                volunteer: {
                    groups: 'xpath///nav[1]/ul[1]/li[1]/a[1]', //
                    myGroup: 'xpath///nav[1]/ul[1]/li[2]/a[1]',  // New selector for the My Group button based on text content
                    personal: 'xpath///nav[1]/ul[1]/li[3]/a[1]', //
                    logout: 'xpath///nav[1]/ul[1]/li[4]/a[1]' //
                }
            }
        },
        staff: {
            tabs: {
                burgerMenu: 'xpath///nav[1]/button[1]/div[1]', //
                homePage: '#home',
                personal: 'a:has-text("פרטים אישיים")',
                logout: 'a:has-text("התנתק/י ")',
                houses: '#houses',
                specificGroup: '#specificGroup',
                specificHouse: '#specificHouse',
                volunteer: {
                    groups: 'xpath///nav[1]/ul[1]/li[1]/a[1]', //
                    myGroup: 'xpath///nav[1]/ul[1]/li[2]/a[1]',  // New selector for the My Group button based on text content
                    personal: 'xpath///nav[1]/ul[1]/li[3]/a[1]', //
                    logout: 'xpath///nav[1]/ul[1]/li[4]/a[1]' //
                }
            myGroups: '#myGroups',
            myHouses: '#myHouses',
            addHouse: '#addHouse',
            addTask: '#addTask',
            editHouse: '#editHouse',
            allGroups: '#allGroups',
            addGroup: '#addGroup',
            allVolunteers: '#allVolunteers',
            allStaffs: '#allStaffs',
            allLocations: '#allLocations',
            logout: '#logout'
        },
        login: {
            emailInput: 'input[name="email"]',
            passwordInput: 'input[name="password"]',
            loginButton: 'xpath///form[1]/div[4]/button[1]',
            missingUsernameMessage: '#missingUsernameMessage',
            missingPasswordMessage: '#missingPasswordMessage',
            invalidLoginMessage: '.error-message',
            signupButton: '#signupButton',
            signupLink: 'a[href="/register"]' // Updated selector for the signup link

        },
        signupVolunteer: {
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
        signupStaff: {
            emailInput: 'input[name="email"]',
            firstNameInput: 'input[name="firstName"]',
            lastNameInput: 'input[name="lastName"]',
            passwordInput: 'input[name="password"]',
            confirmPasswordInput: 'input[name="confirmPassword"]',
            phoneNumberInput: 'input[name="phoneNumber"]',
            genderSelect: 'select[name]',
            citySelect: 'select[name="city"]',
            roleSelect: 'select[name="role"]',
            signupButton: '#signupButton',
            confirmationMessage: '#confirmationMessage',
            errorMessage: '#errorMessage'
        },
        //TODO - continue from here  YOAV
        personal: {
            editButton: '#editPersonalButton',
            saveButton: '#savePersonalButton',
            passwordEditButton: '#editPasswordButton',
            savePasswordButton: '#savePasswordButton'
        },
        house: {
            addHouseButton: '#addHouseButton',
            editHouseButton: '.editHouseButton',
            deleteHouseButton: '.deleteHouseButton',
            houseNameInput: 'input[name="houseName"]',
            houseAddressInput: 'input[name="houseAddress"]',
            saveHouseButton: '#saveHouseButton'
        },
        group: {
            joinGroupButton: '.joinGroupButton',
            changeGroupButton: '#changeGroupButton',
            groupNameInput: 'input[name="groupName"]',
            saveGroupButton: '#saveGroupButton'
        },
        chore: {
            addChoreButton: '#addChoreButton',
            editChoreButton: '.editChoreButton',
            deleteChoreButton: '.deleteChoreButton',
            choreNameInput: 'input[name="choreName"]',
            choreStatusSelect: 'select[name="choreStatus"]',
            saveChoreButton: '#saveChoreButton'
        },
        staff: {
            approveStaffButton: '.approveStaffButton',
            approveVolunteerButton: '.approveVolunteerButton',
            filterAreaSelect: 'select[name="filterArea"]'
        },
        admin: {

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
