// TaskCard.js
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import { IoSearchOutline } from 'react-icons/io5';
import '../css/TaskCard.css';
import DataContext from '../../Helpers/DataContext';

const TaskCard = ({ room, tasks }) => {
  const { user } = useContext(DataContext);
  const isStudent = user.role === 'Student';
  const [taskList, setTaskList] = useState(tasks);

  const toggleStatus = (index) => {
    if (!isStudent) {
      const updatedTasks = [...taskList];
      updatedTasks[index].status = !updatedTasks[index].status;
      setTaskList(updatedTasks);
    }
  };

  return (
    <div className='Task'>
      <div className='Room-Title'>{room}</div>
      <div className='Description-Status'>
        {taskList.map((task, index) => (
          <div className='mini-Task' key={index}>
            {task.description} :
            <Link to={`/TaskPage/${task.taskId}`}>
              <IoSearchOutline  className='view-icon' />
            </Link>{' '}
            <span
              className={task.status ? 'green-circle' : 'red-circle'}
              onClick={() => toggleStatus(index)}
            ></span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
