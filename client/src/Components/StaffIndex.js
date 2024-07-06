import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import StaffTable from './StaffTable';
import { approveStaffRole, removeStaff, getAllStaffs, accessToRoleName } from '../Helpers/UserTabLogic'


const exampleUsers = [
  {
    firstName: 'יוחנן',
    lastName: 'כהן',
    role: 'TeamOwner',
    phoneNumber: '123-456-7890',
    cityName: 'תל אביב',
    gender: 'זכר',
    confirmationStatus: true
  },
  {
    firstName: 'אמה',
    lastName: 'לוי',
    role: 'AreaManager',
    phoneNumber: '234-567-8901',
    cityName: 'ירושלים',
    gender: 'נקבה',
    confirmationStatus: false,
    area: 'Jerusalem'
  },
  {
    firstName: 'נועם',
    lastName: 'ישראלי',
    role: 'AreaManager',
    phoneNumber: '345-678-9012',
    cityName: 'חיפה',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Haifa'
  },
  {
    firstName: 'יעל',
    lastName: 'בראון',
    role: 'CityManager',
    phoneNumber: '456-789-0123',
    cityName: 'באר שבע',
    gender: 'נקבה',
    confirmationStatus: false
  },
  {
    firstName: 'איתי',
    lastName: 'שמעוני',
    role: 'TeamOwner',
    phoneNumber: '567-890-1234',
    cityName: 'אשדוד',
    gender: 'זכר',
    confirmationStatus: true
  },
  {
    firstName: 'דניאל',
    lastName: 'גולן',
    role: 'AreaManager',
    phoneNumber: '678-901-2345',
    cityName: 'תל אביב',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Tel Aviv'
  },
  {
    firstName: 'שירה',
    lastName: 'לוין',
    role: 'CityManager',
    phoneNumber: '789-012-3456',
    cityName: 'חיפה',
    gender: 'נקבה',
    confirmationStatus: true
  },
  {
    firstName: 'אלעד',
    lastName: 'גרין',
    role: 'CityManager',
    phoneNumber: '890-123-4567',
    cityName: 'ירושלים',
    gender: 'זכר',
    confirmationStatus: false
  },
  {
    firstName: 'איתן',
    lastName: 'רז',
    role: 'AreaManager',
    phoneNumber: '901-234-5678',
    cityName: 'באר שבע',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Beersheba'
  },
  {
    firstName: 'מאיה',
    lastName: 'כהן',
    role: 'TeamOwner',
    phoneNumber: '012-345-6789',
    cityName: 'תל אביב',
    gender: 'נקבה',
    confirmationStatus: false
  }
];

  

const StaffIndex = () => {
  const [users, setusers] = useState(exampleUsers)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationUserDeletion, setShowConfirmationUserDeletion] = useState(false);
  const [showConfirmationUserAcceptance, setShowConfirmationUserAcceptance] = useState(false);
  const [filter, setFilter] = useState('');
  const [filterType, setFilterType] = useState('firstName');
  const [chosenStaff, setChosenStaff] = useState('');
  const { navigate, user } = useContext(DataContext);

    useEffect(() => {
        // Yoav - you need to get all the users from the server and put them in the users state
        // console.log(Object.values(myStaffs))
      updateUsers();
    }, [])
  
  async function updateUsers() {
    const myStaffs = await getAllStaffs(null)
    setusers(myStaffs)
  }
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  
  
    function onApproveStaffMember(userData) {
    const staff = {
        email: userData.email,
      firstName: userData.firstName,
      lastName: userData.lastName,
      accesses: userData.accesses,
      cityName: userData.cityName,
      role: accessToRoleName(userData.accesses)
  }
    setChosenStaff(staff)
    setShowConfirmationUserAcceptance(true)

  }
  
  
    function prepareDeleteStaffAction(userData) {
     setChosenStaff(userData)
     setShowConfirmationUserDeletion(true)
   }

    function removeStaffFromUserList() {
      setusers(users.filter(user => user.email !== chosenStaff.email));
    }
 
    function handleDeleteUserConfirmation() {
        const res = removeStaff(chosenStaff.email); // ARI - need to use res? 
        if(res) {
          removeStaffFromUserList()
        }
        setShowConfirmationUserDeletion(false)
  }
    async function handleAcceptUserConfirmation() {
        const alternateRole = null // ARI - OPTIONAL : get the alternate role for the accepted user
        const res = await approveStaffRole(chosenStaff.email, alternateRole)// ARI - need to use res?
        updateUsers()
        setShowConfirmationUserAcceptance(false)
  }


  

  const filteredUsers = users.filter((user) => {
    if (filterType === 'firstName') {
      return user.firstName.includes(filter);
    } else if (filterType === 'accesses') {
      return accessToRoleName(user.accesses).includes(filter);
    } else if (filterType === 'cityId') {
      return user.cityId.includes(filter);
    }
    return false;
  });

  return (
    <>
      <Header />
      <Nav />
      <div className='content-box-users-index'>
        <div className='users-title'>
          <h1>טבלת סגל</h1>
        </div>
        <div className='filter-container'>
          <div className='filter-box'>
            <input
                type='text'
                value={filter}
                onChange={handleFilterChange}
                placeholder='חפש'
            />
            <select value={filterType} onChange={handleFilterTypeChange}>
                <option value='firstName'>שם</option>
                <option value='accesses'>תפקיד</option>
                <option value='cityName'>עיר</option>
            </select>
          </div>
        </div>




        <StaffTable users={filteredUsers} prepareDeleteStaffAction={prepareDeleteStaffAction} onApproveStaffMember={onApproveStaffMember} />
      </div>



      {showConfirmationUserDeletion && (
        <ConfirmationMessage
          confirmationMessage={`האם למחוק את ${chosenStaff.firstName + " " + chosenStaff.lastName } מהמערכת?`}
          handleConfirmation={handleDeleteUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      {showConfirmationUserAcceptance && (
        <ConfirmationMessage
          confirmationMessage={`האם לאשר את ${chosenStaff.firstName + " " + chosenStaff.lastName } לתפקיד ${chosenStaff.role} במערכת?`}
          handleConfirmation={handleAcceptUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      <Footer />
    </>
  );
};

export default StaffIndex;
