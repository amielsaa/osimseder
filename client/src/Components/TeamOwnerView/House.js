import React, { useContext, useEffect, useState } from 'react';
import '../css/House.css';
import DataContext from '../../Helpers/DataContext';
import houseImg from '../../images/housepicture.jpg'
import ConfirmationMessage from '../ConfirmationMessage';
import {deleteHouse} from '../../Helpers/StaffFrontLogic'
const House = ({ id, landlordName, address }) => {
  const [selectedHouse, setSelectedHouse] = useState('')

  const [showConfirmationDelete, setShowConfirmationDelete] = useState('')
  const { navigate, user } = useContext(DataContext);

  useEffect(() => {
    if (selectedHouse) {
      navigate(`/HousePage/${id}`)
    }
  })


  const toggleStatus = () => {
    setShowConfirmationDelete(true);
  }

  const handleConfirmationDelete = (confirmed) => {
    if(confirmed) {
      deleteHouse(id);
    }
    setShowConfirmationDelete(false);

  }

  return (
    <>
      <div className="House">
        <div className='House-img-container'>
          <img className='house_pic' src={houseImg} alt='אין תמונה'/>
        </div>
        <div className='House-bar-Info'>
          <p>בית מספר: {id}</p>
          <p>בעל/ת הבית: {landlordName}</p>
          <p>כתובת: {address}</p>
        </div>
        
        <button className='watch-house-btn' onClick={() => {setSelectedHouse(id)}}>צפה</button>
        <button className='watch-house-btn' onClick={() => {toggleStatus()}}>הסר</button>
        {(user.role === 'CityManager' || user.role === 'AreaManager'  ) && showConfirmationDelete && (
        <ConfirmationMessage confirmationMessage={"האם אתה בטוח שברצונך למחוק את המטלה?"}
                              handleConfirmation={handleConfirmationDelete}
                              setShowConfirmation={setShowConfirmationDelete}/>
      )}
      </div>
    </>
  );
}

export default House;
