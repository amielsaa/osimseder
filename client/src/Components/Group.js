import React from 'react';
import './css/Group.css';

const Group = ({ groupId }) => {
  return (
    <div className="group">
      <div className='group-id'>{`${groupId}: קבוצה`}</div>
      <button className='users-in-group-btn'>חניכים</button>
      <button className='join-group-btn'>הצטרף</button>
    </div>
  );
}

export default Group;