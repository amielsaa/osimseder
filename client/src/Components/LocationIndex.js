import React, { useContext, useEffect, useState } from 'react';
import './css/LocationIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import InputConfirmationMessage from './InputConfirmationMessage';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import ConfirmationMessage from './ConfirmationMessage';
import {fetchAllCities, addCity, editCity, deleteCity,
        fetchAllSchools, addSchool, editSchool, deleteSchool,
        fetchAllAreas, addArea, editArea, deleteArea} from '../Helpers/AdminFrontLogic';

const cityList = [
    { cityId: 1, cityName: "ירושלים" },
    { cityId: 2, cityName: "תל אביב" },
    { cityId: 3, cityName: "באר שבע" },
    { cityId: 4, cityName: "חיפה" },
    { cityId: 5, cityName: "אשדוד" },
    { cityId: 6, cityName: "ראשון לציון" },
    { cityId: 7, cityName: "פתח תקווה" },
    { cityId: 8, cityName: "נתניה" },
    { cityId: 9, cityName: "הרצליה" },
    { cityId: 10, cityName: "רמת גן" }
  ];
  const areaList = [
    { areaId: 1, areaName: "מחוז ירושלים" },
    { areaId: 2, areaName: "מחוז תל אביב" },
    { areaId: 3, areaName: "מחוז דרום" },
    { areaId: 4, areaName: "מחוז צפון" },
    { areaId: 5, areaName: "מחוז חיפה" },
    { areaId: 6, areaName: "מחוז המרכז" },
    { areaId: 7, areaName: "מחוז יהודה ושומרון" },
    { areaId: 8, areaName: "מחוז השפלה" },
    { areaId: 9, areaName: "מחוז השרון" },
    { areaId: 10, areaName: "מחוז הגליל" }
];
const schoolList = [
    { schoolId: 1, schoolName: "תיכון הרצליה" },
    { schoolId: 2, schoolName: "תיכון גימנסיה" },
    { schoolId: 3, schoolName: "תיכון רוטברג" },
    { schoolId: 4, schoolName: "תיכון בליך" },
    { schoolId: 5, schoolName: "תיכון הראל" },
    { schoolId: 6, schoolName: "תיכון חדש תל אביב" },
    { schoolId: 7, schoolName: "תיכון עירוני ד' תל אביב" },
    { schoolId: 8, schoolName: "תיכון עירוני ה' חיפה" },
    { schoolId: 9, schoolName: " תיכון עירוני א' אשדוד" },
    { schoolId: 10, schoolName: "תיכון רמלה לוד" }
];

  

  

