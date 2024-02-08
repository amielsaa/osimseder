import React, { useState } from 'react';
import Group from './Group';
import FilterBox from './FilterBox';

const GroupList = () => {
  const initialGroupIds = Array.from({ length: 50 }, (_, index) => (index + 1).toString().padStart(3, '0'));
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
