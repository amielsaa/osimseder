import React, { useContext, useEffect, useState } from 'react';
import './css/UsersIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import UsersTable from './UsersTable';
import JoinGroupWindow from './JoinGroupWindow';
import DataContext from '../Helpers/DataContext';

const users = [
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
  

const UsersIndex = () => {
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

  const prepareJoinGroupAction = (userId, userName, userLastName, schoolName) => {
    const student = {
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
  function onDeleteStudent(userId) {
    // deletes user from the system
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
        <UsersTable users={filteredUsers} prepareJoinGroupAction={prepareJoinGroupAction} onDeleteStudent={onDeleteStudent} />
      </div>
      {showGroupsWindow &&  <JoinGroupWindow student={chosenStudent} onClose={onClose}  />}
      <Footer />
    </>
  );
};

export default UsersIndex;
