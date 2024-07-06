import React from 'react';
import './css/PicturePopUp.css'; 
import img from '../images/try-img.jpeg'

const PicturePopUp = ({ onClose, onDelete, index, imagePath, image, reason, onConfirm, URLName }) => {
  

  return (
    <div className="overlay-picture-pop-up">
      <div className="picture-modal">
        <button className="close-button" onClick={onClose}>X</button>
        <div className="picture-popup-container">
        
          <div className="placeholder-picture">
          <img src={imagePath} alt='no img to display'></img>
          </div>
          
        </div>
        <div className='remove-button-container'>
        {(reason === "select") &&<button className="remove-button" onClick={() => onDelete(image , index)}>מחק תמונה</button>}
        {(reason === "upload") &&<button className="remove-button" onClick={() => onConfirm(image)}>העלה תמונה</button>}
        </div>
      </div>
    </div>
  );
};

export default PicturePopUp;
