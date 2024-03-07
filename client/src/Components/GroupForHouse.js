import React, { useContext,useState } from 'react';
import './css/GroupForHouse.css';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import {assignGroupToHouse} from '../Helpers/StaffFrontLogic';
const GroupForHouse = ({ groupJson, houseId }) => {
  const { navigate } = useContext(DataContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle the confirmation of connecting the group to the house
  const handleConnectConfirmation = (confirmed) => {
    if (confirmed) {
      console.log(groupJson, houseId)
      const res = assignGroupToHouse(groupJson.id, houseId);
      if(res) {
        navigate(-1);
      }
    }
    // Close the confirmation message
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="potential_group_for_house">
        <div className='group-id'>{` קבוצה : ${groupJson.id} `}</div>
        <button className='join-group-btn' onClick={() => navigate(`/GroupPage/${groupJson.id}`)}>צפה</button>
        <button className='join-group-btn' onClick={() => setShowConfirmation(true)}>שייך</button>
      </div>


      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`האם לשייך את הבית לקבוצה ${groupJson.groupId} ?`}
          handleConfirmation={handleConnectConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
    </>
  );
}

export default GroupForHouse;
