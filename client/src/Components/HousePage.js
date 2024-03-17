import {  useContext, useEffect, useState } from "react";
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
import {getHouseById, removeGroupByHouse, getTasksByHouseId, fetchGroupsForHouse} from '../Helpers/StaffFrontLogic'

const HousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const {navigate, user} = useContext(DataContext)
  const [tasks, setTasks] = useState([]);
  const [firstGroup, setFirstGroup] = useState('');
  const [secondGroup, setSecondGroup] = useState('');

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
      numberOfRooms:5,
      membersNeeded:3,
      phoneNumber: "123-456-7890",
      alternativeNumber: "987-654-3210",
      freeText: "אני מתקשה ללכת וצריכה עזרה",
    };

    return randomHouse;
  };
  //TO REMOVE
  useEffect(() => {
    setHouse(generateRandomHouse)
  },[])

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
    if(res) {
      if(firstGroup.id === groupId) {
        setFirstGroup('');
      } else {
        setSecondGroup('');
      }
    }
  }

  const setGroupsRequest = async () => {
   const res = await fetchGroupsForHouse(id); 
   console.log(res);
   if(res[0]) {
    setFirstGroup(res[0]);
   }
   if(res[1]) {
    setSecondGroup(res[1]);
   }
  }
  // TO REMOVE
  /* useEffect(() => {  
    setGroupsRequest()
    setHouseRequest();
    setTasksRequest();
  }, []); */ // Dependency array ensures it runs when the id changes

  
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
        

          {user.role !== 'Student'&&
           <div className="groups_of_house">
           <div className="house_group_info">
             קבוצה משוייכת:
             {firstGroup && (
              <MdGroups className='group_of_house_icon' onClick={() => navigate(`/GroupPage/${ firstGroup.id }`)}/> 
             )}
             {!firstGroup && user.role !== "TeamOwner" && (
              <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${ id }`)}> הוסף </button> 

             )}
              {firstGroup && user.role !== "TeamOwner" && (
               <button className="add_group_button" onClick={() => removeGroupFromHouse(firstGroup.id)} > הסר </button>
              )}
 
           </div>
           <div className="house_group_info">
             קבוצה משוייכת: 
             {secondGroup && (
              <MdGroups className='group_of_house_icon' onClick={() => navigate(`/GroupPage/${ secondGroup.id }`)}/> 
             )}
             {!secondGroup && user.role !== "TeamOwner" && (
              <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${ id }`)}> הוסף </button> 

             )}
              {secondGroup && user.role !== "TeamOwner" && (
               <button className="add_group_button" onClick={() => removeGroupFromHouse(secondGroup.id)} > הסר </button>
              )}
           </div>
           </div> }
          
        <div className="House_Info">
          <div className="Info">
              חבר גרעין  1: {house?.teamOwner1}
          </div>
          <div className="Info">
              חבר גרעין  2: {house?.teamOwnerEmail_2}
          </div>
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
            מספר איש קשר: {house?.phoneNumber}
          </div>
          <div className="Info">
            מספר חלופי: {house?.alternativeNumber}
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
          {tasks.map((task, index) => (
            <TaskCard key={index} room={task.room} tasks={task.tasks} />
          ))}
        </div>
      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HousePage;
