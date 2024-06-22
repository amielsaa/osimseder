import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import StaffTable from './StaffTable';
import { approveStaffRole, removeStaff } from '../Helpers/UserTabLogic'


const exampleUsers = [
  {
    name: 'יוחנן',
    lastName: 'כהן',
    role: 'TeamOwner',
    phoneNumber: '123-456-7890',
    city: 'תל אביב',
    gender: 'זכר',
    confirmationStatus: true
  },
  {
    name: 'אמה',
    lastName: 'לוי',
    role: 'AreaManager',
    phoneNumber: '234-567-8901',
    city: 'ירושלים',
    gender: 'נקבה',
    confirmationStatus: false,
    area: 'Jerusalem'
  },
  {
    name: 'נועם',
    lastName: 'ישראלי',
    role: 'AreaManager',
    phoneNumber: '345-678-9012',
    city: 'חיפה',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Haifa'
  },
  {
    name: 'יעל',
    lastName: 'בראון',
    role: 'CityManager',
    phoneNumber: '456-789-0123',
    city: 'באר שבע',
    gender: 'נקבה',
    confirmationStatus: false
  },
  {
    name: 'איתי',
    lastName: 'שמעוני',
    role: 'TeamOwner',
    phoneNumber: '567-890-1234',
    city: 'אשדוד',
    gender: 'זכר',
    confirmationStatus: true
  },
  {
    name: 'דניאל',
    lastName: 'גולן',
    role: 'AreaManager',
    phoneNumber: '678-901-2345',
    city: 'תל אביב',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Tel Aviv'
  },
  {
    name: 'שירה',
    lastName: 'לוין',
    role: 'CityManager',
    phoneNumber: '789-012-3456',
    city: 'חיפה',
    gender: 'נקבה',
    confirmationStatus: true
  },
  {
    name: 'אלעד',
    lastName: 'גרין',
    role: 'CityManager',
    phoneNumber: '890-123-4567',
    city: 'ירושלים',
    gender: 'זכר',
    confirmationStatus: false
  },
  {
    name: 'איתן',
    lastName: 'רז',
    role: 'AreaManager',
    phoneNumber: '901-234-5678',
    city: 'באר שבע',
    gender: 'זכר',
    confirmationStatus: true,
    area: 'Beersheba'
  },
  {
    name: 'מאיה',
    lastName: 'כהן',
    role: 'TeamOwner',
    phoneNumber: '012-345-6789',
    city: 'תל אביב',
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
  const [filterType, setFilterType] = useState('name');
  const [chosenStaff, setChosenStaff] = useState('');
  const { navigate, user } = useContext(DataContext);

  
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  
  
  function onApproveStaffMember(userId, userName, userLastName, role) {
    const staff = {
      userId: userId,
      userName: userName,
      userLastName: userLastName,
      role: role
  }
    setChosenStaff(staff)
    setShowConfirmationUserAcceptance(true)

  }
  
  
  function prepareDeleteStaffAction(userId, userName, userLastName) {
    
     const staff = {
       userId: userId,
       userName: userName,
       userLastName: userLastName,
   }
     
     setChosenStaff(staff)
     setShowConfirmationUserDeletion(true)
   }
 


    function handleDeleteUserConfirmation() {
        const res = removeStaff(chosenStaff.userId) // ARI - need to use res? 
        setShowConfirmationUserDeletion(false)
  }
    function handleAcceptUserConfirmation() {
        const alternateRole = null // ARI - OPTIONAL : get the alternate role for the accepted user
        const res = approveStaffRole(chosenStaff.userId, alternateRole)// ARI - need to use res?
        setShowConfirmationUserAcceptance(false)
  }


  

  const filteredUsers = users.filter((user) => {
    if (filterType === 'name') {
      return user.name.includes(filter);
    } else if (filterType === 'role') {
      return user.role.toLowerCase().includes(filter.toLowerCase());
    } else if (filterType === 'city') {
      return user.city.includes(filter);
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
                <option value='name'>שם</option>
                <option value='role'>תפקיד</option>
                <option value='city'>עיר</option>
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
