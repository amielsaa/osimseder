import React, { useContext,useState } from 'react';
import './css/GroupForHouse.css';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';

const GroupForHouse = ({ groupId, houseId }) => {
  const { navigate } = useContext(DataContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to handle the confirmation of connecting the group to the house
  const handleConnectConfirmation = (confirmed) => {
    if (confirmed) {
      //Amiel - Connect group to the house logic here
      console.log(`Connecting group ${groupId} to house ${houseId}`);
      navigate(-1)
    }

    // Close the confirmation message
    setShowConfirmation(false);
  };

  return (
    <>
      <div className="potential_group_for_house">
        <div className='group-id'>{` קבוצה : ${groupId} `}</div>
        <button className='join-group-btn' onClick={() => navigate(`/GroupPage/${groupId}`)}>צפה</button>
        <button className='join-group-btn' onClick={() => setShowConfirmation(true)}>שייך</button>
      </div>


      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`האם לשייך את הבית לקבוצה ${groupId} ?`}
          handleConfirmation={handleConnectConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
    </>
  );
}

export default GroupForHouse;
