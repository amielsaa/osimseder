import React from 'react';
import './css/UsersIndex.css';

const JoinGroupWindow = ({ student, groups, onClose, onAddToGroup }) => {
  return (
    <div className="join-group-container">
      <div className="join-group-content">
        <div className="close-icon" onClick={onClose}>
          x
        </div>
        <div className='title-group-window'>
            <h1>{`חיפוש קבוצה עבור ${student.userName} ${student.userLastName}`}</h1>
        </div>
        <div className='sub-title-group-window'>
            <h2>{` הקבוצות שייכות לבית ספר  ${student.schoolName}`}</h2>
        </div>
        <div className='join-group-groups-container'>
          {groups.map(group =>
            <div className='join-group-group' key={group.groupId}>
            <div className='group-att'>
                <span>מספר קבוצה : {group.groupId}</span>
            </div>
            <div className='group-att'>
                <span>גודל קבוצה : {`${group.memberCount}/${group.capacity}`}</span>
            </div>
            <button className='add-to-group-button' onClick={() => onAddToGroup(group.id, student.email, student.userName, student.userLastName)}>
                <span>צרף לקבוצה</span>
            </button>
            </div>
           ) }
        
            
            
        </div>
        
      </div>
    </div>
  );
};

export default JoinGroupWindow;
