import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';


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
      if (user.role === "Student") {
        axios.get('http://localhost:3001/student/groups/',{headers: {accessToken: localStorage.getItem('accessToken')}} ).then((res) => {
          //setGroupIds(res.body.groups);
          if(res.data.error) {alert(res.data.error)};
          setGroupIds(res.data.groups)
        })
        // Amiel - get all the groups from this student's school!   
      } else if (user.role === "TeamOwner") {
        // Amiel - get all the groups that the team owner can manage - teams from his city.
      }
    //}; 

    // Call the getGroups function
    //const groups = getGroups(user);
    //console.log(groups);
    //setGroupIds(groups)

  }, [user, groupIds]);  // Add user to the dependency array
  

  return (
    <>
      
      {groupIds.map((groupJson) => (
        <Group key={groupJson} groupId={groupJson.groupId} groupJson={groupJson} />
      ))}
    </>
  );
}

export default GroupList;
