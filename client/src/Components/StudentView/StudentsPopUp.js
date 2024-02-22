import React from 'react';
import '../css/StudentsPopUp.css'

const StudentsPopUp = ({ studentsList }) => {
  return (
    <div className='pop-up_screen'>
      {studentsList.map((studentName) => (
        <div className='student-bar' key='0'>{studentName}</div>
      ))}
    </div>
  );
}

export default StudentsPopUp;