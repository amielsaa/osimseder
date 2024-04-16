import '../css/Houses.css'
import Header from '../Header'
import Nav from '../Nav'
import HouseList from './HouseList'
import Footer from '../Footer'
import { useContext,useEffect, useState } from 'react'
import DataContext from '../../Helpers/DataContext'
import { fetchAllAreasByCity } from '../../Helpers/StaffFrontLogic'
const Houses = () => {
  const { user,navigate } = useContext(DataContext)
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([])
  const [selectedNeiborhood, setSelectedNeiborhood] = useState('')
  const [loading,setloading] = useState(false)
  useEffect(() => {
    if(!(localStorage.getItem("accessToken"))){
      navigate('/404')
    }
  })
  useEffect(() => {
    setAreas();
    setloading(true)
  },[user])
  
  const setAreas = async () => {
    if (user.role === 'CityManager'|| user.role === 'Admin' ) {
      const res = await fetchAllAreasByCity("city");
      setNeighborhoodOptions(res[user.cityName]);
      }
    }
 
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box'>
    <div className='Houses_title'>
          {user.role === "TeamOwner" && (
             <h1>הבתים שלי</h1>
          )}
          {(user.role === "AreaManager" || user.role === "CityManager"  ) && (
             <h1>בתים באזורי</h1>
          )}
          {(user.role === "Admin") && (
             <h1>כל הבתים</h1>
          )}
        </div>
        {loading ? (
          (user.role === "CityManager" || user.role === "Admin") && neighborhoodOptions ? (
            <div className='filtersContainer'>
              <div className='neighborhood_Filter_and_label'>
                <label htmlFor='neighborhoodFilter'>בחר/י שכונה:</label>
                {neighborhoodOptions && (
                  <select
                    className='neighborhood_Filter'
                    id='neighborhood_Filter'
                    name='neighborhood_Filter'
                    value={selectedNeiborhood}
                    onChange={(e) => setSelectedNeiborhood(e.target.value)}
                  >
                    <option value=''>כל השכונות</option>
                    {neighborhoodOptions.map((neighborhood) => (
                      <option key={neighborhood.id} value={neighborhood.id}>
                        {neighborhood.areaName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          ) : null
        ) : null}
      <div className='main_content_houses'>
        <HouseList selectedNeiborhood={selectedNeiborhood}/>
        </div>
        <button className='add_house_btn' onClick={() => navigate('/addHouse')}>הוסף בית</button>
    </div>
    <Footer/>
    </>
  )
}

export default Houses;