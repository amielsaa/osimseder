import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';
import {handleJoinGroup, fetchGroupById, fetchAllGroupsBySchool} from '../../Helpers/StudentFrontLogic'

const Group = ({ groupId , groupJson}) => {
  const {user} = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const [memberCount, setMemberCount] = useState({capacity:0, memberCount:0})
  const openStudentsPopUp = () => {
    //need to send Axios request to fetch the users from the DB
    setStudentsPopUp(!studentsPopUp);

  };
  //Amiel import the House data - city is unchangeable.
        //after you imported to house data put its data in the initialValues instead of ""
        //look inside the JSX (the HTML down in this page) code, there is more comments
        //Amiel - notice ! only area manager and upper ranks will see the neightborhood change bar
        //Amiel - you need to check the city of the house and bring me all the possible neighborhoods or
  


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
        <button className='join-group-btn' onClick={handleJoinGroup(groupId, user.id)}>הצטרף</button>
        }
        
        <div className='students-Count'>{memberCount.memberCount}/{memberCount.capacity}</div>
      </div>
      {studentsPopUp ?
      <StudentsPopUp studentsList= {studentsList}/>
      : ''}
    </>
  );
}

export default Group;
