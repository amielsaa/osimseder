import React from 'react';
import './Components/css/App.css';
import useWindowEvents from './Helpers/useWindowEvents.js'; // Update the path to your useWindowEvents file
import Login from "./Components/Login.js";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Groups from './Components/StudentView/Groups.js';
import Register from './Components/Register.js';
import GroupPage from './Components/StudentView/GroupPage.js';
import PersonalPage from './Components/PersonalPage.js';
import { DataProvider } from './Helpers/DataContext';
import MyGroupsTeamOwner from './Components/TeamOwnerView/MyGroupsTeamOwner.js';
import Houses from './Components/TeamOwnerView/Houses.js';
import Equipment from './Components/Equipment.js';
import ErrorPage from './Components/ErrorPage.js'
import HousePage from './Components/HousePage.js';
import TaskPage from './Components/TaskPage.js';
import AddGroupPage from './Components/AddGroupPage.js';
import AddHousePage from './Components/AddHousePage.js';
import AddTaskPage from './Components/AddTaskPage.js';
import AddGroupToHousePage from './Components/AddGroupToHousePage.js';
import EditHousePage from './Components/EditHousePage.js'
import NoneGroupPage from './Components/StudentView/NoneGroupPage.js';


function App() {
  const { width } = useWindowEvents();

  const isMobile = width <= 767; // Adjust the width value according to your mobile breakpoint

  if (isMobile) {
    return (
      <div className="App">
        <DataProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Groups" element={<Groups />} />
            <Route path="/GroupPage/:id" element={<GroupPage />} />

            <Route path="/Personal/:encryptedEmail" element={<PersonalPage />} />
            <Route path="/My-Groups" element={<MyGroupsTeamOwner />} />
            <Route path="/addGroup" element={<AddGroupPage/>}/>
            <Route path="/addHouse" element={<AddHousePage/>}/>
            <Route path="/addTask/:id" element={<AddTaskPage/>}/>
            <Route path="/addGroupToHouse/:id" element={<AddGroupToHousePage/>}/>
            <Route path="/My-Houses" element={<Houses />} />
            <Route path="/HousePage/:id" element={<HousePage />} />
            <Route path="/EditHouse/:id" element={<EditHousePage />} />
           {/*<Route path="/Equipment" element={<Equipment />} />*/} 
            <Route path="/TaskPage/:id" element={<TaskPage />} />
            <Route path="/404" element={<ErrorPage />} />
          </Routes>
        </DataProvider>
      </div>
    );
  } else {
    return (
      <div className="App">
        <ErrorPage />
      </div>
    );
  }
}

export default App;
