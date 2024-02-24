import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from '../StudentView/StudentsPopUp';
import DataContext from '../../Helpers/DataContext';

const GroupTO = ({ groupId }) => {

  const {user, navigate} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const openStudentsPopUp = () => {
    //Amiel - need to send Axios request to fetch the users from the DB - by users I mean the users that
    // participate in this group. you have the gorup Id in the parameters
    setStudentsPopUp(!studentsPopUp);
  };

  const [chosenGroup,setChosenGroup] = useState('')

  useEffect(() => {
    if (chosenGroup)
    navigate(`/GroupPage/${chosenGroup}`)
  },[chosenGroup])
  
  const handleExitGroup = (groupId) => {
    //Amiel -  updating leaving group in the data base after TeamOwner leaves the group send me from the backend the new list
    // so I can rerender the page.
  }

  return (
    <>
      
      <div className="group">
        <div className='group-id'>{`${groupId} : קבוצה`}</div>
        <button className='users-in-group-btn' onClick={openStudentsPopUp}>חניכים</button>
        <button className='join-group-btn'onClick={() => setChosenGroup(groupId)}>צפה</button>
        <div className='students-Count'>1/5</div> {/* Ari - needs to be modified to the real group size after you have the data */ }
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
    </>
  );
}

export default GroupTO;
