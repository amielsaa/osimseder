import React, { useState } from 'react';
import './css/InputConfirmationMessage.css';

const InputConfirmationMessage = ({ promptMessage, handleInput, setShowInput }) => {
  const [userInput, setUserInput] = useState('');

  const handleSubmit = () => {
    handleInput(userInput);
    setShowInput(false);
  };

  return (
    <div className='input-confirmation-modal'>
      <p>{promptMessage}</p>
      <input 
        type='text' 
        value={userInput} 
        onChange={(e) => setUserInput(e.target.value)} 
        className='input-field'
      />
      <button className='input-button' onClick={() => setShowInput(false)}>
        בטל
      </button>
      <button className='input-button' onClick={handleSubmit}>
        אישור
      </button>
    </div>
  );
}

export default InputConfirmationMessage;
