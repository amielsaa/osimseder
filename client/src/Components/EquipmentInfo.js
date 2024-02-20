import React from 'react';
import { GiBroom } from 'react-icons/gi';
import { PiBroomFill } from 'react-icons/pi';
import { GiPaintBucket } from "react-icons/gi";
import { ImOpt } from "react-icons/im";

const EquipmentInfo = ({ data }) => {
  return (
    <>
      <div className='House_Id'>
        <span className='Equipment_title'>מספר בית:</span> {data.houseId}
      </div>
      <div className='House_address'>
        <span className='Equipment_title'>כתובת :</span> {data.houseAddress}
      </div>
      <div className='House_Equipment'>
        <div className='Equipment_title'>ציוד :</div>
        {data.equipment.map((equipment, index) => (
          <div className='single-equipment' key={index}>
             {equipment === 'צבע' && (
              <>
                <span>{equipment}</span>
                <GiPaintBucket className='icon_For_Equipment' />
              </>
            )}
             {equipment === 'מגב' && (
              <>
                <span>{equipment}</span>
                <ImOpt className='icon_For_Equipment' />
              </>
            )}
            {equipment === 'מברשת צביעה' && (
              <>
                <span>{equipment}</span>
                <PiBroomFill className='icon_For_Equipment' />
              </>
            )}
            {equipment === 'מטאטא' && (
              <>
                <span>{equipment}</span>
                <GiBroom className='icon_For_Equipment' />
              </>
            )}
          </div>
        ))}
      </div>
      <div className='border-bottom'></div>
    </>
  );
}

export default EquipmentInfo;
