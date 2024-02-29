import '../css/Houses.css'
import Header from '../Header'
import Nav from '../Nav'
import HouseList from './HouseList'
import Footer from '../Footer'
import { useContext } from 'react'
import DataContext from '../../Helpers/DataContext'
const Houses = () => {
  const { user,navigate } = useContext(DataContext)
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box'>
      <div className='main_content_houses'>
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
        <HouseList/>
        </div>
        <button className='add_house_btn' onClick={() => navigate('/addHouse')}>הוסף בית</button>
    </div>
    <Footer/>
    </>
  )
}

export default Houses;