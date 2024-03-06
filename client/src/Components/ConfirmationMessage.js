import React from 'react';
import './css/ConfirmationMessage.css';

const ConfirmationMessage = ({confirmationMessage,handleConfirmation,setShowConfirmation}) => {

  return (
    <div className='confirmation-modal'>
    <p>{confirmationMessage}</p>
    <button className='confirmation-button' onClick={() => setShowConfirmation(false)}>
      לא
    </button>
    <button className='confirmation-button' onClick={() => handleConfirmation(true)}>
      כן
    </button>
  </div>
  );
}

export default ConfirmationMessage;