import '../css/HousesTeamOwner.css'
import Header from '../Header'
import Nav from '../Nav'
import HouseList from './HouseList'
import Footer from '../Footer'
import { useContext } from 'react'
import DataContext from '../../Helpers/DataContext'
const HousesTeamOwner = () => {
  const { navigate } = useContext(DataContext)
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box'>
      <div className='main_content_houses'>
        <div className='Houses_title'>
        <h1>הבתים שלי</h1>
        </div>
        <HouseList/>
        </div>
        <button className='add_house_btn' onClick={() => navigate('/')}>הוסף בית</button>
    </div>
    <Footer/>
    </>
  )
}

export default HousesTeamOwner;