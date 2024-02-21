import {  useContext, useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import './css/HousePage.css';
import HousePicture from '../images/housepicture.jpg';
import TaskCard from "./StudentView/TaskCard";
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from "../Helpers/DataContext";


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
        contactName: "דוד כהן",
        gender: getRandomValue(genders),
        city: getRandomValue(cities),
        address: "רחוב הראשון 123",
        languages: [getRandomValue(languages)],
        phoneNumber: "123-456-7890",
        alternativeNumber: "987-654-3210",
        notes: "אוהב משכבי זכר למיניהם",
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
        <div className="title_picture">
          <div className="House-title">
            <h1>בית מספר : {id}</h1>
          </div>
          <div className="House_picture">
            <img src={HousePicture} alt="אין תמונה" />
          </div>
        </div>
        <div className="House_Info">
          <div className="Info">
            שם איש קשר: {house?.contactName}
          </div>
          <div className="Info">
            מגדר: {house?.gender}
          </div>
          <div className="Info">
            עיר: {house?.city}
          </div>
          <div className="Info">
            כתובת: {house?.address}
          </div>
          <div className="Info">
            שפות: {house?.languages.join(", ")}
          </div>
          <div className="Info">
            מספר פלאפון: {house?.phoneNumber}
          </div>
          <div className="Info">
            מספר חלופי: {house?.alternativeNumber}
          </div>
          <div className="Info">
            הערות: {house?.notes}
          </div>
          <div className="Info">
            קבוצה :
          </div>
        </div>
        <div className='House-Info-Tasks'>
          {tasks.map((task, index) => (
            <TaskCard key={index} room={task.room} tasks={task.tasks} />
          ))}
        </div>
        
      </div>
    </>
  );
}

export default HousePage;
