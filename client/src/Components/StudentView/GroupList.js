import React, { useContext, useEffect, useEffect, useState } from 'react';
import Group from './Group';
import DataContext from '../../Helpers/DataContext';


const GroupList = () => {
  
  const {user} = useContext(DataContext)
  // Amiel - this consts are for me to just work with while you develope your backend,
  // its only an array of numbers so ill have some ID's
  // feel free the change them to match the groups that need to be here.
  const initialGroupIds = Array.from({ length: 5 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);




  //Amiel - need to import Groups from the db and lay them for the user, Ill start the function for you
  // function name is getGroups and should be inside useEffect as the page renders

  
  /*  useEffect(() => {
    const getGroups = (user) => {
      if (user.role === "Student") {
        // Amiel - get all the groups from this student's school!   
      } else if (user.role === "TeamOwner") {
        // Amiel - get all the groups that the team owner can manage - teams from his city.
      }
    }; 

    // Call the getGroups function
    const groups = getGroups(user);
    setGroupIds(groups)

  }, [user]); */ // Add user to the dependency array
  






  return (
    <>
      
      {groupIds.map((groupId) => (
        <Group key={groupId} groupId={groupId} />
      ))}
    </>
  );
}

export default GroupList;