const LocationIndex = () => {
  const [cities,setCities] = useState(cityList)
  const [areas,setAreas] = useState(areaList)
  const [schools,setSchools] = useState(schoolList)
  const { navigate, user } = useContext(DataContext);
  const [showAreasAndSchools, setShowAreasAndSchools] = useState(false)
  const [chosenCity, setChosenCity] = useState('')
  const [cityToModify, setCityToModify] = useState('')
  const [schoolToModify, setSchoolToModify] = useState('')
  const [areaToModify, setAreaToModify] = useState('')
  const [cityConfirmationAddMessage, setCityConfirmationAddMessage] = useState(false)
  const [areaConfirmationAddMessage, setAreaConfirmationAddMessage] = useState(false)
  const [schoolConfirmationAddMessage, setSchoolConfirmationAddMessage] = useState(false)
  const [cityConfirmationEditMessage, setCityConfirmationEditMessage] = useState(false)
  const [areaConfirmationEditMessage, setAreaConfirmationEditMessage] = useState(false)
  const [schoolConfirmationEditMessage, setSchoolConfirmationEditMessage] = useState(false)
  const [cityConfirmationDeleteMessage, setCityConfirmationDeleteMessage] = useState(false)
  const [areaConfirmationDeleteMessage, setAreaConfirmationDeleteMessage] = useState(false)
  const [schoolConfirmationDeleteMessage, setSchoolConfirmationDeleteMessage] = useState(false)

  useEffect(() => {
    setAllCities();
    // Amiel - use this useEffect to load all the cities to the const 'cities' by setCities.
  },[])

  async function setAllCities() {
    const cities = await fetchAllCities();
    setCities(cities);
  }

  async function setSchoolsByCity(city) {
    const schools = await fetchAllSchools(city.id);
    setSchools(schools);
  }

  async function setAreasByCity(city) {
    const areas = await fetchAllAreas(city.id);
    setAreas(areas);
  }


  function onCityClick(city){
    setChosenCity(city);
    setSchoolsByCity(city);
    setAreasByCity(city);
    setShowAreasAndSchools(true)
  }



   // ------------------------------ Add ------------------------------------------
   function onAddCity() {
    setCityConfirmationAddMessage(true)
  }
  async function handleAddCity(cityName) {
    //Amiel - you get the new cityName and you make a new city in the system - I hope you have ID counter in the back,
    //backend logic is here.
    await addCity(cityName);
    setAllCities();
  }
  function onAddSchool() {
    setSchoolConfirmationAddMessage(true)

  }
  async function handleAddSchool(schooName) {
    //Amiel - you get the new schoolName and the city from chosenCity , you add the new school and give it an Id
    //backend logic is here.
    await addSchool(schooName, chosenCity.id)
    setSchoolsByCity(chosenCity)
  }
  function onAddArea() {
    setAreaConfirmationAddMessage(true)
  }
  async function handleAddArea(areaName) {
    //Amiel - you get the new areaName and the city from chosenCity , you add the new area and give it an Id
    //backend logic is here.
    await addArea(areaName, chosenCity.id);
    setAreasByCity(chosenCity);
  }
  // -----------------------------------------------------------------------------------
  // ------------------------------ Edit ------------------------------------------
  function onEditCity(city) {
    setCityToModify(city)
    setCityConfirmationEditMessage(true)
  }
  async function handleEditCity(cityName) {
    //Amiel - you get the new cityName and the city to modify on the const  cityToModify,
    //backend logic is here.
    await editCity(cityToModify.id, cityName)
    setAllCities();
  }
  function onEditSchool(school) {
    setSchoolToModify(school)
    setSchoolConfirmationEditMessage(true)

  }
  async function handleEditSchool(schooName) {
    //Amiel - you get the new schoolName and the city to modify on the const  schoolToModify,
    //backend logic is here.
    await editSchool(schoolToModify.id, schooName);
    setSchoolsByCity(chosenCity);
  }
  function onEditArea(area) {
    setAreaToModify(area)
    setAreaConfirmationEditMessage(true)
  }
  async function handleEditArea(areaName) {
    //Amiel - you get the new areaName and the city to modify on the const  areaToModify,
    //backend logic is here.
    await editArea(areaToModify.id, areaName);    
    setAreasByCity(chosenCity);
  }
  // -----------------------------------------------------------------------------------

  // ------------------------------ Delete ------------------------------------------
  function onDeleteCity(city) {
    setCityToModify(city)
    setCityConfirmationDeleteMessage(true)
  }
  async function handleDeleteCity() {
    //Amiel - you take the cityId cityToModify and you delete the city from the system, you delete everything that has to do with that city - students, groups,  schools, areas, houses... everything!
    //backend logic is here.
    await deleteCity(cityToModify.id)
    setAllCities();
    setCityConfirmationDeleteMessage(false)
  }
  function onDeleteSchool(school) {
    setSchoolToModify(school)
    setSchoolConfirmationDeleteMessage(true)

  }
  async function handleDeleteSchool() {
    await deleteSchool(schoolToModify.id);
    setSchoolsByCity(chosenCity);
    setSchoolConfirmationDeleteMessage(false)
  }
  function onDeleteArea(area) {
    setAreaToModify(area)
    setAreaConfirmationDeleteMessage(true)
  }
  async function handleDeleteArea() {
    await deleteArea(areaToModify.id);
    setAreasByCity(chosenCity);
    setAreaConfirmationDeleteMessage(false)
    
  }
  // -----------------------------------------------------------------------------------

  return (
    <>
      <Header />
      <Nav />
        <div className='content-box-location-index'>


            <div className='cities-list-container'>
            <div className='cities-title'>
            <button className='add-city-button' onClick={onAddCity}>הוסף</button>
            <h1>ערים במערכת</h1>
            <h2>לחץ על עיר על מנת לראות רשימת איזורים/ בתי ספר</h2>
            </div>
            <div className='cities-list'>
                {cities.map(city => 
                    <div key={city.id} className='city-preview' onClick={() => onCityClick(city)}>
                    <div className='city-name-container'  title={city.cityName}>{city.cityName}</div>
                    <div className='buttons-container' >
                    <div className='city-name-change-button-container' title='ערוך שם' onClick={(e) => {e.stopPropagation();
                                                                                                          onEditCity(city)
                    }}><FaPencilAlt /></div>
                    <div className='city-delete-button-container' title='מחק' onClick={(e) => {e.stopPropagation();
                                                                                                  onDeleteCity(city)
                    }}><FaTrashAlt/></div>
                    </div>
                </div>
                )} 
            </div>
            </div>


            <div className='school-area-list-container'>
            <div className='cities-title'>
            <h1>{`איזורים / בתי ספר ${chosenCity? `ב${chosenCity.cityName}` : ''}`}</h1>
            </div>
            <div className='school-area-container'>

            {showAreasAndSchools && (<div className='areas-container'>
              <div className='area-title'>
              <button className='add-area-button' onClick={onAddArea}>הוסף</button>
                <h1>איזורים</h1>
              </div>
              <div className='area-list'>
              {areas.map(area => 
                    <div key={area.areaId} className='city-preview'>
                    <div className='area-name-container' title={area.areaName}>{area.areaName}</div>
                    <div className='buttons-container'>
                    <div className='area-name-change-button-container' title='ערוך שם' onClick={(e) => {e.stopPropagation();
                                                                                                          onEditArea(area)
                    }}><FaPencilAlt /></div>
                    <div className='area-delete-button-container' title='מחק' onClick={(e) => {e.stopPropagation();
                                                                                                  onDeleteArea(area)
                    }}><FaTrashAlt/></div>
                    </div>
                </div>
                )} 
              </div>
            </div>)}
            {showAreasAndSchools && (<div className='schools-container'>
              <div className='school-title'>
              <button className='add-school-button' onClick={onAddSchool}>הוסף</button>
                <h1>בתי ספר</h1>
              </div>
              <div className='school-list'>
              {schools.map(school => 
                    <div key={school.schoolId} className='city-preview'>
                    <div className='school-name-container' title={school.schoolName}>{school.schoolName}</div>
                    <div className='buttons-container'>
                    <div className='school-name-change-button-container' title='ערוך שם' onClick={(e) => {e.stopPropagation();
                                                                                                          onEditSchool(school)
                    }}><FaPencilAlt /></div>
                    <div className='school-delete-button-container' title='מחק' onClick={(e) => {e.stopPropagation();
                                                                                                  onDeleteSchool(school)
                    }}><FaTrashAlt/></div>
                    </div>
                </div>
                )} 
              </div>
                

              </div>)}
            </div>

            </div>


          {/* Add */}
          {cityConfirmationAddMessage && (
            <InputConfirmationMessage
            promptMessage={`הכנס שם של העיר החדשה`}
            handleInput={handleAddCity}
            setShowInput={setCityConfirmationAddMessage}
            />
          )}
          {schoolConfirmationAddMessage && (
            <InputConfirmationMessage
            promptMessage={`הכנס שם של בית ספר חדש בעיר ${chosenCity.cityName}`}
            handleInput={handleAddSchool}
            setShowInput={setSchoolConfirmationAddMessage}
            />
          )}
          {areaConfirmationAddMessage && (
            <InputConfirmationMessage
            promptMessage={`הכנס שם של איזור חדש בעיר ${chosenCity.cityName}`}
            handleInput={handleAddArea}
            setShowInput={setAreaConfirmationAddMessage}
            />
          )}


          {/* Edit */}
          {cityConfirmationEditMessage && (
            <InputConfirmationMessage
            promptMessage={`שם העיר הנוכחי "${cityToModify.cityName}" הכנס את השם החדש`}
            handleInput={handleEditCity}
            setShowInput={setCityConfirmationEditMessage}
            />
          )}
          {schoolConfirmationEditMessage && (
            <InputConfirmationMessage
            promptMessage={`שם הבית ספר הנוכחי "${schoolToModify.schoolName}" הכנס את השם החדש`}
            handleInput={handleEditSchool}
            setShowInput={setSchoolConfirmationEditMessage}
            />
          )}
          {areaConfirmationEditMessage && (
            <InputConfirmationMessage
            promptMessage={`שם האיזור הנוכחי "${areaToModify.areaName}" הכנס את השם החדש`}
            handleInput={handleEditArea}
            setShowInput={setAreaConfirmationEditMessage}
            />
          )}

          {/* Delete */}
          {cityConfirmationDeleteMessage && (
            <ConfirmationMessage
            confirmationMessage={`האם למחוק את העיר "${cityToModify.cityName}"? אזהרה, מחיקת העיר תגרום למחיקת כל השלוחות שלה`}
            handleConfirmation={handleDeleteCity}
            setShowConfirmation={setCityConfirmationDeleteMessage}
            />
          )}
          {areaConfirmationDeleteMessage && (
            <ConfirmationMessage
            confirmationMessage={`האם למחוק את האיזור "${areaToModify.areaName}"? אזהרה, מחיקת האיזור תגרום למחיקת כל השלוחות שלה`}
            handleConfirmation={handleDeleteArea}
            setShowConfirmation={setAreaConfirmationDeleteMessage}
            />
          )}
          {schoolConfirmationDeleteMessage && (
            <ConfirmationMessage
            confirmationMessage={`האם למחוק את הבית ספר "${schoolToModify.schoolName}"? אזהרה, מחיקת הבית ספר תגרום למחיקת כל השלוחות שלה`}
            handleConfirmation={handleDeleteSchool}
            setShowConfirmation={setSchoolConfirmationDeleteMessage}
            />
          )}



        </div>
      <Footer />
    </>
  );
};

export default LocationIndex;
