import '../css/HousesTeamOwner.css'
import Header from '../Header'
import Nav from '../Nav'
import HouseList from './HouseList'
import Footer from '../Footer'
const HousesTeamOwner = () => {
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
    </div>
    <Footer/>
    </>
  )
}

export default HousesTeamOwner;