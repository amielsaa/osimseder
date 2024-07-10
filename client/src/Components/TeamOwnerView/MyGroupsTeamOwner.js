import '../css/Groups.css'
import Nav from '../Nav';
import Header from '../Header';
import GroupListTO from './GroupListTO'
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../Helpers/DataContext';
import Footer from '../Footer';


const schoolsForDemo = [{schoolId:1, schoolName:"נתיבי עם"}, {schoolId:2, schoolName:"מקיף א"}]
const CitiesForDemo = [{cityId:1, cityName:"באר שבע"}, {cityId:2, cityName:"תל אביב"}]
const MyGroupsTeamOwner = () => {
  const {user, navigate} = useContext(DataContext);
  const [loading, isLoading] = useState(true)
  const [cityOptions, setCityOptions] = useState([])
  const [selectedCity, setSelectedCity] = useState('')
  const [schoolOptions, setSchoolOptions] = useState([])
  const [selectedSchool, setSelectedSchool] = useState('')

  useEffect(() => {
    if (user.role === "Admin"){
      setCityOptions(CitiesForDemo)
      //Amiel - set all the cities in the cityOptions
    } else if(user.role === "CityManager" || user.role === "AreaManager") {
      setSchoolOptions(schoolsForDemo)
      //Amiel - ignore the cities and set all the schools from the user.CityId groups
    }
  })

  function onChangeSelectedCity(city) {
    //Amiel - This is relevent to Admin, sets the city in Selected City, and brings all the relevent schools of the city, sets the SelectedSchool back to ''
    setSchoolOptions(schoolsForDemo)
  }

  return (
    <>
    <Header/>
      <Nav/>
    <div className='content-Box'>
    <div className='groups_title'>
        {user.role === "TeamOwner" && (
             <h1>הקבוצות שלי</h1>
          )}
          {(user.role === "AreaManager" || user.role === "CityManager"  ) && (
             <h1>קבוצות באיזורי</h1>
          )}
          {(user.role === "Admin") && (
             <h1>כל הקבוצות</h1>
          )}
      </div>

      


      {loading && (
          <div className='filtersContainer_groups'>
            {user.role === "Admin" && (
              <div className='city_Filter_and_label_groups'>
                <label htmlFor='city_Filter'>בחר/י עיר:</label>
                {cityOptions && (
                  <select
                    className='city_Filter'
                    id='city_Filter'
                    name='city_Filter'
                    value={selectedCity}
                    onChange={(e) => onChangeSelectedCity(e.target.value)}
                  >
                    <option value=''>כל הערים</option>
                    {cityOptions.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
            {(user.role === "Admin" || user.role === "CityManager" || user.role === "AreaManager") && (
              <div className='school_Filter_and_label'>
                <label htmlFor='school_Filter'>בחר/י בית ספר:</label>
                {schoolOptions && (
                  <select
                    className='school_Filter'
                    id='school_Filter'
                    name='school_Filter'
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                  >
                    <option value=''>כל הבתי ספר</option>
                    {schoolOptions.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.schoolName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        )}












      <div className='To_main_content_groups'>
        
      <GroupListTO selectedCity={selectedCity} selectedSchool={selectedSchool}/>
      
    </div>
    {(user.role !== "TeamOwner") && (
          <button className='add_group_btn' onClick={() => navigate('/addGroup')}>הוסף קבוצה</button>
    )}
    </div> 
    <Footer/>
    </>
  )
}

export default MyGroupsTeamOwner;