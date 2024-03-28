import React, { useContext,useEffect,useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/AddGroupToHouse.css"
import DataContext from '../Helpers/DataContext';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { IoChevronForwardCircle } from "react-icons/io5";
import GroupListForHouse from './GroupListForHouse';
import {fetchAllSchoolsByCity} from '../Helpers/StaffFrontLogic';

function AddGroupToHousePage() {
    const { id } = useParams();
    const { navigate , user } = useContext(DataContext)
    const [schoolOptions, setSchoolOptions] = useState([]);
    const [selectedSchool, setSelectedSchool] = useState();
    useEffect(() => {
      if(!(localStorage.getItem("accessToken"))){
        navigate('/404')
      }
    })

    //Amiel - for the filter, I need you to bring me the list of all the schools and put it in schoolOptions useState.
    //TO DELETE!!!!
    const cities = {
      '1': 'BSV',
      '2': 'JRS'
    }
    const setSchoolsRequest = async () => {
      if(user.cityId) {
        const res = await fetchAllSchoolsByCity(cities[user.cityId]);
        setSchoolOptions(res);
      }
    }
 

    useEffect(() => {
      setSchoolsRequest();
    }, [user])
   
    return (
        <>
          <Header />
          <Nav />
          <div className='content-Box-Add-Group-To-House'>
            <span className='purple_circle'>
              <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
            </span>
            <div className="main-content-Add-Group-To-House">
            <div className='add-Add-Group-To-House-title'>
                <h1>הוספת קבוצה לבית</h1>
              </div>
            <div className='add-Add-Group-To-House-semi-title'>
                <h3>הקבוצות המוצגות הינן קבוצות ללא שיוך</h3>
              </div>
              <div className='school_Filter_and_label'>
              <label htmlFor='schoolFilter'>בחר/י בית ספר:</label>
          {schoolOptions && <select
            className='School_filter'
            id='schoolFilter'
            name='schoolFilter'
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          >
            <option value=''>הכל</option>
            {schoolOptions.map((school) => (
              <option key={school.id} value={school.id}>
                {school.schoolName}
              </option>
            ))}
          </select>}
          </div>

          {selectedSchool && <div className='groups_container'>
              <GroupListForHouse houseId={id} selectedSchool={selectedSchool}/>
              </div>  }

          </div>
          </div>
          <Footer />
        </>
      )
    }

export default AddGroupToHousePage;
