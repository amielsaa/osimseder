import React from 'react';
import './css/UsersIndex.css';

const JoinGroupWindow = ({ student, groups, onClose }) => {
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
        <div className='join-group-group'>
                <div className='group-att'>
                    <span>מספר קבוצה</span>
                </div>
                <div className='group-att'>
                    <span>מספר קבוצה</span>
                </div>
                <div className='group-att'>
                    <span>מספר קבוצה</span>
                </div>
                <div className='group-att'>
                    <span>מספר קבוצה</span>
                </div>
        </div>
            
            
        </div>
        
      </div>
    </div>
  );
};

export default JoinGroupWindow;
