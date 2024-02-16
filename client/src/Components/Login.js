import { useNavigate } from 'react-router-dom';
import './css/Login.css';
import React, { useState , useContext} from 'react';
import axios from "axios";
import DataContext from '../Helpers/DataContext';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [displayCode, setDisplayCode] = useState(false);
  const [error, setError] = useState('');
  const {URL} = useContext(DataContext)

  const handleEmailChange = (e) => {
    const lowercaseEmail = e.target.value.toLowerCase();
    setEmail(lowercaseEmail);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleDisplayCode = () => {
    setDisplayCode(!displayCode);
  };

  const handleSignIn = () => {
    const data = {username: email, password: password};
        axios.post(`${URL}/login`, data).then((res) => {
            if(res.data.error) alert(res.data.error);
            else {
                localStorage.setItem("accessToken",res.data.token);
                //Set inside the Datacontext
                navigate("/Home");
            }
        })
    
  };
  const handleSignInAsStaff = () => {
    
  };

  return (
    <div className="login-container">
      <h2>עושים סדר</h2>
      <div className="input-box">
        <label>:אימייל</label>
        <input type="email" value={email} placeholder='אימייל' onChange={handleEmailChange} />
      </div>
      <div className="input-box">
        <label>:סיסמה</label>
        <input type="password" value={password} placeholder='סיסמה' onChange={handlePasswordChange} />
      </div>
      <div className="input-box" style={{ display: displayCode ? 'block' : 'none' }}>
        <label>:קוד סודי</label>
        <input type="password" value={code} placeholder='קוד סודי' onChange={handleCodeChange} />
        <div style={{"color": "red"}}>{error?error:""}</div>
      </div>
      <button onClick={handleSignInAsStaff} style={{ display: displayCode ? 'block' : 'none' }}>הרשם כסגל</button>
      <button onClick={handleSignIn}>התחבר</button>
      <div className="signup-link">
        <p>
          <a href="#" onClick={handleDisplayCode}>הרשמה לסגל</a> | <a href="/register" >הרשמה לסטודנט</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
