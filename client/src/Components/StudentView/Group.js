import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import { handleJoinGroup, fetchGroupById } from '../../Helpers/StudentFrontLogic';
import ConfirmationMessage from '../ConfirmationMessage'; // Import ConfirmationMessage component
import ConfirmMessage from '../ConfirmMessage'; // Import ConfirmMessage component (assuming it exists)


const Group = ({ groupId }) => {
  const { user,navigate } = useContext(DataContext);
  const [studentsPopUp, setStudentsPopUp] = useState(false);
  const [studentsList, setStudentsList] = useState(['ארי מאיר', 'יואב אביטל', 'פליקס רויזמן', 'עמיאל סעד']);
  const [memberCount, setMemberCount] = useState({ capacity: 0, memberCount: 0 });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const updateStudentList = async () => {
      const group = await fetchGroupById(groupId);
      setStudentsList(group.students);
      setMemberCount({ capacity: group.capacity, memberCount: group.memberCount });
    }
    updateStudentList();
  }, []);

  const joinGroup = async (groupId, userId) => {
    setSelectedGroupId(groupId);
    setShowConfirmation(true);
  }

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      await handleJoinGroup(selectedGroupId, user.id);
      const group = await fetchGroupById(selectedGroupId);
      setStudentsList(group.students);
      setMemberCount({ capacity: group.capacity, memberCount: group.memberCount });
      navigate(`/GroupPage/${selectedGroupId}`)
     /*  setShowConfirm(true); // Show the confirmation after successfully joining the group */
    }
    setShowConfirmation(false);
  }

  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId} : קבוצה`}</div>
        <button className='users-in-group-btn' onClick={() => setStudentsPopUp(!studentsPopUp)}>חניכים</button>
        {user.role === "Student" &&
          <button className='join-group-btn' onClick={() => joinGroup(groupId, user.id)}>הצטרף</button>
        }
        <div className='students-Count'>{memberCount.memberCount}/{memberCount.capacity}</div>
      </div>
      {studentsPopUp &&
        <StudentsPopUp studentsList={studentsList} />
      }
      {showConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`האם תרצה להצטרף לקבוצה ${selectedGroupId}?`}
          handleConfirmation={handleConfirmation}
          setShowConfirmation={setShowConfirmation}
        />
      )}
      {/* {showConfirm && (
        <ConfirmMessage
          confirmationMessage={`הצטרפת לקבוצה ${selectedGroupId} בהצלחה`}
          handleConfirm={() => navigate(`GroupPage/${selectedGroupId}`)}
        />
      )} */}
    </>
  );
}

export default Group;
