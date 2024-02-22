import React, { useContext, useEffect, useState } from 'react';
import '../css/House.css';
import DataContext from '../../Helpers/DataContext';
import houseImg from '../../images/housepicture.jpg'

const House = ({ id, landlordName, address }) => {
  const [selectedHouse, setSelectedHouse] = useState('')
  const { navigate } = useContext(DataContext);

  useEffect(() => {
    if (selectedHouse) {
      navigate(`/HousePage/${id}`)
    }
  })

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
      </div>
    </>
  );
}

export default House;
