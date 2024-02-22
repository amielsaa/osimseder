import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';
import { fetchAllGroupsBySchool } from '../../Helpers/StudentFrontLogic';

const GroupList = () => {
  
  const {user} = useContext(DataContext)
  // Amiel - this consts are for me to just work with while you develope your backend,
  // its only an array of numbers so ill have some ID's
  // feel free the change them to match the groups that need to be here.
  //const initialGroupIds = Array.from({ length: 5 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState([]);


  //Amiel - need to import Groups from the db and lay them for the user, Ill start the function for you
  // function name is getGroups and should be inside useEffect as the page renders


  useEffect(() => {
    //const getGroups = (user) => {
      // //TODO: update only the joined group
      const setGroups = async () => {
        const groups = await fetchAllGroupsBySchool(user);
        setGroupIds(groups);        
      }
      setGroups();      

      // if (user.role === "Student") {
      //   axios.post('http://localhost:3001/student/groups/',{schoolId:user.schoolId},{headers: {accessToken: localStorage.getItem('accessToken')}} ).then((res) => {
      //     //setGroupIds(res.body.groups);
      //     if(res.data.error) {alert(res.data.error)};
      //     setGroupIds(res.data.groups);
      //   })
      //   // Amiel - get all the groups from this student's school!   
      // } else if (user.role === "TeamOwner") {
      //   // Amiel - get all the groups that the team owner can manage - teams from his city.
      // }



  }, [user]);  // Add user to the dependency array
  

  return (
    <>
      {groupIds &&
      <>{groupIds.map((groupJson) => (
        <Group key={groupJson} groupId={groupJson.ID} groupJson={groupJson} />
      ))}
      </>}
    </>
  );
}

export default GroupList;
