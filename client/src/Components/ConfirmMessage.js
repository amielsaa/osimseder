import React from 'react';
import "./css/ConfirmMessage.css"

const ConfirmMessage = ({ confirmationMessage, handleConfirm }) => {
  return (
    <div className='confirm-modal'>
      <p>{confirmationMessage}</p>
      <button className='confirm-button' onClick={handleConfirm}>
        אישור
      </button>
    </div>
  );
}

export default ConfirmMessage;
