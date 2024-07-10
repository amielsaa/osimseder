import React, { useContext, useEffect, useState } from 'react';
import '../css/House.css';
import DataContext from '../../Helpers/DataContext';
import houseImg from '../../images/housepicture.png'
import ConfirmationMessage from '../ConfirmationMessage';
import {deleteHouse} from '../../Helpers/StaffFrontLogic'
import ScoreBar from '../ScoreBar';
const House = ({ id, landlordName, address, deleteHouseFromList, numberOfCompletedTasks, numberOfTasks}) => {
  const [selectedHouse, setSelectedHouse] = useState('')
  const [selectedHouseForDelete, setSelectedHouseForDelete] = useState('')
  const [showConfirmationDelete, setShowConfirmationDelete] = useState('')
  const { navigate, user } = useContext(DataContext);
  

  useEffect(() => {
    if (selectedHouse) {
      navigate(`/HousePage/${id}`)
    }
  })


  const toggleStatus = (id) => {
    setSelectedHouseForDelete(id)
    setShowConfirmationDelete(true);
  }

  const handleConfirmationDelete = (confirmed) => {
    if(confirmed) {
      deleteHouse(id);
      deleteHouseFromList(id)
      setSelectedHouseForDelete('')
    }
    setShowConfirmationDelete(false);

  }

  return (
    <>
      <div className="House">
        <div className='House-img-container'>
          <h2 className='house_id_in_picture'>{id}</h2>
          <img className='house_pic' src={houseImg} alt='אין תמונה'/>
        </div>
        <div className='House-bar-Info'>
          <p> דייר/ת: {landlordName}</p>
          <p>כתובת: {address}</p>
          <ScoreBar numberOfTasks={numberOfTasks} numberOfCompletedTasks={numberOfCompletedTasks}/>
        </div>
        <div className='houses-house-buttons-container'>
        <button className='watch-house-btn' onClick={() => {setSelectedHouse(id)}}>צפה</button>
        <button className='remove-house-btn' onClick={() => {toggleStatus(id)}}>הסר</button>
        </div>
        {(user.role === 'CityManager' || user.role === 'AreaManager'  ) && showConfirmationDelete && (
        <ConfirmationMessage confirmationMessage={`האם אתה בטוח שברצונך למחוק את בית מספר ${selectedHouseForDelete}?`}
                              handleConfirmation={handleConfirmationDelete}
                              setShowConfirmation={setShowConfirmationDelete}/>
      )}
      </div>
    </>
  );
}

export default House;
