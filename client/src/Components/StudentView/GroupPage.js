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
import { getGroupById, removeGroupMember, getStudentsWithoutGroupBySchoolId } from '../../Helpers/StaffFrontLogic';

const GroupPage = () => {
  const { id } = useParams();
  const { user } = useContext(DataContext)
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // State to manage loading
  const [addStudent, setAddStudent] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({})
  const [studentsFromSchoolWithNoGroup,setStudentsFromSchoolWithNoGroup] = useState([])
  const [studentList, setStudentsList] = useState([])
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeConfirmationIndex, setRemoveConfirmationIndex] = useState(null);
  const [studentToRemove, setStudentToRemove] = useState('')
  const [groupInfo, setGroupInfo] = useState({});
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);


  useEffect(() => {
    if(!(localStorage.getItem("accessToken"))){
      navigate('/404')
    }
  })
  /* useEffect(() => {

    if(user.role === "Student" && user.groupId !== id && id !== "-1"){
      navigate('/404')
    }
  }) */

  //Amiel - take group Id and get for me all the necesecry data, the id from the useParams is the groupId!
  //Amiel - make sure I get the info like that from Axios request
 

  const handleRemoveMember = (index) => {
    // Display the confirmation message
    setStudentToRemove(studentList[index])
    setShowRemoveConfirmation(true);
    setRemoveConfirmationIndex(index);
  };
  const popUpAddingScreen = () => {
    if(selectedStudent !== "")
    setShowAddConfirmation(true)

  }
  const prepareToAddStudent = async () => {
    const res = await getStudentsWithoutGroupBySchoolId(groupInfo.schoolId)
    console.log(res)
    setStudentsFromSchoolWithNoGroup()
    setAddStudent(true)
  }

  const confirmAddMember = () => {
    setShowAddConfirmation(false)
    setAddStudent(false)
  }
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
    if (id !== '-1' && ((user.role === "Student" && user.groupId !== id) || user.role !== "Student")) {
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

         
          {(user.role !== 'Student' || (user.role === "Student" && user.groupId !== null)) && (
            <>
              <div className='group-title'>
                <h1>קבוצה: {id}</h1>
              </div>
              <div className='Info'>בית ספר : {groupInfo.schoolName} </div>
              <div className='Info'>בית משוייך :
                {groupInfo && groupInfo.houseId && <FaHouseChimney className='house_for_group' onClick={() => { navigate(`/HousePage/${groupInfo.houseId}`) }} />}
              </div>
              <div className='group-title'>
                <h1>חברי הקבוצה</h1>
              </div>
              {user.role !== "Student" && user.role !== "TeamOwner" && (
                
                <div className='join_student_to_group_div'>
                {!addStudent && (
                  <button className='add_to_group_button' onClick={() => prepareToAddStudent()}>צרף +</button>
                
                )}
                {addStudent && (
                  <>
                  <div className="member_select_wrapper">
                    <select value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
                      <option value="">בחר/י חניך</option>
                      {studentsFromSchoolWithNoGroup.map((member, index) => (
                        <option key={index} value={index}>{member.fullName}</option>
                      ))} 
                    </select>
                  </div>
                    <button className="add_core_member_button" onClick={() => popUpAddingScreen()}> שייך </button>
                </>
                
                )}
                </div>
                
              )}
              
              

                
              <div className='Group-Info'>
                {studentList.length > 0 ? (
                  studentList.map((student, index) => (
                    <div key={index} className='Group_Member'>
                      <h4 onClick={() => {navigate(`/Personal/${student.encryptedEmail}`)}}>{student.fullname}</h4>
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
          confirmationMessage={`להסיר את ${studentToRemove.fullname} מהקבוצה?`}
          handleConfirmation={confirmRemoveMember}
          setShowConfirmation={setShowRemoveConfirmation}
        />
      )}
      {showAddConfirmation && (
        <ConfirmationMessage
          confirmationMessage={`להוסיף את ${selectedStudent.fullname} לקבוצה?`}
          handleConfirmation={confirmAddMember}
          setShowConfirmation={setShowAddConfirmation}
        />
      )}

      <Footer />
    </div>
  );
}

export default GroupPage;
