// TaskCard.js
import React from 'react';
import '../css/TaskCard.css';

const TaskCard = ({ id, room, tasks }) => {
  return (
    <div className='Task'>
      <div className='Room-Title'>{room}</div>
      <div className='Description-Status'>
        {tasks.map((task, index) => (
          <div className='mini-Task' key={index}>
            {task.description} : 
            <span className={task.status ? 'green-circle' : 'red-circle'}></span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskCard;