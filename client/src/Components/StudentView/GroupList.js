import React, { useContext, useEffect, useState } from 'react';
import Group from './Group';
import DataContext from '../../Helpers/DataContext';
import { fetchAllGroupsBySchool } from '../../Helpers/StudentFrontLogic';

const GroupList = () => {
  const { user } = useContext(DataContext);
  const [groupIds, setGroupIds] = useState([]);

  useEffect(() => {
    const setGroups = async () => {
      const groups = await fetchAllGroupsBySchool(user);
      setGroupIds(groups);
    }
    setGroups();
  }, [user]); 

  return (
    <>
      {groupIds && groupIds.map((groupJson) => (
        // Check if user is not in the group and is not a student
        !(user.groupId === groupJson.id && user.role === "Student") && (
          <Group key={groupJson.id} groupId={groupJson.id} groupJson={groupJson} />
        )
      ))}
    </>
  );
}

export default GroupList;
