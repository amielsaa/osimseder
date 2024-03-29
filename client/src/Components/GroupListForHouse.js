import React, { useContext, useEffect, useState } from 'react';
import GroupForHouse from './GroupForHouse';
import {getAllGroupsWithoutHouse} from '../Helpers/StaffFrontLogic';

const GroupListForHouse = ({ houseId, groupsBySchool }) => {
  
  return (
    <>
      {groupsBySchool && (
        <>
          {groupsBySchool.map((group) => (
            <GroupForHouse key={group.id} group={group} houseId={houseId} />
          ))}
        </>
      )}
    </>
  );
}

export default GroupListForHouse;