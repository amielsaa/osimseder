import { useEffect } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { useParams } from "react-router-dom";
import './css/HousePage.css'
const HousePage = () => {
    const {id} = useParams()

    /* const house = {id } */


    useEffect(() => {
        // Amiel - you have the Id of the house, I need you to get all the information about this house in here
        // and store it into a consts. use this useEffect to do it.
        // including the tasks of this house and including the id of the team that is in this house !!
    })
  return (
    <>
    <Header/>

    <Nav/>
    <div className='content-Box'>
      <div className="info_picture">
        <div className="House_full_Info"></div>
        <div className="House_picture"></div>
        
      </div>
      
    </div>
    </>
  )
}

export default HousePage;