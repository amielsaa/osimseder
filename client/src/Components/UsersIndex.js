import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import UsersTable from './UsersTable';
import JoinGroupWindow from './JoinGroupWindow';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import { removeVolunteer, getAllVolunteers } from '../Helpers/UserTabLogic';
import { getAllAvailableGroupsForSchool } from '../Helpers/StudentFrontLogic';
import { addGroupMember } from '../Helpers/StaffFrontLogic';

const exampleUsers = [
    {
      firstName: 'יוחנן',
      lastName: 'כהן',
      phoneNumber: '123-456-7890',
      parentName: 'שרה כהן',
      parentPhoneNumber: '098-765-4321',
      cityName: 'תל אביב',
      schoolName: 'תיכון מרכזי',
      gender: 'זכר',
      extraLanguage: 'עברית',
      groupId: 1
    },
    {
      firstName: 'אמה',
      lastName: 'לוי',
      phoneNumber: '234-567-8901',
      parentName: 'משה לוי',
      parentPhoneNumber: '198-765-4321',
      cityName: 'ירושלים',
      schoolName: 'תיכון מערבי',
      gender: 'נקבה',
      extraLanguage: 'אנגלית',
      groupId: 2
    },
    {
      firstName: 'נועם',
      lastName: 'ישראלי',
      phoneNumber: '345-678-9012',
      parentName: 'הילה ישראלי',
      parentPhoneNumber: '297-654-3210',
      cityName: 'חיפה',
      schoolName: 'תיכון צפון',
      gender: 'זכר',
      extraLanguage: 'צרפתית',
      groupId: undefined
    },
    {
      firstName: 'יעל',
      lastName: 'בראון',
      phoneNumber: '456-789-0123',
      parentName: 'יהודה בראון',
      parentPhoneNumber: '396-543-2109',
      cityName: 'באר שבע',
      schoolName: 'תיכון דרום',
      gender: 'נקבה',
      extraLanguage: 'גרמנית',
      groupId: 3
    },
    {
      firstName: 'איתי',
      lastName: 'שמעוני',
      phoneNumber: '567-890-1234',
      parentName: 'מיכל שמעוני',
      parentPhoneNumber: '495-432-1098',
      cityName: 'אשדוד',
      schoolName: 'תיכון מזרח',
      gender: 'זכר',
      extraLanguage: 'איטלקית',
      groupId: undefined
    },
    {
      firstName: 'ליה',
      lastName: 'גרסיה',
      phoneNumber: '678-901-2345',
      parentName: 'דוד גרסיה',
      parentPhoneNumber: '594-321-0987',
      cityName: 'פתח תקווה',
      schoolName: 'תיכון מערב',
      gender: 'נקבה',
      extraLanguage: 'פורטוגזית',
      groupId: 1
    },
    {
      firstName: 'אילן',
      lastName: 'מרטינז',
      phoneNumber: '789-012-3456',
      parentName: 'לינדה מרטינז',
      parentPhoneNumber: '693-210-9876',
      cityName: 'ראשון לציון',
      schoolName: 'תיכון מרכזי',
      gender: 'זכר',
      extraLanguage: 'סינית',
      groupId: undefined
    },
    {
      firstName: 'אביגיל',
      lastName: 'הרננדז',
      phoneNumber: '890-123-4567',
      parentName: 'כריסטופר הרננדז',
      parentPhoneNumber: '792-109-8765',
      cityName: 'רמת גן',
      schoolName: 'תיכון צפון',
      gender: 'נקבה',
      extraLanguage: 'יפנית',
      groupId: 2
    },
    {
      firstName: 'ויליאם',
      lastName: 'לופז',
      phoneNumber: '901-234-5678',
      parentName: 'ברברה לופז',
      parentPhoneNumber: '891-098-7654',
      cityName: 'נתניה',
      schoolName: 'תיכון דרום',
      gender: 'זכר',
      extraLanguage: 'קוריאנית',
      groupId: 3
    },
    {
      firstName: 'סופיה',
      lastName: 'גונזלס',
      phoneNumber: '012-345-6789',
      parentName: 'ריצ\'רד גונזלס',
      parentPhoneNumber: '990-987-6543',
      cityName: 'הרצליה',
      schoolName: 'תיכון מזרח',
      gender: 'נקבה',
      extraLanguage: 'רוסית',
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
  const [filterType, setFilterType] = useState('firstName');
  const [chosenStudent, setChosenStudent] = useState('');
  const { navigate, user } = useContext(DataContext);

    useEffect(() => {
        // Yoav - you need to get all the users from the server and put them in the users state
        updateUsers();
    }, [])

  const updateUsers = async () => {
    const myUsers = await getAllVolunteers(null)
    setusers(myUsers)
  }
 
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  async function handleAddToTeamConfirmation() {
      //Yoav - you have const chosenStudent which has the studentId and you have the selectedGroupId. add the student to the seleceted group
      const res = await addGroupMember(chosenStudent.email, selectedGroupId); //ARI - need to use res?
      if(res) {
        updateUsers();
      }
      setShowConfirmation(false)
      setShowGroupsWindow(false)
      console.log("Im here!")
  }
  
  

  const prepareJoinGroupAction = async (email, userName, userLastName, schoolName) => {
    const student = {
        email: email,
        userName: userName,
        userLastName: userLastName,
        schoolName: schoolName
    }
    // Yoav - you need to get the schoolName of this userId and bring all the groups of his school. you need to put it in groups
    const myGroups = await getAllAvailableGroupsForSchool(student.schoolName)
    setGroups(myGroups);
    setChosenStudent(student)
    console.log("Im here!")
    setShowGroupsWindow(true);
    
  };
  function onClose () {
    setShowGroupsWindow(false)
  }
  function prepareDeleteStudentAction(email, userName, userLastName) {
    
     const student = {
       email: email,
       userName: userName,
       userLastName: userLastName,
       schoolName: chosenStudent.schoolName
   }
   
     if(showGroupsWindow) {
       setShowGroupsWindow(false)
     }
     setChosenStudent(student)
     setShowConfirmationUserDeletion(true)
   }
   
   function removeChosenStudentFromList() {
    setusers(users.filter((user) => user.email !== chosenStudent.email))
   }

    async function handleDeleteUserConfirmation() {
        const res = await removeVolunteer(chosenStudent.email) // ARI - need to use res? 
        if(res) {
          removeChosenStudentFromList();
        }
        console.log("Im here!")
        setShowConfirmationUserDeletion(false)
    }


    function onAddToGroup(groupId, email, userName, userLastName) {
    setSelectedGroupId(groupId);
    setSelectedUserToGroup(userName + " " + userLastName)
    setShowConfirmation(true);
  }

  const filteredUsers = users.filter((user) => {
    if (filterType === 'firstName') {
      return user.firstName.includes(filter);
    } else if (filterType === 'schoolName') {
      return user.schoolName.includes(filter);
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
                <option value='firstName'>שם</option>
                <option value='schoolName'>בית ספר</option>
                <option value='cityName'>עיר</option>
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
