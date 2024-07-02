import React from 'react';
import './css/PicturePopUp.css'; 
import img from '../images/try-img.jpeg'

const PicturePopUp = ({ onClose, onDelete, index, image }) => {
  

  return (
    <div className="overlay-picture-pop-up">
      <div className="picture-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="picture-popup-container">
        
          <div className="placeholder-picture">
          <img src={image} alt='no img to display'></img>
          </div>
          
        </div>
        <div className='remove-button-container'>
        <button className="remove-button" onClick={() => onDelete(image , index)}>מחק תמונה</button>
        </div>
      </div>
    </div>
  );
};

export default PicturePopUp;
