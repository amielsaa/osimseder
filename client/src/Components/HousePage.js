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
import {getHouseById, getTasksByHouseId} from '../Helpers/StaffFrontLogic'

const HousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const {navigate, user} = useContext(DataContext)
  const [tasks, setTasks] = useState([]);

  const generateRandomHouse = () => {
    const getRandomValue = (array) => array[Math.floor(Math.random() * array.length)];

    const genders = ["זכר", "נקבה"];
    const cities = ["תל אביב", "ירושלים", "חיפה", "באר שבע"];
    const languages = ["עברית", "אנגלית", "ערבית"];

    const randomHouse = {
      teamOwner1: "איזה מישהו",
      teamOwner2: "מישהו אחר",
      contactName: "דוד כהן",
      gender: getRandomValue(genders),
      city: getRandomValue(cities),
      neighborhood: "שכונה ב",
      address: "רחוב הראשון 123",
      languages: [getRandomValue(languages)],
      numberOfRooms:5,
      groupSizeNeeded:3,
      phoneNumber: "123-456-7890",
      alternativeNumber: "987-654-3210",
      notes: "אני מתקשה ללכת וצריכה עזרה",
    };

    return randomHouse;
  };

  const setHouseRequest = async () => {
    const houseJson = await getHouseById(id);
    setHouse(houseJson);
  }

  const setTasksRequest = async () => {
    const tasksJson = await getTasksByHouseId(id);
    setTasks(tasksJson);
  }

  useEffect(() => {        
    setHouseRequest();
    setTasksRequest();
  }, [tasks]); // Dependency array ensures it runs when the id changes

  
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
          <button className="edit_house_button"> ערוך בית</button>
          <button className="add_task_button" onClick={() => navigate(`/addTask/${id}`)}>הוסף מטלה</button>
        </div>
        }
        

          {user.role !== 'Student' && user.role !== 'TeamOwner' &&
           <div className="groups_of_house">
           <div className="house_group_info">
             קבוצה משוייכת: 
             <MdGroups className='group_of_house_icon' onClick={() => navigate(`/GroupPage/${ id }`)}/> 
             {/* <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${ id }`)}> הוסף </button> */}
 
             {/* Amiel - when pressing on the הסר button, you need to remove the group from the house */}
             <button className="add_group_button" > הסר </button>
 
           </div>
           <div className="house_group_info">
             קבוצה משוייכת: 
            {/*  <MdGroups className='group_of_house_icon'/>  */}
             <button className="add_group_button" onClick={() => navigate(`/addGroupToHouse/${ id }`)}> הוסף </button>
             {/*<button className="add_group_button" > הסר </button>*/}
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
            מין: {house?.residentGender}
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
        <div className='House-Info-Tasks'>
          {tasks.map((task, index) => (
            <TaskCard key={index} room={task.room} tasks={task.tasks} />
          ))}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default HousePage;
