import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Helpers/DataContext";
import House from "./House";
import {fetchAllHouses} from '../../Helpers/StaffFrontLogic'
import Houses from "./Houses";
const HouseList = ({selectedCity ,selectedNeiborhood}) => {
  const { user } = useContext(DataContext);


  const [houses, setHouses] = useState([]);
  const [filteredhouses,setFilteredHouses] = useState(houses)

  const setHousesList = async () => {
    const housesList = await fetchAllHouses();
    setHouses(housesList);
  }
  const filterHouses = () => {
    let filteredHousesList = houses;

    if (selectedCity) {
      console.log("city")
      filteredHousesList = filteredHousesList.filter(house => parseInt(house.cityId) == parseInt(selectedCity));
    }

    if (selectedNeiborhood) {
      console.log("neighborhood")
      filteredHousesList = filteredHousesList.filter(house => parseInt(house.areaId) == parseInt(selectedNeiborhood));
    }

    setFilteredHouses(filteredHousesList);
  };


  useEffect(() => {
    setHousesList();
    filterHouses()
  }, [user,selectedNeiborhood, selectedCity]);
  
  const deleteHouseFromList = (id) => {
    setHouses(prevHouses => prevHouses.filter(house => house.id !== id));
  }
  

  return (
    <>
      {(houses && !selectedNeiborhood && !selectedCity) &&
      <> {houses.map((house) => (
        <House
          key={house.id}
          id={house.id}
          landlordName={house.residentFirstName + " " + house.residentLastName }
          address={house.address}
          numberOfCompletedTasks={house.numberOfCompletedTasks}
          numberOfTasks={house.numberOfTasks}
          deleteHouseFromList={deleteHouseFromList}
        />
      ))} </>
      }
      {(filteredhouses && (selectedNeiborhood || selectedCity)) &&
      <> {filteredhouses.map((house) => (
        <House
          key={house.id}
          id={house.id}
          landlordName={house.residentFirstName + " " + house.residentLastName }
          address={house.address}
          numberOfCompletedTasks={house.numberOfCompletedTasks}
          numberOfTasks={house.numberOfTasks}
          deleteHouseFromList={deleteHouseFromList}
        />
      ))} </>
      }
    </>
  );
}

export default HouseList;