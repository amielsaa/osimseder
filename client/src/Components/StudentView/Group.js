import React, { useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';

const Group = ({ groupId }) => {
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const openStudentsPopUp = () => {
    //need to send Axios request to fetch the users from the DB
    setStudentsPopUp(!studentsPopUp);
  };

  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId}: קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        <button className='join-group-btn'>הצטרף</button>
        <div className='students-Count'>4/5</div>
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
    </>
  );
}

export default Group;