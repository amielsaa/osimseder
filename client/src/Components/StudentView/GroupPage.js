import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHouseChimney } from "react-icons/fa6";
import Header from '../Header';
import Nav from '../Nav';
import TaskCard from './TaskCard';
import Footer from '../Footer';
import ConfirmationMessage from '../ConfirmationMessage';
import ConfirmMessage from '../ConfirmMessage';
import DataContext from '../../Helpers/DataContext';
import { getGroupById, removeGroupMember, getStudentsWithoutGroupBySchoolId, addGroupMember } from '../../Helpers/StaffFrontLogic';
import '../css/GroupPage.css';

const GroupPage = () => {
  const { id } = useParams();
  const { user } = useContext(DataContext);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [addStudent, setAddStudent] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [studentsFromSchoolWithNoGroup, setStudentsFromSchoolWithNoGroup] = useState([]);
  const [studentList, setStudentsList] = useState([]);
  const [showRemoveConfirmation, setShowRemoveConfirmation] = useState(false);
  const [removeConfirmationIndex, setRemoveConfirmationIndex] = useState(null);
  const [studentToRemove, setStudentToRemove] = useState('');
  const [groupInfo, setGroupInfo] = useState({});
  const [showAddConfirmation, setShowAddConfirmation] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);

  useEffect(() => {
    if (!(localStorage.getItem("accessToken"))) {
      navigate('/404');
    }
  }, []);

  const handleRemoveMember = (index) => {
    setStudentToRemove(studentList[index]);
    setShowRemoveConfirmation(true);
    setRemoveConfirmationIndex(index);
  };

  const handleAddConfirmationPopup = () => {
    if (selectedStudent !== "") {
      setShowAddConfirmation(true);
    }
  };

  const prepareToAddStudent = async () => {
    const res = await getStudentsWithoutGroupBySchoolId(groupInfo.schoolId);
    setStudentsFromSchoolWithNoGroup(res);
    setAddStudent(true);
  };

  const confirmAddMember = async () => {
    try {
      const res = await addGroupMember(studentsFromSchoolWithNoGroup[selectedStudent]?.email, id);
      if (!res) {
        setShowAddConfirmation(false);
        setAddStudent(false);
        setErrorConfirm(true);
      } else {
        setGroupRequest();
        setShowAddConfirmation(false);
        setAddStudent(false);
      }
    } catch (error) {
      setShowAddConfirmation(false);
      setAddStudent(false);
      setErrorConfirm(true);
    }
  };

  const confirmRemoveMember = (confirmed) => {
    if (confirmed) {
      const res = removeGroupMember(studentToRemove.email);
      if (res) {
        const updatedStudents = [...studentList];
        updatedStudents.splice(removeConfirmationIndex, 1);
        setStudentsList(updatedStudents);
      }
    }
    setShowRemoveConfirmation(false);
    setStudentToRemove('');
    setRemoveConfirmationIndex(null);
  };

  const setGroupRequest = async () => {
    const group = await getGroupById(id);
    setGroupInfo(group);
    setStudentsList(group.students);
  };

  useEffect(() => {
    if (id !== '-1' && ((user.role === "Student" && user.groupId !== id) || user.role !== "Student")) {
      setGroupRequest();
    }
  }, [id]);

  return (
    <div>
      <Header />
      <Nav />
      <div className='content-Box-Group'>
        <span className='purple_circle'>
          <button className='back_button' onClick={() => navigate(-1)}>חזרה</button>
        </span>

        {id >= 1 && (
          <div className='group-title'>
            <h1>קבוצה: {id}</h1>
          </div>
        )}

        <div className='main_page_content'>
          {(user.role !== 'Student' || (user.role === "Student" && user.groupId !== null)) && (
            <>
              <div className='group_details'>
              <div className='group-semi-title'>
              <h1>פרטי הקבוצה</h1>
              </div>
                <div className='Info-g'>בית ספר : {groupInfo.schoolName} </div>
                <div className='Info-g'>בית משוייך :
                  {groupInfo && groupInfo.houseId && <FaHouseChimney className='house_for_group' onClick={() => { navigate(`/HousePage/${groupInfo.houseId}`) }} />}
                </div>
              </div>
              <div className='group_members_container'>
                <div className='group-semi-title'>
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
                            <option value="">בחר/י מתנדב/ת</option>
                            {studentsFromSchoolWithNoGroup.map((student, index) => (
                              <option key={index} value={index}>{student.firstName + " " + student.lastName}</option>
                            ))}
                          </select>
                        </div>
                        <button className="add_core_member_button" onClick={() => handleAddConfirmationPopup()}> שייך </button>
                      </>
                    )}
                  </div>
                )}
                <div className='Group-Info'>
                  {studentList.length > 0 ? (
                    studentList.map((student, index) => (
                      <div key={index} className='Group_Member'>
                        <h4 onClick={() => { navigate(`/Personal/${student.encryptedEmail}`) }}>{student.fullname}</h4>
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
              </div>
            </>
          )}
        </div>

        {user.role === 'Student' && user.groupId === null && (
          <div className='user_not_in_group'>
            <div className='group-title'>
              <h1>אינך חבר בקבוצה כרגע</h1>
            </div>
            <button className='move_to_groups_button' onClick={() => navigate('/groups')}>להצטרפות לקבוצה</button>
          </div>
        )}
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
          confirmationMessage={`להוסיף את ${studentsFromSchoolWithNoGroup[selectedStudent]?.firstName + " " + studentsFromSchoolWithNoGroup[selectedStudent]?.lastName} לקבוצה?`}
          handleConfirmation={confirmAddMember}
          setShowConfirmation={setShowAddConfirmation}
        />
      )}

      {errorConfirm && (
        <ConfirmMessage
          confirmationMessage={`ההוספה לא הצליחה, ייתכן כי הקבוצה הגיע לסף המקסימלי של המקומות או שתיתכן שגיאה פנימית במערכת`}
          handleConfirm={() => setErrorConfirm(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default GroupPage;
