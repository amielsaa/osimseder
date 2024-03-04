import React, { useContext, useEffect, useState } from 'react';
import './css/GroupForHouse.css';
import DataContext from '../Helpers/DataContext';



const GroupForHouse = ({groupId, houseid}) => {
    const { navigate } = useContext(DataContext)


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
