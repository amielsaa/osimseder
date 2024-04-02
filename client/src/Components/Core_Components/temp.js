import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';
import {handleJoinGroup, fetchGroupById, fetchAllGroupsBySchool} from '../../Helpers/StudentFrontLogic'
import ConfirmationMessage from '../ConfirmationMessage';

const Group = ({ groupId , groupJson}) => {
  const {user} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const [memberCount, setMemberCount] = useState({capacity:0, memberCount:0})
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const openStudentsPopUp = () => {
    setStudentsPopUp(!studentsPopUp);

  };
  const toggleStatus = (id) => {
      // Display the confirmation message
      setShowConfirmation(true);
      setSelectedGroupId(id);
  };
  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      handleJoinGroup(groupId, user.id)
    }
    // Close the confirmation message
    setShowConfirmation(false);
    setSelectedGroupId(null);
  };

  useEffect(() => {
    const updateStudentList = async () => {
      const group = await fetchGroupById(groupId);
      setStudentsList(group.students);
      setMemberCount({capacity:group.capacity, memberCount:group.memberCount})
    }
    updateStudentList();
    //setStudentsList(groupJson.students);
  },[studentsList]);



  return (
    <>
      
      <div className="group">
        <div className='group-id'>{`${groupId} : קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        {user.role === "Student" &&
        <button className='join-group-btn' onClick={() => toggleStatus(groupId)}>הצטרף</button>
        }
        <div className='students-Count'>{memberCount.memberCount}/{memberCount.capacity}</div>
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}  


      {showConfirmation && (
        <ConfirmationMessage confirmationMessage={`האם אתה בטוח שתרצה להצטרף לקבוצה ${selectedGroupId}?`}
                              handleConfirmation={handleConfirmation}
                              setShowConfirmation={setShowConfirmation}/>
      )} 
    </>
  );
}

export default Group;
