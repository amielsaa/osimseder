import './Components/css/App.css';

import Login from "./Components/Login.js";
import {  useState } from "react";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Groups from './Components/StudentView/Groups.js';
import Register from './Components/Register.js';
/* import {AuthContext} from './Helpers/AuthContext'; */
import GroupPage from './Components/StudentView/GroupPage.js';
import PersonalPage from './Components/PersonalPage.js';
function App() {
 
  //{headers: {accessToken: localStorage.getItem('accessToken')}}
  // Sample state for role and userName
  
  
  /* const [authState, setAuthState] = useState({username:"", id: 0, status: false}); */
  const [user,setUser] = useState({userName: "ארי מאיר",role:'Student' , phoneNumber:"0508639353", parentName: "אורלי אושרי",
   parentNumber: "0503428526", School: "מקיף ו", sex:"זכר", languages:["אנגלית", "עברית"], personalRequests:"כבד לי בלילות"
  , groupId:"001" })


  return (
    <div className="App">
     {/*  <AuthContext.Provider value ={{authState, setAuthState}}> */}


      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/Register" element={<Register />} />
        
        <Route path="/Home" element={<Home role={user.role} userName={user.userName} />} />

        <Route path="/Groups" element={<Groups role={user.role} userName={user.userName} />} />

        <Route path="/My-Group/" element={<GroupPage role={user.role} userName={user.userName} />} />

        <Route path="/Personal" element={<PersonalPage role={user.role} userName={user.userName} user={user}/>}/>
        
      </Routes>
      
      {/* </AuthContext.Provider> */}
      
    </div>
  );
}

export default App;
