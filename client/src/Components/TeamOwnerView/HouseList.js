import React, { useContext, useEffect, useState } from "react";
import DataContext from "../../Helpers/DataContext";
import House from "./House";
import {fetchAllHouses} from '../../Helpers/StaffFrontLogic'
import Houses from "./Houses";
const HouseList = (selectedNeiborhood) => {
  const { user } = useContext(DataContext);

  const initialHouses = [
    {
      id: "001",
      landlordName: "אהרון",
      address: "רחוב אבן גבירול 123",
    },
    {
      id: "002",
      landlordName: "רבקה",
      address: "רחוב הרצל 456",
    },
    {
      id: "003",
      landlordName: "דוד",
      address: "רחוב גולדה מאיר 789",
    },
    {
      id: "004",
      landlordName: "שרה",
      address: "רחוב בן צבי 101",
    },
    {
      id: "005",
      landlordName: "יצחק",
      address: "רחוב הנביאים 234",
    },
    {
      id: "006",
      landlordName: "מרים",
      address: "רחוב הציונות 567",
    },
    {
      id: "007",
      landlordName: "אברהם",
      address: "רחוב יפו 890",
    }
  ];

  const [houses, setHouses] = useState([]);
  const [filteredhouses,setFilteredHouses] = useState(houses)
  useState(() => {
    
  },[selectedNeiborhood.selectedNeiborhood])
  const setHousesList = async () => {
    const housesList = await fetchAllHouses();
    setHouses(housesList);
  }
  const filterHouses = async () => {
    if (selectedNeiborhood.selectedNeiborhood) {
      const filteredHousesList = houses.filter(house => house.areaId
        == selectedNeiborhood.selectedNeiborhood);
      setFilteredHouses(filteredHousesList);
    }
  };

  useEffect(() => {
    setHousesList();
    filterHouses()
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