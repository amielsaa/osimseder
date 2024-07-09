import '../css/Houses.css';
import Header from '../Header';
import Nav from '../Nav';
import HouseList from './HouseList';
import Footer from '../Footer';
import { useContext, useEffect, useState } from 'react';
import DataContext from '../../Helpers/DataContext';
import { fetchAllAreasByCity } from '../../Helpers/StaffFrontLogic';
import {fetchAllCities} from '../../Helpers/AdminFrontLogic';

const Houses = () => {
  const { user, navigate } = useContext(DataContext);
  const [neighborhoodOptions, setNeighborhoodOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedNeiborhood, setSelectedNeiborhood] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate('/404');
    }
  }, [navigate]);

  

  useEffect(() => {
    setLoading(true);
    if (user.role === "Admin") {
      setCities();
    }
    setAreas();
    setLoading(false);
  }, [user]);

  const setCities = async () => {
    // Fetch cities from the database
    const res = await fetchAllCities();
    setCityOptions(res);
  };

  const onChangeSelectedCity = async (city) => {
    setSelectedCity(city);
    const cityById = await cityOptions.find(curCity => curCity.id == city)
    await setAreas(cityById.cityName)
    // Fetch areas related to the selected city
  };

  const setAreas = async (cityName=user.cityName) => {
    if (user.role === 'CityManager' || user.role === 'Admin') {
      const res = await fetchAllAreasByCity(selectedCity);
      setNeighborhoodOptions(res[cityName]);
    }
  };

  return (
    <>
      <Header />
      <Nav />
      <div className='content-Box'>
        <div className='Houses_title'>
          {user.role === "TeamOwner" && <h1>הבתים שלי</h1>}
          {(user.role === "AreaManager" || user.role === "CityManager") && <h1>בתים באזורי</h1>}
          {user.role === "Admin" && <h1>כל הבתים</h1>}
        </div>
        {!loading && (
          <div className='filtersContainer'>
            {user.role === "Admin" && (
              <div className='city_Filter_and_label'>
                <label htmlFor='city_Filter'>בחר/י עיר:</label>
                {cityOptions && (
                  <select
                    className='city_Filter'
                    id='city_Filter'
                    name='city_Filter'
                    value={selectedCity}
                    onChange={(e) => onChangeSelectedCity(e.target.value)}
                  >
                    <option value=''>כל הערים</option>
                    {cityOptions.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.cityName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
            {(user.role === "Admin" || user.role === "CityManager") && (
              <div className='neighborhood_Filter_and_label'>
                <label htmlFor='neighborhood_Filter'>בחר/י שכונה:</label>
                {neighborhoodOptions && (
                  <select
                    className='neighborhood_Filter'
                    id='neighborhood_Filter'
                    name='neighborhood_Filter'
                    value={selectedNeiborhood}
                    onChange={(e) => setSelectedNeiborhood(e.target.value)}
                  >
                    <option value=''>כל השכונות</option>
                    {neighborhoodOptions.map((neighborhood) => (
                      <option key={neighborhood.id} value={neighborhood.id}>
                        {neighborhood.areaName}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            )}
          </div>
        )}
        <div className='main_content_houses'>
          <HouseList selectedCity={selectedCity} selectedNeiborhood={selectedNeiborhood} />
        </div>
        <button className='add_house_btn' onClick={() => navigate('/addHouse')}>הוסף בית</button>
      </div>
      <Footer />
    </>
  );
};

export default Houses;
