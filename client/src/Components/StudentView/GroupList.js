import React, { useState } from 'react';
import Group from './Group';


const GroupList = () => {
  const initialGroupIds = Array.from({ length: 5 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);
  
  return (
    <>
      
      {groupIds.map((groupId) => (
        <Group key={groupId} groupId={groupId} />
      ))}
    </>
  );
}

export default GroupList;
