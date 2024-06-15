import './css/DataExport.css'
import Nav from './Nav';
import Header from './Header';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../Helpers/DataContext';
import { IoDownloadOutline } from "react-icons/io5";
import Footer from './Footer';



const DataExport = () => {
  const {user, navigate} = useContext(DataContext);
  const [groups, setgroups] = useState(false)
  const [students, setstudents] = useState(false)
  const [schools, setSchools] = useState(false)
  const [cities, setCities] = useState(false)
  const [houses, setHouses] = useState(false)
  const [staff, setStaff] = useState(false)
  const [areas, setAreas] = useState(false)
  const [tasks, setTasks] = useState(false)


  function exportData() {
    const selectedItems = [];

    if (groups) selectedItems.push('groups');
    if (students) selectedItems.push('students');
    if (schools) selectedItems.push('schools');
    if (cities) selectedItems.push('cities');
    if (houses) selectedItems.push('houses');
    if (staff) selectedItems.push('staff');
    if (areas) selectedItems.push('areas');
    if (tasks) selectedItems.push('tasks');

    console.log(selectedItems);
  }
 
  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-box-export-data'>
        <div className='export-data-title'>
            <h1>ייצא מידע</h1>
            <h2>.אנא סמן את המידע, לאחר מכן לחץ הורדה</h2>
        </div>
        <div  className='export-list-container'>

                    <div className={`list-item-container ${groups? 'marked' : ''}`} onClick={() => setgroups(prev => !prev)}>
                        <div className='item-name'><h2>{'קבוצות'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${houses? 'marked' : ''}`} onClick={() => setHouses(prev => !prev)}>
                        <div className='item-name'><h2>{'בתים'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${students? 'marked' : ''}`} onClick={() => setstudents(prev => !prev)}>
                        <div className='item-name'><h2>{'חניכים'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${staff? 'marked' : ''}`} onClick={() => setStaff(prev => !prev)}>
                        <div className='item-name'><h2>{'סגל'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${schools? 'marked' : ''}`} onClick={() => setSchools(prev => !prev)}>
                        <div className='item-name'><h2>{'בתי ספר'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${areas? 'marked' : ''}`} onClick={() => setAreas(prev => !prev)}>
                        <div className='item-name'><h2>{'איזורים'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${cities? 'marked' : ''}`} onClick={() => setCities(prev => !prev)}>
                        <div className='item-name'><h2>{'ערים'}</h2></div>
                              
                    </div>
                    <div className={`list-item-container ${tasks? 'marked' : ''}`} onClick={() => setTasks(prev => !prev)}>
                        <div className='item-name'><h2>{'מטלות'}</h2></div>
                              
                    </div>
                
           
            



        </div>
        <div className='button-container'>
            <button className='export-button' onClick={exportData}><IoDownloadOutline />הורדה </button>

        </div>
    

    </div>
    <Footer/>
    </>
  )
}

export default DataExport;