import React, { useContext, useEffect, useState } from 'react';
import GroupForHouse from './GroupForHouse';

const GroupListForHouse = ({ houseId }) => {
  const initialGroupIds = Array.from({ length: 30 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);


    // Amiel - you have the houseId in the parameter here, I need you to bring all the groups that are 
    // in the same city as the


  return (
    <>
      {groupIds && (
        <>
          {groupIds.map((groupJson) => (
            <GroupForHouse key={groupJson} groupId={groupJson} houseid={houseId} />
          ))}
        </>
      )}
    </>
  );
}

export default GroupListForHouse;