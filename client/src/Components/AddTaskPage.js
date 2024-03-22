import React, { useContext } from 'react';
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
import {addTask} from '../Helpers/StaffFrontLogic'

function AddTaskPage() {
    const { id } = useParams()
    const {navigate} = useContext(DataContext);
    const initialValues = {
        room: "",
        taskType: "",
        taskDescription: "",
     

    };


    const validationSchema = Yup.object().shape({
        room: Yup.string().required("חדר נדרש"),
        taskType: Yup.string().required("סוג מטלה נדרש"),
        taskDescription: Yup.string(),

    });

    //const addTaskAndNavigate = async ()

    const onSubmit = (data) => {
      data.type = data.taskType;
      data.freeText = data.taskDescription;
      data.status = 'RED';
      data.houseId = id;
      const res = addTask(data);
      if(res) {
        navigate(`/HousePage/${id}`)
      }
       console.log(data)
       // Amiel - I managed to get this page working without the yup problem.
       // when submitting here you need to add the new task to the house Id. you have the house id in the params
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
                <h1>הוספת מטלה</h1>
              </div>
    
              <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                <Form>
                    <div>
                        <label htmlFor="room">   חדר :</label>
                        <Field id="room" name="room" placeholder=" חדר" />
                        <ErrorMessage name="room" component="span" />
                    </div>

                    <div>
                        <label htmlFor="taskType">סוג מטלה: </label>
                        <Field as="select" id="taskType" name="taskType">
                            <option value="">בחר סוג מטלה</option>
                            <option value="cleaning">ניקיון</option>
                            <option value="painting">צביעה</option>
                            <option value="Other">אחר</option>
                        </Field>
                        <ErrorMessage name="taskType" component="span" />
                    </div>

                    <div>
                    <label htmlFor="taskDescription"> תיאור המטלה: </label>
                    <Field as="textarea" id="comments" name="taskDescription" placeholder="תיאור המטלה"  />
                    <ErrorMessage name="taskDescription" component="span" />
                </div>
                 
                <div className='Button-Div'>
                    <button type="submit" className='RegisterButton'>הוסף מטלה</button>
                </div>
                </Form>
              </Formik>
    
            </div>
          </div>
          <Footer />
        </>
      )
    }

export default AddTaskPage;
