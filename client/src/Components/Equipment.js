import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import Nav from "./Nav";
import { IoChevronForwardCircle } from "react-icons/io5";
import DataContext from "../Helpers/DataContext";
import './css/Equipment.css'
import EquipmentInfo from "./EquipmentInfo";
const Equipment = () => {
  const {user, navigate} = useContext(DataContext)

  const [houseToEquipment,setHouseToEquipment] = useState([
    {houseId: '001' , houseAddress: 'ראשון לציון נתיבי עם 54', equipment : ['מטאטא','מברשת צביעה','צבע','מגב']},
    {houseId: '002' , houseAddress: 'באר שבע אלתרמן 3', equipment : ['מטאטא','מגב']},
    {houseId: '003' , houseAddress: 'באר שבע הצבי 56', equipment : ['מטאטא','מגב','סמרטוטים']},
    {houseId: '004' , houseAddress: 'תל אביב סנהדרין 44', equipment : ['מטאטא','מגב']},
    {houseId: '005' , houseAddress: 'באר שבע בורלא 13', equipment : ['מטאטא','מגב']}
  ])

  // Amiel - I need you to get me the data as you see here for each house 
  useEffect(() => {})
  return (
    <>
    <Header/>
    <Nav/>
    <div className='content-Box-Equipment'>
    <span className='purple_circle'>
      <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
      </span>
      <div className='Equipment-title'>
        <h1>ציוד נדרש</h1>
        </div>
        <div className="Equipment-block">
        {houseToEquipment.map((data) => 
          <EquipmentInfo key={data.houseId} data={data} />
        )}
          

        </div>
    </div>
    </>
  )
}

export default Equipment;