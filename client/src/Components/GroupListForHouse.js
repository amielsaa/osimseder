import React, { useContext, useEffect, useState } from 'react';
import GroupForHouse from './GroupForHouse';
import {getAllGroupsWithoutHouse} from '../Helpers/StaffFrontLogic';

const GroupListForHouse = ({ houseId, selectedSchool }) => {
  const [groupIds, setGroupIds] = useState([]);


    // Amiel - you have the houseId in the parameter here, I need you to bring all the groups that are 
    // in the same city as the


  const setGroupsRequest = async () => {
    const res = await getAllGroupsWithoutHouse(selectedSchool);
    setGroupIds(res);
  }

  useEffect(() => {
    setGroupsRequest();
  }, [groupIds])
    //Amiel - you also have the selected school in the parameters here, make sure that you bring only the groups
    // that belong to the "selectedSchool" and does not have a a house yet !!

  return (
    <>
      {groupIds && (
        <>
          {groupIds.map((groupJson) => (
            <GroupForHouse key={groupJson.id} groupJson={groupJson} houseId={houseId} />
          ))}
        </>
      )}
    </>
  );
}

export default GroupListForHouse;