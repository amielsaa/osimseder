import React, { useContext, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';

const Group = ({ groupId }) => {

  const {user} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const openStudentsPopUp = () => {
    //need to send Axios request to fetch the users from the DB
    setStudentsPopUp(!studentsPopUp);
  };
  
  const handleJoinGroup = (groupId, userId) => {
  //Amiel - Student joins in a group backend logic.
  }
  const handleManageGroup = (groupId, userId) => {
  //Amiel - Team Owner join a group as a team owner.
  // notice that if there is a team owner already he cannot do it.
  }



  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId}: קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        {user.role === "Student" &&
        <button className='join-group-btn' onClick={handleJoinGroup(groupId, user.userId)}>הצטרף</button>
        }
        {user.role === "TeamOwner" &&
        <button className='join-group-btn' onClick={handleManageGroup(groupId, user.userId)}>נהל</button>
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
