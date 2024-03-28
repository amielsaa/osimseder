import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "./css/AddTaskPage.css"
import DataContext from '../Helpers/DataContext';
import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import { IoChevronForwardCircle } from "react-icons/io5";
import {getHouseById, updateHouse, fetchAllAreasByCity} from '../Helpers/StaffFrontLogic'

function EditHousePage() {
    const { id } = useParams()
    const {navigate,user} = useContext(DataContext);
    const [areas, setAreas] = useState([]);
    useEffect(() => {
      if(!(localStorage.getItem("accessToken"))){
        navigate('/404')
      }
    })
    const initialValues = {
      areaName:"",
      address: "",
      residentFirstName: "",
      residentLastName: "",
      phoneNumber:"",
      alternativeNumber:"",
      residentGender:"",
      languageNeeded:"",
      numberOfRooms:"",
      membersNeeded:"",
      freeText:""
  };

    const getHouseInfo = async () => {
      const houseInfo = await getHouseById(id);
      initialValues.areaName = houseInfo.areaName;
      initialValues.address = houseInfo.address;
      initialValues.residentLastName = houseInfo.residentLastName;
      initialValues.residentFirstName = houseInfo.residentFirstName;
      initialValues.phoneNumber = houseInfo.residentPhoneNum;
      initialValues.alternativeNumber = houseInfo.residentAlternatePhoneNum;
      initialValues.residentGender = houseInfo.residentGender;
      initialValues.languageNeeded = houseInfo.languageNeeded;
      initialValues.numberOfRooms = houseInfo.numberOfRooms;
      initialValues.membersNeeded = houseInfo.membersNeeded;
      initialValues.freeText = houseInfo.freeText;
    }

    const getAreas = async () => {
      const res = await fetchAllAreasByCity();
      if(user.cityId == 1) {
        const ars = res.BSV;
        setAreas(ars);
      } else {
        const ars = res.JRS;
        setAreas(ars);
      }
    }

    useEffect(() => {
        //Amiel import the House data - city is unchangeable.
        //after you imported to house data put its data in the initialValues instead of ""
        //look inside the JSX (the HTML down in this page) code, there is more comments
        getAreas();

        getHouseInfo();
    },[])

   


    const validationSchema = Yup.object().shape({
        address: Yup.string(),
        residentFirstName: Yup.string().required('שם דייר נדרש'),
        residentLastName: Yup.string().required('שם משפחה נדרש'),
        phoneNumber: Yup.string().
            required("מספר נייד נדרש")
            .matches(/^05\d{8}$/, "מספר לא תקין"),
        alternativeNumber: Yup.string()
            .matches(/^05\d{8}$/, "מספר לא תקין"),
        residentGender: Yup.string(),
        languageNeeded: Yup.string(),
        numberOfRooms: Yup.string().required('מספר חדרים נדרש'),
        membersNeeded: Yup.string().required('גודל קבוצה נדרש'),
        freeText: Yup.string()
    });


    const onSubmit = (data) => {
        //take all the data and edit it in the db
      const res = updateHouse(data,id);
      if(res) {
        navigate(`/HousePage/${id}`)
      }
    };

    return (
        <>
          <Header />
          <Nav />
          <div className='content-Box-Add-Task'>
            <span className='purple_circle'>
              <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
            </span>
            <div className="main-content-Add-Task">
    
              <div className='add-task-title'>
                <h1>עריכת בית</h1>
              </div>
    
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    {user.role !== "TeamOwner" ? 
                    (<div>
                        <label htmlFor="areaName"> בחר שכונה : </label> {/*Amiel - Change that to the initial value*/}
                        <Field as="select" id="areaName" name="areaName">
                            <option value="">בחר שכונה</option>
                            {areas && (
                                <>
                                {areas.map((area) => (
                                    <option key={area.areaName} value={area.areaName}>
                                    {area.areaName}
                                    </option>
                                ))}
                                </>
                            )}
                        </Field>
                        <ErrorMessage name="areaName" component="span" />
                    </div>)
                    : ""}
                    <div>
                        <label htmlFor="address">   כתובת : </label>
                        <Field id="address" name="address" />
                        <ErrorMessage name="address" component="span" />
                    </div>
                    <div>
                        <label htmlFor="residentFirstName">   שם איש קשר :</label>
                        <Field id="residentFirstName" name="residentFirstName" />
                        <ErrorMessage name="residentFirstName" component="span" />
                    </div>
                    <div>
                        <label htmlFor="residentLastName">   שם משפחה איש קשר :</label>
                        <Field id="residentLastName" name="residentLastName"  />
                        <ErrorMessage name="residentLastName" component="span" />
                    </div>
                    <div>
                        <label htmlFor="phoneNumber">    מספר פלאפון  :</label>
                        <Field id="phoneNumber" name="phoneNumber"  />
                        <ErrorMessage name="phoneNumber" component="span" />
                    </div>
                    <div>
                        <label htmlFor="alternativeNumber">   מספר חלופי :</label>
                        <Field id="alternativeNumber" name="alternativeNumber" />
                        <ErrorMessage name="alternativeNumber" component="span" />
                    </div>

                    <div>
                        <label htmlFor="residentGender">מין הדייר/ת : </label>
                        <Field as="select" id="residentGender" name="residentGender">
                            <option value="">בחר את מין הדייר/ת</option>
                            <option value="Male">זכר</option>
                            <option value="Female">נקבה</option>
                            <option value="Other">אחר</option>
                        </Field>
                        <ErrorMessage name="residentGender" component="span" />
                    </div>

                    <div>
                  <label htmlFor="numberOfRooms"> מספר חדרים בבית: </label>
                  <Field as="select" id="numberOfRooms" name="numberOfRooms">
                    <option value="">בחר מספר חדרים בבית</option> {/*Amiel - Change that to the initial value*/}
                    {Array.from({ length: 7 }, (_, index) => index + 2).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="numberOfRooms" component="span" />
                </div>

                <div>
                  <label htmlFor="membersNeeded">  גודל קבוצה נחוץ: </label>
                  <Field as="select" id="membersNeeded" name="membersNeeded">
                    <option value="">בחר גודל קבוצה נחוץ</option> {/*Amiel - Change that to the initial value*/}
                    
                    {Array.from({ length: 7 }, (_, index) => index + 2).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="membersNeeded" component="span" />
                </div>


                    <div>
                    <label htmlFor="freeText">  הערות: </label>
                    <Field as="textarea" id="freeText" name="freeText"/>
                    <ErrorMessage name="freeText" component="span" />
                </div>
                 
                <div className='Button-Div'>
                    <button type="submit" className='RegisterButton'>ערוך פרטי בית</button>
                </div>
                </Form>
              </Formik>
    
            </div>
          </div>
          <Footer />
        </>
      )
    }

export default EditHousePage;
