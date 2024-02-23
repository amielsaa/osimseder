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
        <h1 className='title'>הבתים שלי</h1>
        <HouseList/>
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default HousesTeamOwner;