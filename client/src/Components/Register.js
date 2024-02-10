import React from 'react'
import {useNavigate} from 'react-router-dom';

import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from "axios";
function Registration() {
    const initialValues = {
        username: "",
        password:"",
    };
    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        username: Yup.string(),
        password: Yup.string().min(4).max(20).required()
    });
    const onSubmit = (data) => {
        debugger
        axios.post("http://localhost:3001", data).then(()=> {
            navigate('/')
        })
    };
  return (
    <div className="formContainer">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form>
          <label>Username: </label>
          <Field autocomplete ="off" id="inputCreatePost" name="username" placeholder="(Ex.. John12)" /> 
          <ErrorMessage name="username" component="span"/>
          <br/><label>Password: </label>
          <Field type="password" autocomplete ="off" id="inputCreatePost" name="password" placeholder="(Your password)" /> 
          <ErrorMessage name="password" component="span"/>
          <button type="submit"> Register </button>
        </Form>

      </Formik>
    </div>
  )
}

export default Registration