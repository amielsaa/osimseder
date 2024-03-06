import React, { useContext, useEffect, useState } from 'react';
import GroupForHouse from './GroupForHouse';

const GroupListForHouse = ({ houseId, selectedSchool }) => {
  const initialGroupIds = Array.from({ length: 30 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);


    // Amiel - you have the houseId in the parameter here, I need you to bring all the groups that are 
    // in the same city as the

    //Amiel - you also have the selected school in the parameters here, make sure that you bring only the groups
    // that belong to the "selectedSchool" and does not have a a house yet !!

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