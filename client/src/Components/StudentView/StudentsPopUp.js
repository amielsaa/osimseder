import React from 'react';
import '../css/StudentsPopUp.css'

const StudentsPopUp = ({ studentsList }) => {
  return (
    <ul className='pop-up_screen'>
      {studentsList.map((studentName, index) => (
        <li className='student-bar' key={index}>{studentName}</li>
      ))}
    </ul>
  );
}

export default StudentsPopUp;