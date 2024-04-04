import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from '../StudentView/StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import ConfirmationMessage from '../ConfirmationMessage';
import {fetchGroupById} from '../../Helpers/StudentFrontLogic'
import {deleteGroup} from '../../Helpers/StaffFrontLogic';
const GroupTO = ({ groupId , groupJson}) => {

  const {user, navigate} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['פליקס רויזמן', 'עמיאל סעד']);
  const [memberCount, setMemberCount] = useState({capacity:0, memberCount:0})
  const [showConfirmationDelete, setShowConfirmationDelete] = useState('');
  const openStudentsPopUp = () => {
    //Amiel - need to send Axios request to fetch the users from the DB - by users I mean the users that
    // participate in this group. you have the gorup Id in the parameters
    setStudentsPopUp(!studentsPopUp);
  };

  const [chosenGroup,setChosenGroup] = useState('')

  const toggleStatus = () => {
    setShowConfirmationDelete(true);
  }

  const handleConfirmationDelete = (confirmed) => {
    if(confirmed) {
      deleteGroup(groupId);
    }
    setShowConfirmationDelete(false);
  }

  const updateStudentList = async () => {
    const group = await fetchGroupById(groupId);
    setStudentsList(group.students);
    setMemberCount({capacity:group.capacity, memberCount:group.memberCount});
  }

  useEffect(() => {
    if (chosenGroup)
    navigate(`/GroupPage/${chosenGroup}`)
    updateStudentList();
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
        {user.role !== 'TeamOwner' && 
        <button className='join-group-btn'onClick={() => toggleStatus()}>הסר</button>}

        <div className='students-Count'>{memberCount.memberCount}/{memberCount.capacity}</div> {/* Ari - needs to be modified to the real group size after you have the data */ }
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
      {showConfirmationDelete && (
        <ConfirmationMessage confirmationMessage={"האם אתה בטוח שברצונך למחוק את הקבוצה?"}
                              handleConfirmation={handleConfirmationDelete}
                              setShowConfirmation={setShowConfirmationDelete}/>
      )}
    </>
  );
}

export default GroupTO;
