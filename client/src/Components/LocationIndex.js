import React, { useContext, useEffect, useState } from 'react';
import './css/LocationIndex.css';
import Header from './Header';
import Footer from './Footer';
import Nav from './Nav';
import DataContext from '../Helpers/DataContext';
import ConfirmationMessage from './ConfirmationMessage';
import { FaPencilAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";


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
    { schoolId: 9, schoolName: "תיכון עירוני א' אשדוד" },
    { schoolId: 10, schoolName: "תיכון רמלה לוד" }
];

  

  

const LocationIndex = () => {
  const [cities,setCities] = useState(cityList)
  const [areas,setAreas] = useState(areaList)
  const [schools,setSchools] = useState(schoolList)
  const { navigate, user } = useContext(DataContext);

  

  return (
    <>
      <Header />
      <Nav />
        <div className='content-box-location-index'>


            <div className='cities-list-container'>
            <div className='cities-title'>
            <button>הוסף</button>
            <h1>ערים במערכת</h1> 
            </div>
            <div className='cities-list'>
                {cities.map(city => 
                    <div className='city-preview'>
                    <div className='city-name-container'>{city.cityName}</div>
                    <div className='city-delete-button-container'><FaPencilAlt /></div>
                    <div className='city-name-change-button-container'><FaTrashAlt/></div>
                </div>
                )} 
            </div>





            </div>


            <div className='school-area-list-container'>
            <div className='cities-title'>
            <h1>בתי ספר / איזורים</h1>
            </div>

            </div>
        </div>
      <Footer />
    </>
  );
};

export default LocationIndex;
