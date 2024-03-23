import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import DataContext from '../../Helpers/DataContext';
import axios from 'axios';
import { fetchAllGroupsBySchool } from '../../Helpers/StudentFrontLogic';

const GroupList = () => {
  
  const {user} = useContext(DataContext)
  const [rerender, setRerender] = useState(false)
  const [groupIds, setGroupIds] = useState([]);

   useEffect(() => {
      const setGroups = async () => {
        const groups = await fetchAllGroupsBySchool(user);
        setGroupIds(groups);      
      }
      setGroups();      



  }, [user]);  // Add user to the dependency array

  
  

  return (
    <>
      {groupIds &&
      <>{groupIds.map((groupJson) => (
        <Group key={groupJson.id} groupId={groupJson.id} groupJson={groupJson}  />
      ))}
      </>}
    </>
  );
}

export default GroupList;
