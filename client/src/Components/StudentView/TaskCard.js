// TaskCard.js
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { IoSearchOutline , IoCloseSharp} from 'react-icons/io5';
import '../css/TaskCard.css';
import DataContext from '../../Helpers/DataContext';
import ConfirmationMessage from '../ConfirmationMessage';
import {updateTaskStatus, deleteTask} from '../../Helpers/StaffFrontLogic';

const TaskCard = ({ room, tasks, removeRoomFromTasklist }) => {
  const { user } = useContext(DataContext);
  const isStudent = user.role === 'Student';
  const [taskList, setTaskList] = useState(tasks);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showConfirmationDelete, setShowConfirmationDelete] = useState(false);

  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const toggleStatusDelete = (id) => {
    if(!isStudent) {
      setShowConfirmationDelete(true);
      setSelectedTaskId(id);
    }
  }

  const toggleStatus = (index) => {
    if (!isStudent) {
      // Display the confirmation message
      setShowConfirmation(true);
      setSelectedTaskIndex(index);
    }
  };

  const handleConfirmationDelete = async (confirmed) => {
    if (confirmed) {
      const res = await deleteTask(selectedTaskId);
      if (res) {
        let updatedTasks = [...taskList];
        updatedTasks = updatedTasks.filter((task, index) => task.taskId !== selectedTaskId);
        setTaskList(updatedTasks);
        if (updatedTasks.length === 0) {
          removeRoomFromTasklist(room);
        }
      }
    }
    setShowConfirmationDelete(false);
    setSelectedTaskIndex(null);
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      const updatedTasks = [...taskList];
      const newStatus = updatedTasks[selectedTaskIndex].status === 'GREEN' ? 'RED' : 'GREEN';
  
      // Update task status
      updatedTasks[selectedTaskIndex].status = newStatus;
      setTaskList(updatedTasks); // Update state with the latest tasks
  
      // Update status in the database
      updateTaskStatus(updatedTasks[selectedTaskIndex].taskId, newStatus);
    }
  
    // Close the confirmation message
    setShowConfirmation(false);
    setSelectedTaskIndex(null);
  };


  return (
    <div className='Task'>
      <div className='Room-Title'>{room}</div>
      <div className='Description-Status'>
        {taskList.map((task, index) => (
          <div className='mini-Task' key={index}>
            {task.type} :
            <Link to={`/TaskPage/${task.taskId}`}>
              <IoSearchOutline className='view-icon' />
            </Link>{' '}
            <IoCloseSharp className='delete-icon' onClick={() => toggleStatusDelete(task.taskId)}/>
            <span
              className={task.status === 'GREEN' ? 'green-circle' : 'red-circle'}
              onClick={() => toggleStatus(index)}
            ></span>
          </div>
        ))}
      </div>


      {showConfirmation && (
        <ConfirmationMessage confirmationMessage={"האם אתה בטוח שברצונך לשנות את סטטוס המטלה?"}
                              handleConfirmation={handleConfirmation}
                              setShowConfirmation={setShowConfirmation}/>
      )}

      {!isStudent && showConfirmationDelete && (
        <ConfirmationMessage confirmationMessage={"האם אתה בטוח שברצונך למחוק את המטלה?"}
                              handleConfirmation={handleConfirmationDelete}
                              setShowConfirmation={setShowConfirmationDelete}/>
      )}
    </div>
  );
};

export default TaskCard;
