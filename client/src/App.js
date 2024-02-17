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
import { DataProvider } from './Helpers/DataContext';
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

      <DataProvider>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/Register" element={<Register />} />
        
          <Route path="/Home" element={<Home />} />

          <Route path="/Groups" element={<Groups/>} />

          <Route path="/My-Group" element={<GroupPage/>} />
            
          <Route path="/Personal" element={<PersonalPage/>}/>
        
        </Routes>
      </DataProvider>
      
      {/* </AuthContext.Provider> */}
      
    </div>
  );
}

export default App;
