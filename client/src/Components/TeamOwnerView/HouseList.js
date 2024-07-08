import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Helpers/DataContext";
import House from "./House";
import {fetchAllHouses} from '../../Helpers/StaffFrontLogic'
import Houses from "./Houses";
const HouseList = (selectedCity ,selectedNeiborhood) => {
  const { user } = useContext(DataContext);


  const [houses, setHouses] = useState([]);
  const [filteredhouses,setFilteredHouses] = useState(houses)
  useState(() => {
    
  },[selectedNeiborhood.selectedNeiborhood])
  const setHousesList = async () => {
    const housesList = await fetchAllHouses();
    setHouses(housesList);
  }
  const filterHouses = () => {
    let filteredHousesList = houses;

    if (selectedCity) {
      filteredHousesList = filteredHousesList.filter(house => house.cityId === selectedCity);
    }

    if (selectedNeiborhood) {
      filteredHousesList = filteredHousesList.filter(house => house.areaId === selectedNeiborhood);
    }

    setFilteredHouses(filteredHousesList);
  };


  useEffect(() => {
    setHousesList();
    filterHouses()
    console.log(houses)
  }, [user,selectedNeiborhood]);
  
  const deleteHouseFromList = (id) => {
    setHouses(prevHouses => prevHouses.filter(house => house.id !== id));
  }
  

  return (
    <>
      {(houses && !selectedNeiborhood.selectedNeiborhood) &&
      <> {houses.map((house) => (
        <House
          key={house.id}
          id={house.id}
          landlordName={house.residentFirstName + " " + house.residentLastName }
          address={house.address}

          deleteHouseFromList={deleteHouseFromList}
        />
      ))} </>
      }
      {(filteredhouses && selectedNeiborhood.selectedNeiborhood) &&
      <> {filteredhouses.map((house) => (
        <House
          key={house.id}
          id={house.id}
          landlordName={house.residentFirstName + " " + house.residentLastName }
          address={house.address}
          deleteHouseFromList={deleteHouseFromList}
        />
      ))} </>
      }
    </>
  );
}

export default HouseList;