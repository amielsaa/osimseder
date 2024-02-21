import './Components/css/App.css';
import Login from "./Components/Login.js";
import { Route, Routes } from 'react-router-dom';
import Home from './Components/Home.js';
import Groups from './Components/StudentView/Groups.js';
import Register from './Components/Register.js';
import GroupPage from './Components/StudentView/GroupPage.js';
import PersonalPage from './Components/PersonalPage.js';
import { DataProvider } from './Helpers/DataContext';
import MyGroupsTeamOwner from './Components/TeamOwnerView/MyGroupsTeamOwner.js';
import HousesTeamOwner from './Components/TeamOwnerView/HousesTeamOwner.js';
import Equipment from './Components/Equipment.js';
import Error from './Components/Error.js'
import HousePage from './Components/HousePage.js';
import TaskPage from './Components/TaskPage.js';
function App() {

 
  //{headers: {accessToken: localStorage.getItem('accessToken')}}
  // Sample state for role and userName
  
  return (
    <div className="App">

      <DataProvider>
        <Routes>

          <Route path="/" element={<Login />} />

          <Route path="/Register" element={<Register />} />
        
          <Route path="/Home" element={<Home />} />

          <Route path="/Groups" element={<Groups/>} />

          <Route path="/GroupPage/:id" element={<GroupPage/>} />

          <Route path="/Personal" element={<PersonalPage/>}/>

          <Route path="/My-Groups" element={<MyGroupsTeamOwner/>}/>

          <Route path="/My-Houses" element={<HousesTeamOwner/>}/>

          <Route path="/HousePage/:id" element={<HousePage/>}/>

          <Route path="/Equipment" element={<Equipment/>}/>

          <Route path="/TaskPage/:id" element={<TaskPage/>}/>

          <Route path="/404" element={<Error/>}/>
        
        </Routes>
      </DataProvider>
      
      
    </div>
  );
}

export default App;
