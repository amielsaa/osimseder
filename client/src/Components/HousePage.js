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


const HousePage = () => {
  const { id } = useParams();
  const [house, setHouse] = useState(null);
  const {navigate} = useContext(DataContext)

  useEffect(() => {
    // Generate a random House object for testing
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
    

    // Set the generated random house to the state
    setHouse(generateRandomHouse());
  }, [id]); // Dependency array ensures it runs when the id changes
  const [tasks, setTasks] = useState([
    {
      room: 'סלון',
      tasks: [
        { taskId: 1, description: 'ניקיון', status: true },
        { taskId: 2, description: 'סידור', status: false },
      ]
    },
    {
      room: 'חדר ילדים',
      tasks: [
        { taskId: 3, description: 'תיקון', status: false },
        { taskId: 4, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'מטבח',
      tasks: [
        { taskId: 5, description: 'תיקון', status: false },
        { taskId: 6, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'חדר שינה',
      tasks: [
        { taskId: 7, description: 'תיקון', status: false },
        { taskId: 8, description: 'ניקיון', status: true },
      ]
    },
    {
      room: 'מחסן',
      tasks: [
        { taskId: 9, description: 'ניקיון', status: true },
        { taskId: 10, description: 'סידור', status: false },
      ]
    },
  ]);
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
        <div className="buttons_for_house_logic">
          <button className="edit_house_button"> ערוך בית</button>
          <button className="add_task_button">הוסף מטלה</button>

        </div>
        <div className="House_Info">
          <div className="Info">
              חבר גרעין אחראי 1: {house?.teamOwner1}
          </div>
          <div className="Info">
              חבר גרעין אחראי 2: {house?.teamOwner2}
          </div>
          <div className="Info">
            עיר: {house?.city}
          </div>
          <div className="Info">
            שכונה: {house?.neighborhood}
          </div>
          <div className="Info">
            כתובת: {house?.address}
          </div>
          <div className="Info">
            שם איש קשר: {house?.contactName}
          </div>
          <div className="Info">
            מין: {house?.gender}
          </div>
          <div className="Info">
             שפה נחוצה: {house?.languages.join(", ")}
          </div>
          <div className="Info">
            מספר חדרים: {house?.numberOfRooms}
          </div>
          <div className="Info">
            גודל קבוצה נחוץ: {house?.groupSizeNeeded}
          </div>
          <div className="Info">
            הערות : {house?.notes}
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
