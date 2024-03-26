import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './css/Login.css';
import axios from "axios";
import DataContext from '../Helpers/DataContext';
import Logo from '../images/g_udi_logo.png';  // Fix the import here


const Login = () => {
  const navigate = useNavigate();
  const [displayCode, setDisplayCode] = useState(false);
  const { URL } = useContext(DataContext);
  const [error,setError] = useState('')
  const {setUser} = useContext(DataContext);

  const initialValues = {
    email: '',
    password: '',
    code: '',
  };

  const handleRegisterStaff = () => {

  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('אימייל לא תקין').required('אימייל נדרש'),
    password: Yup.string().required('סיסמה נדרשת'),
    // code: Yup.string().when('email', {
    //   is: (val) => val && val.length > 0,
    //   then: Yup.string().required('קוד סודי נדרש'),
    //   otherwise: Yup.string(),
    // }),
  });

  const handleSubmit = (values) => {
    const { email, password, code } = values;
    
    const data = {
      email: email,
      password,
      code,
    };

    axios.post("https://garineiudi.org.il/api/auth/login", data).then((res) => {
            if(res.data.error) alert(res.data.error);
            else {
                //localStorage.clear();
                localStorage.setItem("accessToken",res.data.token);
                //res.data = { token: accessToken,role:'Student', user:student, id: student.id }
                setUser(res.data.user.dataValues);
                navigate("/Home");
            }
        })
  };

  const handleDisplayCode = () => {
    setDisplayCode(!displayCode);
  };

  return (
    <>
    
    
    <div className='background_login_page'>
    <div className='logo_big'>
    <img src={Logo} alt='לוגו חברה'/>
      </div>
    <div className="login-container">
      <div className='header-container'>
      <h2>עושים סדר</h2>
      </div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form>
          <div className="input-box">
            <label style={{ display: !displayCode ? 'block' : 'none' }} >אימייל:</label>
            <Field type="email" name="email"  style={{ display: !displayCode ? 'block' : 'none' }} />
            <ErrorMessage name="email" component="div" className="error-message" />
          </div>

          <div className="input-box">
            <label style={{ display: !displayCode ? 'block' : 'none' }}>סיסמה:</label>
            <Field type="password" name="password"  style={{ display: !displayCode ? 'block' : 'none' }} />
            <ErrorMessage name="password" component="div" className="error-message" />
          </div>

          <div className="input-box" style={{ display: displayCode ? 'block' : 'none' }}>
            <label>קוד סודי:</label>
            <Field type="password" name="code" placeholder="קוד סודי" />
            <ErrorMessage name="code" component="div" className="error-message" />
          </div>

          <div className='login_Buttons'>
          <button type="submit" className='button-login' style={{ display: displayCode ? 'block' : 'none' }} onClick={handleRegisterStaff}>הרשם כסגל</button>
          <button type="submit" className='button-login' style={{ display: !displayCode ? 'block' : 'none' }}>התחבר</button>
          </div>
          

          <div className="signup-link">
            <p>
              <a href="#" onClick={handleDisplayCode}>הרשמה לסגל</a> | <a href="/register">הרשמה לסטודנט</a>
            </p>
          </div>
        </Form>
      </Formik>
    </div>
    </div>
    </>
  );
};

export default Login;

