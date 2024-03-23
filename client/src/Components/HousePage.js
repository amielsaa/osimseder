import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import './css/HousePage.css';
import HousePicture from '../images/housepicture.jpg';
import TaskCard from "./StudentView/TaskCard";
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from "../Helpers/DataContext";
import Footer from "./Footer";
import { MdGroups } from "react-icons/md";
import { getHouseById, removeGroupByHouse, getTasksByHouseId, fetchGroupsForHouse } from '../Helpers/StaffFrontLogic';

const HousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const { navigate, user } = useContext(DataContext);
  const [tasks, setTasks] = useState([]);
  const [firstGroup, setFirstGroup] = useState('');
  const [secondGroup, setSecondGroup] = useState('');
  const [firstMember, setFirstMember] = useState('');
  const [secondMember, setSecondMember] = useState('');
  const [dropdownOptionsA, setDropdownOptionsA] = useState(["דר. דרה", "אייס קיוב","איזי","ילה","מק רן"]);
  // for selecting memebers to the group
  const [memberAChoosingStatus,setMemberAChoosingStatus] = useState(false)
  const [memberBChoosingStatus,setMemberBChoosingStatus] = useState(false)
  const [selectedMemberA,setSelectedMemberA] = useState('')
  const [selectedMemberB,setSelectedMemberB] = useState('')

  const prepareToAssignTeamOwnerA = () => {
    setMemberBChoosingStatus(false);
    setMemberAChoosingStatus(true)
    //Amiel - this is your time to shine, get all the Team owners and set them to the options for dropdownOptionsA
  }
  const removeFirstMember = () => {
    setFirstMember('')
    //Amiel - removes the first Member
  }

  const handleAssignMemberA = () => {
    //Amiel- you need to put selected Member A in the database, as the teamOwner responsible for this house
    setFirstMember(selectedMemberA)
    setMemberAChoosingStatus(false)

  }
  const prepareToAssignTeamOwnerB = () => {
    setMemberAChoosingStatus(false)
    setMemberBChoosingStatus(true);

     //Amiel - this is your time to shine, get all the Team owners and set them to the options for dropdownOptionsB
  };
  
  const removeSecondMember = () => {
    setSecondMember('');
    //Amiel - removes the second Member
  };
  
  const handleAssignMemberB = () => {
    //Amiel - you need to put selected Member B in the database, as the teamOwner responsible for this house
    setSecondMember(selectedMemberB);
    setMemberBChoosingStatus(false);
  };
  const generateRandomHouse = () => {
    const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

    const genders = ["זכר", "נקבה"];
    const cities = ["תל אביב", "ירושלים", "חיפה", "באר שבע"];
    const languages = ["עברית", "אנגלית", "ערבית"];

    const randomHouse = {
      teamOwner1: "איזה מישהו",
      teamOwner2: "מישהו אחר",
      residentFirstName: "דוד",
      residentLastName: "כהן",
      residentGender: getRandomValue(genders),
      cityName: getRandomValue(cities),
      areaName: "שכונה ב",
      address: "רחוב הראשון 123",
      languageNeeded: [getRandomValue(languages)],
      numberOfRooms: 5,
      membersNeeded: 3,
      phoneNumber: "123-456-7890",
      alternativeNumber: "987-654-3210",
      freeText: "אני מתקשה ללכת וצריכה עזרה",
    };

    return randomHouse;
  };
  const doNothing = () => {

  }

  const setHouseRequest = async () => {
    const houseJson = await getHouseById(id);
    setHouse(houseJson);
  }

  const setTasksRequest = async () => {
    const tasksJson = await getTasksByHouseId(id);
    setTasks(tasksJson);
  }
  const removeGroupFromHouse = (groupId) => {
    const res = removeGroupByHouse(groupId);
    if (res) { 
      if (firstGroup.id === groupId) {
        setFirstGroup('');
      } else {
        setSecondGroup('');
      }
    }
  }
  const removeMemberFromHouse = async (memberId) => {
    //Amiel - remove the memeber from the house
  }
  const setGroupsRequest = async () => {
    const res = await fetchGroupsForHouse(id);
    if (res[0]) {
      setFirstGroup(res[0]);
    }
    if (res[1]) {
      setSecondGroup(res[1]);
    }
  }

  useEffect(() => {
    setGroupsRequest()
    setHouseRequest();
    setTasksRequest();
    console.log(house)
  }, []);  // Dependency array ensures it runs when the id changes


  return (
    <>
      <Header />
      <Nav />
      <div className='content-Box-House'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className="House_main_content">
          <div className="title_picture">
            <div className="House-title">
              <h1>בית מספר : {id}</h1>
            </div>
            <div className="House_picture">
              <img src={HousePicture} alt="אין תמונה" />
            </div>
          </div>
          {user.role !== "Student" &&
            <div className="buttons_for_house_logic">
              <button className="edit_house_button" onClick={() => navigate(`/EditHouse/${id}`)}> ערוך בית</button>
              <button className="add_task_button" onClick={() => navigate(`/addTask/${id}`)}>הוסף מטלה</button>
            </div>
          }


          {user.role !== 'Student' &&
            <div className="groups_of_house_content">
              <div className="title_for_groups_of_house">קבוצות משוייכות</div>
              <div className="groups_of_house">
                <div className="house_group_info">
                  <h4 onClick={firstGroup ? ()=> navigate(`/GroupPage/${firstGroup.id}`): doNothing()}>קבוצה משוייכת : {firstGroup? firstGroup.id : ""}</h4>
                  {!firstGroup && user.role !== "TeamOwner" && (
                    <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${id}`)}> הוסף </button>

                  )}
                  {firstGroup && user.role !== "TeamOwner" && (
                    <button className="add_group_button" onClick={() => removeGroupFromHouse(firstGroup.id)} > הסר </button>
                  )}

                </div>
                <div className="house_group_info">
                <h4 onClick={secondGroup ? ()=> navigate(`/GroupPage/${secondGroup.id}`) : doNothing()}>קבוצה משוייכת : {secondGroup? secondGroup.id : ""}</h4>
                  {!secondGroup && user.role !== "TeamOwner" && (
                    <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${id}`)}> הוסף </button>

                  )}
                  {secondGroup && user.role !== "TeamOwner" && (
                    <button className="add_group_button" onClick={() => removeGroupFromHouse(secondGroup.id)} > הסר </button>
                  )}
                </div>
              </div>
            </div>
          }
          {user.role !== 'Student' && user.role!= 'TeamOwner' &&
            <div className="members_of_house_content">
              <div className="title_for_members_of_house">חברי גרעין אחראים</div>
              <div className="members_of_house">
                <div className="member_in_charge_info">





                {!memberAChoosingStatus && (
                  <>
                    חבר גרעין א: {firstMember? firstMember : ""}
                    
                    {!firstMember && user.role !== "TeamOwner" && (
                      <button className="add_core_member_button" onClick={() => prepareToAssignTeamOwnerA()}> הוסף </button>
                    )}
                    {firstMember && user.role !== "TeamOwner" && (
                      <button className="add_core_member_button" onClick={() => removeFirstMember()} > הסר </button>
                    )}
                  </>
                )}
                {memberAChoosingStatus && (
                <>
                  <div className="member_select_wrapper">
                    <select value={selectedMemberA} onChange={(e) => setSelectedMemberA(e.target.value)}>
                      <option value="">בחר חבר גרעין</option>
                      {dropdownOptionsA.map((member, index) => (
                        <option key={index} value={member}>{member}</option>
                      ))} 
                    </select>
                  </div>

                    <button className="add_core_member_button" onClick={handleAssignMemberA}> שייך </button>
                </>
                )}
                 







                </div>
                <div className="member_in_charge_info">
                {!memberBChoosingStatus && (
                      <>
                        חבר גרעין ב: {secondMember ? secondMember : ""}
                        {!secondMember && user.role !== "TeamOwner" && (
                          <button className="add_core_member_button" onClick={prepareToAssignTeamOwnerB}> הוסף </button>
                        )}
                        {secondMember && user.role !== "TeamOwner" && (
                          <button className="add_core_member_button" onClick={removeSecondMember}> הסר </button>
                        )}
                      </>
                    )}
                    {memberBChoosingStatus && (
                      <>
                        <div className="member_select_wrapper">
                          <select value={selectedMemberB} onChange={(e) => setSelectedMemberB(e.target.value)}>
                            <option value="">בחר חבר גרעין</option>
                            {dropdownOptionsA.map((member, index) => (
                              <option key={index} value={member}>{member}</option>
                            ))}
                          </select>
                        </div>
                        <button className="add_core_member_button" onClick={handleAssignMemberB}> שייך </button>
                      </>
                    )}
                </div>
              </div>
            </div>
          }

          <div className="House_Info">
            <div className="house_Info_Title"><h1>פרטי הבית</h1></div>
            <div className="Info">
              עיר: {house?.cityName}
            </div>
            <div className="Info">
              שכונה: {house?.areaName}
            </div>
            <div className="Info">
              כתובת: {house?.address}
            </div>
            <div className="Info">
              שם איש קשר: {house?.residentFirstName + " " + house?.residentLastName}
            </div>
            <div className="Info">
              מספר איש קשר: {house?.residentPhoneNum}
            </div>
            <div className="Info">
              מספר חלופי: {house?.residentAlternatePhoneNum}
            </div>
            <div className="Info">
              מין הדייר/ת: {house?.residentGender}
            </div>
            <div className="Info">
              שפה נחוצה: {house?.languageNeeded}
            </div>
            <div className="Info">
              מספר חדרים: {house?.numberOfRooms}
            </div>
            <div className="Info">
              גודל קבוצה נחוץ: {house?.membersNeeded}
            </div>
            <div className="Info">
              הערות : {house?.freeText}
            </div>
          </div>
          <div className="House-Tasks">
            <div className="House-title-Tasks">
              <h1>מטלות הבית</h1>
            </div>
            <div className='House-Info-Tasks'>
              {tasks.length > 0 ? (
                tasks.map((task, index) => (
                  <TaskCard key={index} room={task.room} tasks={task.tasks} />
                ))
              ) : (
                <div className="empty-tasks">
                  <h2>אין מטלות כרגע</h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HousePage;
