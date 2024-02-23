import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';
import {handleJoinGroup} from '../../Helpers/StudentFrontLogic'

const Group = ({ groupId , groupJson}) => {
  const {user} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const openStudentsPopUp = () => {
    //need to send Axios request to fetch the users from the DB
    setStudentsPopUp(!studentsPopUp);
  };
  
  
  const handleManageGroup = (groupId, userId) => {
  //Amiel - Team Owner join a group as a team owner.
  // notice that if there is a team owner already he cannot do it.
  }

  useEffect(() => {
    setStudentsList(groupJson.students);
  },[]);



  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId} : קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        {user.role === "Student" &&
        <button className='join-group-btn' onClick={handleJoinGroup(groupId, user.id)}>הצטרף</button>
        }
        {user.role === "TeamOwner" &&
        <button className='join-group-btn' onClick={handleManageGroup(groupId, user.id)}>נהל</button>
        }
        <div className='students-Count'>4/5</div>
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
    </>
  );
}

export default Group;
