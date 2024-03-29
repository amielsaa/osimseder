import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Header';
import Nav from './Nav';
import './css/TaskPage.css'
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from '../Helpers/DataContext';
import CleaningPicture from '../images/cleaningPicture.jpg'
import PaintingPicture from '../images/paintingPicture.jpg'
import Footer from './Footer';
import {getTaskById} from '../Helpers/StaffFrontLogic'
const TaskPage = () => {
    const {id} = useParams ()
    const {navigate} = useContext(DataContext)
    const [task, SetTask] = useState({})

    const setTaskRequest = async () => {
      const taskById = await getTaskById(id);
      SetTask(taskById);
    }

    useEffect(() => {
      setTaskRequest();
    }, [])

  return (
    <>
    <Header/>
    <Nav/>
    <div className='content_Box_Task_Page'>
    <span className='purple_circle'>
    <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
    </span>
    <div className='Task-Content'>
      <div className='Task_Id'>מספר המטלה :  {task.id} </div>
      <div className='room'>חדר : <span className='TaskInfo'> {task.room} </span>  </div>
      <div className='Task_kind'>סוג מטלה : <span className='TaskInfo'> {task.type} </span>  </div>
      <div className='Task_description'>תיאור : <span className='Task_info_desc'> {task.freeText} </span></div>
      <div className='action_pic'>
        <img src={task.type === 'ניקיון' ? CleaningPicture : PaintingPicture }/>
      </div>
    </div>

    </div>
    <Footer/>
    </>
  );
}

export default TaskPage;