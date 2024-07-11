import { useContext, useEffect, useState } from "react";
import Header from "./Header";
import './css/AddGroupPage.css';
import Nav from "./Nav";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataContext from "../Helpers/DataContext";
import Footer from "./Footer";
import { IoChevronForwardCircle } from "react-icons/io5";
import {fetchAllSchoolsByCity, addGroup, fetchAllCities} from '../Helpers/StaffFrontLogic'

const AddGroupPage = () => {
  const { user, navigate } = useContext(DataContext);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');
  const [citiesList, setCitiesList] = useState([]);
  const [schoolsList, setSchoolsList] = useState([]);
  useEffect(() => {
    if(!(localStorage.getItem("accessToken"))){
      navigate('/404')
    }
    setAllCities()

  },[])
  const initialValues = {
    city: '',
    school: '',
    capacity: ''
  };
  

  const validationSchema = Yup.object().shape({
    city: Yup.string(),
    school: Yup.string().when(['city'], {
      is: (city) => city && city.length > 0,
      then: Yup.string(),
    }),
    capacity: Yup.number().when(['school'], {
      is: (school) => school && school.length > 0,
      then: Yup.number(),
    })
  });

  const setAllCities = async () => {
    const res = await fetchAllCities();
    setCitiesList(res);
  }

  const onSubmit = (data) => {
    // Handle form submission
    const res = addGroup(selectedCity,selectedSchool,selectedCapacity);
    if(selectedCity && selectedSchool && selectedCapacity) {
    if(res) {
      navigate('/My-Groups')
      //navigate somewhere
    } 
   }
  };

  const changeCity = async (cityName) => {
    setSelectedCity(cityName)
  }
  
  const handleCityChange = async (e) => {
    await changeCity(e.target.value)
    if (e.target.value !== ""){
      const schools = await fetchAllSchoolsByCity(e.target.value);
      setSchoolsList(schools);
    }
    else {
      setSchoolsList("")
      setSelectedCapacity("")
    }
    
  }


  return (
    <>
      <Header />
      <Nav />
      <div className='content-Box-add-group'>
        <span className='purple_circle'>
          <button className='back_button' onClick={() => navigate(-1)} >חזרה</button>
        </span>
        <div className="main_content_add_group">

          <div className='add-group-title'>
            <h1>הוספת קבוצה</h1>
          </div>
          <div className='add-group-semi-title'>
            <h2>אנא מלא את הפרטים :</h2>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
            <Form>
              {user.role === "Admin" && (
                <div className="form_add_group">
                <label htmlFor="city"> עיר: </label>
                <Field as="select" id="city" name="city" onChange={handleCityChange} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  {citiesList &&
                       <>{citiesList.map((city) => (
                         <option key={city.id} value={city.cityName}>{city.cityName}</option>
                       ))}
                       </>}
                </Field>
                <ErrorMessage name="city" component="span" />
              </div>
              )}
              {(user.role === "CityManager" || user.role === "AreaManager") && (
                <div>
                <label htmlFor="city"> עיר: </label>
                <Field as="select" id="city" name="city" onChange={handleCityChange} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  <option value={user.cityName}>{user.cityName}</option>
                </Field>
                <ErrorMessage name="city" component="span" />
              </div>
              )}
              

              {selectedCity && (
                <div>
                  <label htmlFor="school"> בית ספר: </label>
                  <Field as="select" id="school" name="school" onChange={(e) => setSelectedSchool(e.target.value)} value={selectedSchool}>
                    <option value="">בחר בית ספר</option>
                    {schoolsList &&
                       <>{schoolsList.map((school) => (
                         <option key={school.id} value={school.id}>{school.schoolName}</option>
                       ))}
                       </>}
                  </Field>
                  <ErrorMessage name="school" component="span" />
                </div>
              )}

              {selectedSchool && selectedCity && (
                <div>
                  <label htmlFor="capacity"> הגבלה: </label>
                  <Field as="select" id="capacity" name="capacity" onChange={(e) => setSelectedCapacity(e.target.value)} value={selectedCapacity}>
                    <option value="">בחר הגבלה לקבוצה</option>
                    
                    {Array.from({ length: 8 }, (_, index) => index + 2).map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </Field>
                  <ErrorMessage name="capacity" component="span" />
                </div>
              )}
                    


              {(selectedCapacity !== "" && selectedSchool !== "" && selectedCapacity !== "") && (
                <div className='submit_Buttons'>
                <button type="submit" onClick={onSubmit} className='submit-button' >צור קבוצה</button>
                </div>
              )}
            </Form>
          </Formik>

        </div>
      </div>
      <Footer />
    </>
  )
}

export default AddGroupPage;
