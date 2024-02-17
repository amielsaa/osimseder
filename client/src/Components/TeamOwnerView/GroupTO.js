import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from '../StudentView/StudentsPopUp';
import DataContext from '../../Helpers/DataContext';

const GroupTO = ({ groupId }) => {

  const {user, navigate} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const openStudentsPopUp = () => {
    //need to send Axios request to fetch the users from the DB
    setStudentsPopUp(!studentsPopUp);
  };

  const [chosenGroup,setChosenGroup] = useState('')

  useEffect(() => {
    if (chosenGroup)
    navigate(`/GroupPage/${chosenGroup}`)
  },[chosenGroup])
  
  const handleExitGroup = (groupId) => {
    // updating leaving group in the data base
  }



  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId}: קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        <button className='join-group-btn'onClick={() => setChosenGroup(groupId)}>צפה</button>
        <button className='exit-group-btn' onClick={handleExitGroup(groupId,user.userId)}>עזוב</button>
        <div className='students-Count'>1/5</div>
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
    </>
  );
}

export default GroupTO;
