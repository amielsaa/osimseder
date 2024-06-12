import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import UsersTable from './UsersTable';
import JoinGroupWindow from './JoinGroupWindow';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';

const exampleUsers = [
    {
      name: 'יוחנן',
      lastName: 'כהן',
      phoneNumber: '123-456-7890',
      parentName: 'שרה כהן',
      parentPhoneNumber: '098-765-4321',
      city: 'תל אביב',
      school: 'תיכון מרכזי',
      gender: 'זכר',
      language: 'עברית',
      groupId: 1
    },
    {
      name: 'אמה',
      lastName: 'לוי',
      phoneNumber: '234-567-8901',
      parentName: 'משה לוי',
      parentPhoneNumber: '198-765-4321',
      city: 'ירושלים',
      school: 'תיכון מערבי',
      gender: 'נקבה',
      language: 'אנגלית',
      groupId: 2
    },
    {
      name: 'נועם',
      lastName: 'ישראלי',
      phoneNumber: '345-678-9012',
      parentName: 'הילה ישראלי',
      parentPhoneNumber: '297-654-3210',
      city: 'חיפה',
      school: 'תיכון צפון',
      gender: 'זכר',
      language: 'צרפתית',
      groupId: undefined
    },
    {
      name: 'יעל',
      lastName: 'בראון',
      phoneNumber: '456-789-0123',
      parentName: 'יהודה בראון',
      parentPhoneNumber: '396-543-2109',
      city: 'באר שבע',
      school: 'תיכון דרום',
      gender: 'נקבה',
      language: 'גרמנית',
      groupId: 3
    },
    {
      name: 'איתי',
      lastName: 'שמעוני',
      phoneNumber: '567-890-1234',
      parentName: 'מיכל שמעוני',
      parentPhoneNumber: '495-432-1098',
      city: 'אשדוד',
      school: 'תיכון מזרח',
      gender: 'זכר',
      language: 'איטלקית',
      groupId: undefined
    },
    {
      name: 'ליה',
      lastName: 'גרסיה',
      phoneNumber: '678-901-2345',
      parentName: 'דוד גרסיה',
      parentPhoneNumber: '594-321-0987',
      city: 'פתח תקווה',
      school: 'תיכון מערב',
      gender: 'נקבה',
      language: 'פורטוגזית',
      groupId: 1
    },
    {
      name: 'אילן',
      lastName: 'מרטינז',
      phoneNumber: '789-012-3456',
      parentName: 'לינדה מרטינז',
      parentPhoneNumber: '693-210-9876',
      city: 'ראשון לציון',
      school: 'תיכון מרכזי',
      gender: 'זכר',
      language: 'סינית',
      groupId: undefined
    },
    {
      name: 'אביגיל',
      lastName: 'הרננדז',
      phoneNumber: '890-123-4567',
      parentName: 'כריסטופר הרננדז',
      parentPhoneNumber: '792-109-8765',
      city: 'רמת גן',
      school: 'תיכון צפון',
      gender: 'נקבה',
      language: 'יפנית',
      groupId: 2
    },
    {
      name: 'ויליאם',
      lastName: 'לופז',
      phoneNumber: '901-234-5678',
      parentName: 'ברברה לופז',
      parentPhoneNumber: '891-098-7654',
      city: 'נתניה',
      school: 'תיכון דרום',
      gender: 'זכר',
      language: 'קוריאנית',
      groupId: 3
    },
    {
      name: 'סופיה',
      lastName: 'גונזלס',
      phoneNumber: '012-345-6789',
      parentName: 'ריצ\'רד גונזלס',
      parentPhoneNumber: '990-987-6543',
      city: 'הרצליה',
      school: 'תיכון מזרח',
      gender: 'נקבה',
      language: 'רוסית',
      groupId: undefined
    }
  ];
  const exampleGroups = [
    {
        groupId: 1,
        capacity: 10,
        membersCount: 7
    },
    {
        groupId: 2,
        capacity: 15,
        membersCount: 12
    },
    {
        groupId: 3,
        capacity: 20,
        membersCount: 20
    },
    {
        groupId: 4,
        capacity: 25,
        membersCount: 18
    },
    {
        groupId: 5,
        capacity: 30,
        membersCount: 25
    },
    {
        groupId: 6,
        capacity: 12,
        membersCount: 10
    },
    {
        groupId: 7,
        capacity: 18,
        membersCount: 15
    },
    {
        groupId: 8,
        capacity: 22,
        membersCount: 20
    },
    {
        groupId: 9,
        capacity: 14,
        membersCount: 8
    },
    {
        groupId: 10,
        capacity: 50,
        membersCount: 45
    }
];

const UsersIndex = () => {
  const [users, setusers] = useState(exampleUsers)
  const [groups, setGroups] = useState(exampleGroups)
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationUserDeletion, setShowConfirmationUserDeletion] = useState(false);
  const [selectedUserToGroup, setSelectedUserToGroup] = useState(null)
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [filter, setFilter] = useState('');
  const [showGroupsWindow, setShowGroupsWindow] = useState(false);
  const [filterType, setFilterType] = useState('name');
  const [chosenStudent, setChosenStudent] = useState('');
  const { navigate, user } = useContext(DataContext);

  
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  function handleAddToTeamConfirmation() {
    //Yoav - this is the logic where you put a student into group
    setShowConfirmation(false)
    setShowGroupsWindow(false)
    console.log("Im here!")
  }
  
  

  const prepareJoinGroupAction = (userId, userName, userLastName, schoolName) => {
    const student = {
        userId: userId,
        userName: userName,
        userLastName: userLastName,
        schoolName: schoolName
    }
    setChosenStudent(student)
    console.log("Im here!")
    setShowGroupsWindow(true);
    
  };
  function onClose () {
    setShowGroupsWindow(false)
  }
  function prepareDeleteStudentAction(userId, userName, userLastName) {
    
     const student = {
       userId: userId,
       userName: userName,
       userLastName: userLastName,
   }
     if(showGroupsWindow) {
       setShowGroupsWindow(false)
     }
     setChosenStudent(student)
     setShowConfirmationUserDeletion(true)
   }
 


  function handleDeleteUserConfirmation () {
    // deletes chosenUser from the system
    console.log("Im here!")
    setShowConfirmationUserDeletion(false)
  }


  function onAddToGroup(groupId, userId, userName, userLastName) {
    setSelectedGroupId(groupId);
    setSelectedUserToGroup(userName + " " + userLastName)
    setShowConfirmation(true);
  }

  const filteredUsers = users.filter((user) => {
    if (filterType === 'name') {
      return user.name.includes(filter);
    } else if (filterType === 'school') {
      return user.school.includes(filter);
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
          <h1>טבלת חניכים</h1>
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
                <option value='school'>בית ספר</option>
                <option value='city'>עיר</option>
            </select>
          </div>
        </div>




        <UsersTable users={filteredUsers}  prepareJoinGroupAction={prepareJoinGroupAction} prepareDeleteStudentAction={prepareDeleteStudentAction} />
      </div>



      {showGroupsWindow &&  <JoinGroupWindow student={chosenStudent} groups={groups} onClose={onClose} onAddToGroup={onAddToGroup}  />}




      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`לשייך את ${selectedUserToGroup} לקבוצה מספר ${selectedGroupId}`}
          handleConfirmation={handleAddToTeamConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
      {showConfirmationUserDeletion && (
        <ConfirmationMessage
          confirmationMessage={`האם למחוק את ${chosenStudent.userName + " " + chosenStudent.userLastName } מהמערכת?`}
          handleConfirmation={handleDeleteUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      <Footer />
    </>
  );
};

export default UsersIndex;
