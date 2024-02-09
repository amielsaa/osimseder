import './Components/css/App.css';
import axios from "axios";
import Login from "./Components/Login.js";
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Groups from './Components/Groups.js';
import Register from './Components/Register.js';
import {AuthContext} from './Helpers/AuthContext';

function App() {
  /* const [checkList, setCheckList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      setCheckList(res.data.listOfGender)
      //console.log(res.data)
    })
  },[]) */

  // Sample state for role and userName
  const [role, setRole] = useState('Student');
  const [userName, setUserName] = useState('user ' + role);
  const [authState, setAuthState] = useState({username:"", id: 0, status: false});


  return (
    <div className="App">
      <AuthContext.Provider value ={{authState, setAuthState}}>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/Register" element={<Register />} />
        
        <Route path="/Home" element={<Home role={role} userName={userName} />} />

        <Route path="/Groups" element={<Groups role={role} userName={userName} />} />
        
      </Routes>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
