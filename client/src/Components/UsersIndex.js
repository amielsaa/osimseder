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

const UsersIndex = () => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationUserDeletion, setShowConfirmationUserDeletion] = useState(false);
  const [selectedUserToGroup, setSelectedUserToGroup] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [filter, setFilter] = useState('');
  const [showGroupsWindow, setShowGroupsWindow] = useState(false);
  const [filterType, setFilterType] = useState('firstName');
  const [chosenStudent, setChosenStudent] = useState('');
  const { navigate, user } = useContext(DataContext);

  useEffect(() => {
    updateUsers();
  }, []);

  const updateUsers = async () => {
    const myUsers = await getAllVolunteers(null);
    setUsers(myUsers);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  async function handleAddToTeamConfirmation() {
    const res = await addGroupMember(chosenStudent.email, selectedGroupId);
    if (res) {
      updateUsers();
    }
    setShowConfirmation(false);
    setShowGroupsWindow(false);
  }

  const prepareJoinGroupAction = async (email, userName, userLastName, schoolName) => {
    const student = {
      email: email,
      userName: userName,
      userLastName: userLastName,
      schoolName: schoolName,
    };
    const myGroups = await getAllAvailableGroupsForSchool(student.schoolName);
    setGroups(myGroups);
    setChosenStudent(student);
    setShowGroupsWindow(true);
  };

  function onClose() {
    setShowGroupsWindow(false);
  }

  function prepareDeleteStudentAction(email, userName, userLastName) {
    const student = {
      email: email,
      userName: userName,
      userLastName: userLastName,
      schoolName: chosenStudent.schoolName,
    };
    if (showGroupsWindow) {
      setShowGroupsWindow(false);
    }
    setChosenStudent(student);
    setShowConfirmationUserDeletion(true);
  }

  function removeChosenStudentFromList() {
    setUsers(users.filter((user) => user.email !== chosenStudent.email));
  }

  async function handleDeleteUserConfirmation() {
    const res = await removeVolunteer(chosenStudent.email);
    if (res) {
      removeChosenStudentFromList();
    }
    setShowConfirmationUserDeletion(false);
  }

  function onAddToGroup(groupId, email, userName, userLastName) {
    setSelectedGroupId(groupId);
    setSelectedUserToGroup(userName + ' ' + userLastName);
    setShowConfirmation(true);
  }

  const filteredUsers = users.filter((user) => {
    if (filterType === 'firstName') {
      return user.firstName.includes(filter);
    } else if (filterType === 'schoolName') {
      return user.schoolName.includes(filter);
    } else if (filterType === 'cityName') {
      return user.cityName.includes(filter);
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
        <UsersTable users={filteredUsers} prepareJoinGroupAction={prepareJoinGroupAction} prepareDeleteStudentAction={prepareDeleteStudentAction} />
      </div>
      {showGroupsWindow && (
        <JoinGroupWindow
          student={chosenStudent}
          groups={groups}
          onClose={onClose}
          onAddToGroup={onAddToGroup}
        />
      )}
      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`לשייך את ${selectedUserToGroup} לקבוצה מספר ${selectedGroupId}`}
          handleConfirmation={handleAddToTeamConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
      {showConfirmationUserDeletion && (
        <ConfirmationMessage
          confirmationMessage={`האם למחוק את ${chosenStudent.userName + ' ' + chosenStudent.userLastName} מהמערכת?`}
          handleConfirmation={handleDeleteUserConfirmation}
          setShowConfirmation={setShowConfirmationUserDeletion}
        />
      )}
      <Footer />
    </>
  );
};

export default UsersIndex;
