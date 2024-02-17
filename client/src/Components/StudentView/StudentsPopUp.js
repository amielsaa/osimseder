import React from 'react';
import '../css/StudentsPopUp.css'

const StudentsPopUp = ({ studentsList }) => {
  return (
    <div className='pop-up_screen'>
      {studentsList.map((studentName, index) => (
        <div className='student-bar' key={index}>{studentName}</div>
      ))}
    </div>
  );
}

export default StudentsPopUp;