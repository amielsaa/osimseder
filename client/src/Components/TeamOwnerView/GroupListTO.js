import React, { useContext, useEffect, useState } from 'react';
import GroupTO from './GroupTO';
import DataContext from '../../Helpers/DataContext';
import {fetchAllGroupsStaff} from '../../Helpers/StaffFrontLogic'
const GroupListTO = () => {
  const { user } = useContext(DataContext);

  // Amiel - this consts are for me to just work with while you develop your backend,
  // it's only an array of numbers so I'll have some ID's
  // feel free to change them to match the groups that need to be here.
  //const initialGroupIds = Array.from({ length: 3 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState([]);

  // Amiel - when I give you a user that is a Group Owner, give me all the groups that he currently owns.
  // this should be done inside this useEffect.
  
    useEffect(() => {
    const setGroups = async () => {
      const groups = await fetchAllGroupsStaff();
      setGroupIds(groups);
    };
    setGroups();

  }, [user]);  // Add user to the dependency array */
  const deleteGroupFromList = (id) => {
    setGroupIds(groupIds => groupIds.filter(group => group.id !== id));
  }
  return (
    <> 
      { (groupIds.length > 0) && <>
      {groupIds.map((groupJson) => (
        <GroupTO key={groupJson.id}
                groupId={groupJson.id}
                groupJson={groupJson}
                deleteGroupFromList={deleteGroupFromList} />
      ))} </>
      }
    </>
  );
}

export default GroupListTO;
