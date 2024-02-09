import './Components/css/App.css';
import axios from "axios";
import Login from "./Components/Login.js";
import { useEffect, useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Groups from './Components/Groups.js';

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

  return (
    <div className="App">
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/Home" element={<Home role={role} userName={userName} />} />

        <Route path="/Groups" element={<Groups role={role} userName={userName} />} />
        
      </Routes>
    </div>
  );
}

export default App;
