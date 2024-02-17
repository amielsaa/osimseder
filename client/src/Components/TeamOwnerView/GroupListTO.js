import React, { useContext, useEffect, useState } from 'react';
import GroupTO from './GroupTO';
import DataContext from '../../Helpers/DataContext';



const GroupListTO = () => {
  
  const {user} = useContext(DataContext)
  // Amiel - this consts are for me to just work with while you develope your backend,
  // its only an array of numbers so ill have some ID's
  // feel free the change them to match the groups that need to be here.
  const initialGroupIds = Array.from({ length: 3 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);




  //Amiel - when I give you a user that is a Group Owner, give me all the the groups that he currently owns.
  // this should be done inside this useEffect.

  
  /*  useEffect(() => {
    const getGroups = (user) => {
      
    }; 

    // Call the getGroups function
    const groups = getGroups(user);
    setGroupIds(groups)

  }, []]); */ // Add user to the dependency array
  


  return (
    <> 
      {groupIds.map((groupId) => (
        <GroupTO key={groupId} groupId={groupId} />
      ))}
    </>
  );
}

export default GroupListTO;
