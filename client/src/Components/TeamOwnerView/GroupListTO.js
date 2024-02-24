import React, { useContext, useEffect, useState } from 'react';
import GroupTO from './GroupTO';
import DataContext from '../../Helpers/DataContext';

const GroupListTO = () => {
  const { user } = useContext(DataContext);

  // Amiel - this consts are for me to just work with while you develop your backend,
  // it's only an array of numbers so I'll have some ID's
  // feel free to change them to match the groups that need to be here.
  const initialGroupIds = Array.from({ length: 3 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);

  // Amiel - when I give you a user that is a Group Owner, give me all the groups that he currently owns.
  // this should be done inside this useEffect.
  
  /* useEffect(() => {
    const getGroups = (user) => {
      // Fetch groups owned by the user from the backend
      // Return the array of group IDs
    };

    // Call the getGroups function
    const groups = getGroups(user);
    setGroupIds(groups);

  }, [user]); // Add user to the dependency array */

  return (
    <> 
      {groupIds.map((groupId, index) => (
        <GroupTO key={groupId} groupId={groupId} />
      ))}
    </>
  );
}

export default GroupListTO;
