import { useParams } from 'react-router-dom';
import Header from '../Header';
import Nav from '../Nav';
import TaskCard from './TaskCard';
import '../css/GroupPage.css'
import DataContext from '../../Helpers/DataContext';
import { useContext, useEffect } from 'react';
import React, { useState } from 'react';
import { IoChevronForwardCircle } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import Footer from '../Footer';
import { FaHouseChimney } from "react-icons/fa6";
import ConfirmationMessage from '../ConfirmationMessage';
import { getGroupById, removeGroupMember } from '../../Helpers/StaffFrontLogic';

const GroupPage = () => {
  const { id } = useParams();
  const { user } = useContext(DataContext)
  const navigate = useNavigate();


  //Amiel - take group Id and get for me all the necesecry data, the id from the useParams is the groupId!
  //Amiel - make sure I get the info like that from Axios request
  const [studentList, setStudentsList] = useState([])
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeConfirmationIndex, setRemoveConfirmationIndex] = useState(null);
  const [studentToRemove, setStudentToRemove] = useState('')
  const [groupInfo, setGroupInfo] = useState({});


  const handleRemoveMember = (index) => {
    // Display the confirmation message
    setStudentToRemove(studentList[index])
    setShowRemoveConfirmation(true);
    setRemoveConfirmationIndex(index);
  };

  const confirmRemoveMember = (confirmed) => {
    if (confirmed) {
      const res = removeGroupMember(studentToRemove.email)
      if (res) {
        const updatedStudents = [...studentList];
        updatedStudents.splice(removeConfirmationIndex, 1);
        setStudentsList(updatedStudents);
      }
    }


    // Close the confirmation message
    setShowRemoveConfirmation(false);
    setStudentToRemove('')
    setRemoveConfirmationIndex(null);
  };

  const setGroupRequest = async () => {
    const group = await getGroupById(id);
    setGroupInfo(group);
    setStudentsList(group.students);
  }

  useEffect(() => {
    if (id !== '-1') {
      setGroupRequest();
    }
  }, [id])


  return (
    <div>
      <Header />
      <Nav />
      <div className='content-Box-Group'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className='main_page_content'>

          {/* Content to conditionally hide */}
          {user.role !== 'Student' || user.groupId !== null && (
            <>
              <div className='group-title'>
                <h1>קבוצה: {id}</h1>
              </div>
              <div className='Info'>בית ספר : </div>
              <div className='Info'>בית משוייך :
                {groupInfo && groupInfo.houseId && <FaHouseChimney className='house_for_group' onClick={() => { navigate(`/HousePage/${groupInfo.houseId}`) }} />}
              </div>
              <div className='group-title'>
                <h1>חברי הקבוצה</h1>
              </div>
              <div className='Group-Info'>
                {studentList.length > 0 ? (
                  studentList.map((student, index) => (
                    <div key={index} className='Group_Member'>
                      <h4>{student.fullname}</h4>
                      {user.role !== 'Student' && (
                        <button className='kick_student' onClick={() => handleRemoveMember(index)}>הסר</button>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="empty-group">
                    <h1>הקבוצה ריקה</h1>
                  </div>
                )}
              </div>
            </>
          )}
          {user.role === 'Student' && user.groupId === null && (
            <div className='user_not_in_group'>
              <div className='group-title'>
                <h1>אינך חבר בקבוצה כרגע</h1>
              </div>
              <button className='move_to_groups_button' onClick={() => navigate('/groups')}>להצטרפות לקבוצה</button>
              </div>
      
          )}


        </div>
      </div>

      {showRemoveConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`להסיר את ${studentToRemove} מהקבוצה?`}
          handleConfirmation={confirmRemoveMember}
          setShowConfirmation={setShowRemoveConfirmation}
        />
      )}

      <Footer />
    </div>
  );
}

export default GroupPage;
