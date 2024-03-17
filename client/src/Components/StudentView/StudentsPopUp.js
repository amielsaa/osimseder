import React from 'react';
import '../css/StudentsPopUp.css'

const StudentsPopUp = ({ studentsList }) => {
  return (
    <div className='pop-up_container'>
      {studentsList.length > 0 ? (
        <ul className='pop-up_screen'>
          {studentsList.map((studentName, index) => (
            <li className='student-bar' key={index}>{studentName}</li>
          ))}
        </ul>
      ) : (
        <div className="empty-students">
          <h2>הקבוצה ריקה</h2>
        </div>
      )}
    </div>
  );
}

export default StudentsPopUp;
