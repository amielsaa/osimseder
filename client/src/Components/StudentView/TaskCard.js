// TaskCard.js
import React, { useContext, useState } from 'react';
import '../css/TaskCard.css';
import DataContext from '../../Helpers/DataContext';

const TaskCard = ({ id, room, tasks }) => {
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