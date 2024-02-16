
import Header from '../Header';
import Nav from '../Nav';
import TaskCard from './TaskCard';
import '../css/GroupPage.css'
import DataContext from '../../Helpers/DataContext';
import { useContext } from 'react';
import React, { useState } from 'react';

const GroupPage = () => {
  const {user} = useContext(DataContext)
  
  //Amiel - take group Id and get all the necesecry data
  //Amiel - make sure I get the info like that from Axios request
  const [studentList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד'])
  const [tasks, setTasks] = useState([
    { room: 'סלון', tasks: [
      { description: 'ניקיון', status: true },
      { description: 'סידור', status: false },
    ]},
    { room: 'חדר ילדים', tasks: [
      { description: 'תיקון', status: false },
      { description: 'ניקיון', status: true },
    ]},
    { room: 'מטבח', tasks: [
      { description: 'תיקון', status: false },
      { description: 'ניקיון', status: true },
    ]},
    { room: 'חדר שינה', tasks: [
      { description: 'תיקון', status: false },
      { description: 'ניקיון', status: true },
    ]},
    { room: 'מחסן', tasks: [
      { description: 'ניקיון', status: true },
      { description: 'סידור', status: false },
    ]},
  ]);

  return (
    <div>
      <Header/>
      <Nav/>
      <div className='content-Box-Group'>
      <div className='group-title'>
          <h1>קבוצה:001</h1>
        </div>
        <div className='Group-Info'>
          <div className='Info'>חניך גרעין : </div>
          <div className='Info'>בית ספר : </div>
          <div className='Info'>שם קשיש : </div>
          <div className='Info'>כתובת הבית : </div>
        </div>
        <div className='group-title'>
          <h1>חברי הקבוצה</h1>
        </div>
        <div className='Group-Info'>
          {studentList.map((student, index) => (
            <div key={index} className='Info'>
              {student}
            </div>
          ))}
        </div>

        <div className='group-title'>
          <h1>מטלות</h1>
        </div>
        <div className='Group-Info-Tasks'>
          {tasks.map((task, index) => (
            <TaskCard key={index} room={task.room} tasks={task.tasks} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GroupPage;
