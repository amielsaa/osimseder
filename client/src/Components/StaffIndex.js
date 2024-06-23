import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import StaffTable from './StaffTable';
import { approveStaffRole, removeStaff, getAllStaffs } from '../Helpers/UserTabLogic'


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
        const myStaffs = getAllStaffs(null)
        setusers(myStaffs)
    }, [])
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  
  
    function onApproveStaffMember(email, userName, userLastName, role) {
    const staff = {
        email: email,
      firstName: userName,
      lastName: userLastName,
      accesses: role
  }
    setChosenStaff(staff)
    setShowConfirmationUserAcceptance(true)

  }
  
  
    function prepareDeleteStaffAction(email, userName, userLastName) {
    
     const staff = {
         email: email,
       userName: userName,
       userLastName: userLastName,
   }
     
     setChosenStaff(staff)
     setShowConfirmationUserDeletion(true)
   }
 


    function handleDeleteUserConfirmation() {
        const res = removeStaff(chosenStaff.email) // ARI - need to use res? 
        setShowConfirmationUserDeletion(false)
  }
    function handleAcceptUserConfirmation() {
        const alternateRole = null // ARI - OPTIONAL : get the alternate role for the accepted user
        const res = approveStaffRole(chosenStaff.email, alternateRole)// ARI - need to use res?
        setShowConfirmationUserAcceptance(false)
  }


  

  const filteredUsers = users.filter((user) => {
    if (filterType === 'firstName') {
      return user.firstName.includes(filter);
    } else if (filterType === 'accesses') {
      return user.accesses.includes(filter);
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
          confirmationMessage={`האם למחוק את ${chosenStaff.userName + " " + chosenStaff.userLastName } מהמערכת?`}
          handleConfirmation={handleDeleteUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      {showConfirmationUserAcceptance && (
        <ConfirmationMessage
          confirmationMessage={`האם לאשר את ${chosenStaff.userName + " " + chosenStaff.userLastName } לתפקיד ${chosenStaff.role} במערכת?`}
          handleConfirmation={handleAcceptUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      <Footer />
    </>
  );
};

export default StaffIndex;
