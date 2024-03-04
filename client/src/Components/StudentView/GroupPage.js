import { useParams } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import TaskCard from './TaskCard';
import '../css/GroupPage.css'
import DataContext from '../../Helpers/DataContext';
import { useContext } from 'react';
import React, { useState } from 'react';
import { IoChevronForwardCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { FaHouseChimney } from "react-icons/fa6";

const GroupPage = () => {
  const { id } = useParams();
  const {user} = useContext(DataContext)
  const navigate = useNavigate();
  
  
  //Amiel - take group Id and get for me all the necesecry data, the id from the useParams is the groupId!
  //Amiel - make sure I get the info like that from Axios request
  const [studentList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד'])
  const [tasks, setTasks] = useState([
    {
      room: 'סלון',
      tasks: [
        { taskId: 1, description: 'ניקיון', status: true },
        { taskId: 2, description: 'סידור', status: false },
      ]
    },
    {
      room: 'חדר ילדים',
      tasks: [
        { taskId: 3, description: 'תיקון', status: false },
        { taskId: 4, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'מטבח',
      tasks: [
        { taskId: 5, description: 'תיקון', status: false },
        { taskId: 6, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'חדר שינה',
      tasks: [
        { taskId: 7, description: 'תיקון', status: false },
        { taskId: 8, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'מחסן',
      tasks: [
        { taskId: 9, description: 'ניקיון', status: true },
        { taskId: 10, description: 'סידור', status: false },
      ]
    },
  ]);

  const handleRemoveMember = (index) => {
    const updatedStudents = [...studentList];
    updatedStudents.splice(index, 1);
    setStudentsList(updatedStudents);
  };

  return (
    <div>
      <Header/>
      <Nav/>
      
      <div className='content-Box-Group'>
        <span className='purple_circle'>
      <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
      </span>
      <div className='main_page_content'>
      <div className='group-title'>
        <h1>קבוצה: {id}</h1>
        </div>
          <div className='Info'>חניך גרעין : </div>
          <div className='Info'>בית ספר : </div>
          <div className='Info'>בית : <FaHouseChimney className='house_for_group' onClick={() => {navigate('/HousePage/001')}}/></div>
        <div className='group-title'>
          <h1>חברי הקבוצה</h1>
        </div>
        <div className='Group-Info'>
        {studentList.map((student, index) => (
          <div key={index} className='Group_Member'>
            {student}
            {user.role !== 'Student' && (
              <button className='kick_student' onClick={() => handleRemoveMember(index)}>הסר</button>
            )}
          </div>
        ))}
      </div>

        <div className='group-title'>
          <h1>מטלות</h1>
        </div>
        <div className='Group-Info-Tasks'>
          {tasks.map((task, index) => (
            <TaskCard  key={index}
             room={task.room} tasks={task.tasks} />
          ))}
        </div>
        </div>
      </div>
      <Footer/>
    </div>
    
  );
}

export default GroupPage;
