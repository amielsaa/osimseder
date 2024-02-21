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
    <h1 className='title'>הבתים שלי</h1>
    <HouseList/>
      
    </div>
    <Footer/>
    </>
  )
}

export default HousesTeamOwner;