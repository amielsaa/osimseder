import React, { useContext,useState } from 'react';
import './css/GroupForHouse.css';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import {assignGroupToHouse} from '../Helpers/StaffFrontLogic';
const GroupForHouse = ({ group, houseId }) => {
  const { navigate } = useContext(DataContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle the confirmation of connecting the group to the house
  const handleConnectConfirmation = (confirmed) => {
    if (confirmed) {
      const res = assignGroupToHouse(group.id, houseId);
      if(res) {
        navigate(`/HousePage/${houseId}`);
      }
    }
    // Close the confirmation message
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="potential_group_for_house">
        <div className='group-id'>{` קבוצה : ${group.id} `}</div>
        <button className='join-group-btn' onClick={() => navigate(`/GroupPage/${group.id}`)}>צפה</button>
        <button className='join-group-btn' onClick={() => setShowConfirmation(true)}>שייך</button>
        <div className='students-Count'>{group.memberCount}/{group.capacity}</div>
      </div>


      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`האם לשייך את הבית לקבוצה ${group.id} ?`}
          handleConfirmation={handleConnectConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
    </>
  );
}

export default GroupForHouse;
