import React, { useContext, useEffect, useState } from 'react';
import '../css/Group.css';
import StudentsPopUp from './StudentsPopUp';
import DataContext from '../../Helpers/DataContext';
import { handleJoinGroup, fetchGroupById } from '../../Helpers/StudentFrontLogic';
import ConfirmationMessage from '../ConfirmationMessage'; // Import ConfirmationMessage component
import ConfirmMessage from '../ConfirmMessage'; // Import ConfirmMessage component (assuming it exists)


const Group = ({ groupId }) => {
  const { user,navigate, updateUserGroupId } = useContext(DataContext);
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

    const joinGroup = async (groupId, email) => {
    setSelectedGroupId(groupId);
    setShowConfirmation(true);
  }

  const handleConfirmation = async (confirmed) => {
    if (confirmed) {
      try{
      const group = await fetchGroupById(selectedGroupId);
      if(group.capacity > group.memberCount){ 
      await handleJoinGroup(selectedGroupId, user.id);
      await updateUserGroupId(selectedGroupId)
      setStudentsList(group.students);
      setMemberCount({ capacity: group.capacity, memberCount: group.memberCount });
      navigate(`/GroupPage/${selectedGroupId}`)
      }
      else {
        setShowConfirm(true)
      }
     /*  setShowConfirm(true); // Show the confirmation after successfully joining the group */
    }
    catch(e){
    }
 }
    setShowConfirmation(false);
  }

  return (
    <>
      <div className="group">
        <div className='group-id'>{`${groupId} : קבוצה`}</div>
        <button className='users-in-group-btn' onClick={() => setStudentsPopUp(!studentsPopUp)}>חניכים</button>
        {user.role === "Student" && user.groupId !== groupId &&
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
      {showConfirm && (
        <ConfirmMessage
          confirmationMessage={`!אופס, קבוצה ${selectedGroupId} מלאה`}
          handleConfirm={() => setShowConfirm(false)}
        />
      )}
      
    </>
  );
}

export default Group;
