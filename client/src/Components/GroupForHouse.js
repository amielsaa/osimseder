import React, { useContext, useEffect, useState } from 'react';
import './css/GroupForHouse.css';
import DataContext from '../Helpers/DataContext';



const GroupForHouse = ({groupId, houseid}) => {
    const { navigate } = useContext(DataContext)

    //Amiel - on the button שייך I need you to implement the onClick function - you have the house Id and the group Id
    // In the parameters. the function needs to connect to group to the house.
  return (
    <>
      <div className="potential_group_for_house">
        <div className='group-id'>{` קבוצה : ${ groupId } `}</div>
        <button className='join-group-btn'onClick={() => navigate(`/GroupPage/${groupId}`)}>צפה</button>
        <button className='join-group-btn'>שייך</button>
      </div>
      
    </>
  );
}

export default GroupForHouse;
