
import './css/Login.css';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [displayCode, setDisplayCode] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
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
    // Implement your sign-in logic here
    console.log('Signing in with:', email, password, code);
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
      </div>
      <button onClick={handleSignIn} style={{ display: displayCode ? 'block' : 'none' }}>הרשם כסגל</button>
      <button onClick={handleSignIn}>התחבר</button>
      <div className="signup-link">
        <p>
          <a href="#" onClick={handleDisplayCode}>הרשמה לסגל</a> | <a href="#">הרשמה לסטודנט</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
