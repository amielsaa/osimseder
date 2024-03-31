import React from 'react';
import "./css/ConfirmMessage.css"

const ConfirmMessage = ({ confirmationMessage, handleConfirm, title }) => {
  return (
    <div className='confirm-modal'>
      <h3 className='confirm_title'>{title}</h3>
      <p>{confirmationMessage}</p>
      <button className='confirm-button' onClick={handleConfirm}>
        אישור
      </button>
    </div>
  );
}

export default ConfirmMessage;
