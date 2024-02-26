import { useContext, useState } from "react";
import Header from "./Header";
import './css/AddGroupPage.css';
import Nav from "./Nav";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DataContext from "../Helpers/DataContext";
import Footer from "./Footer";
import { IoChevronForwardCircle } from "react-icons/io5";
import {fetchAllSchoolsByCity, addGroup} from '../Helpers/StaffFrontLogic'

const AddGroupPage = () => {
  const { user, navigate } = useContext(DataContext);
  const [selectedCity, setSelectedCity] = useState('');
  const [schoolsList, setSchoolsList] = useState([]);
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedCapacity, setSelectedCapacity] = useState('');

  const initialValues = {
    city: '',
    school: '',
    capacity: '',
    teamOwner: ''
  };

  const validationSchema = Yup.object().shape({
    city: Yup.string().required('עיר נדרשת'),
    school: Yup.string().when(['city'], {
      is: (city) => city && city.length > 0,
      then: Yup.string().required('בית ספר נדרש'),
    }),
    capacity: Yup.number().when(['school'], {
      is: (school) => school && school.length > 0,
      then: Yup.number().required('הגבלת כמות נדרשת'),
    }),
    teamOwner: Yup.string().when(['capacity'], {
      is: (capacity) => capacity && capacity.length > 0,
      then: Yup.string(),
    })
  });

  const handleSubmit = () => {
    // Handle form submission
    const res = addGroup(selectedCity,selectedSchool,selectedCapacity);
    if(res) {
      //navigate somewhere
    } 
  };

  const handleCityChange = async (e) => {
    setSelectedCity(e.target.value)
    const schools = await fetchAllSchoolsByCity(e.target.value);
    setSchoolsList(schools);
  }

  return (
    <>
      <Header />
      <Nav />
      <div className='content-Box-add-group'>
        <span className='purple_circle'>
          <IoChevronForwardCircle className='back_button' onClick={() => navigate(-1)} />
        </span>
        <div className="main_content_add_group">

          <div className='add-group-title'>
            <h1>הוספת קבוצה</h1>
          </div>

          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form>

              <div>
                <label htmlFor="city"> עיר: </label>
                <Field as="select" id="city" name="city" onChange={handleCityChange} value={selectedCity}>
                  <option value="">בחר עיר</option>
                  <option value="JRS">ירושלים</option>
                  <option value="BSV">באר שבע</option>
                </Field>
                <ErrorMessage name="city" component="span" />
              </div>

              {selectedCity && (
                <div>
                  <label htmlFor="school"> בית ספר: </label>
                  <Field as="select" id="school" name="school" onChange={(e) => setSelectedSchool(e.target.value)} value={selectedSchool}>
                    <option value="">בחר בית ספר</option>
                    {schoolsList &&
                      <>{schoolsList.map((school) => (
                        <option value={school.id}>{school.schoolName}</option>
                      ))}
                      </>}
                  </Field>
                  <ErrorMessage name="school" component="span" />
                </div>
              )}

              {selectedSchool && (
                <div>
                  <label htmlFor="capacity"> הגבלה: </label>
                  <Field as="select" id="capacity" name="capacity" onChange={(e) => setSelectedCapacity(e.target.value)} value={selectedCapacity}>
                    <option value="">בחר הגבלה לקבוצה</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Field>
                  <ErrorMessage name="capacity" component="span" />
                </div>
              )}

              {selectedCapacity && (
                <div>
                  <label htmlFor="teamOwner"> חניך גרעין: </label>
                  <Field as="select" id="teamOwner" name="teamOwner">
                    <option value="">בחר חניך גרעין (לא חובה)</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Field>
                  <ErrorMessage name="teamOwner" component="span" />
                </div>
              )}

              {selectedCapacity && (
                <div className='login_Buttons'>
                <button type="submit" className='button-login' >צור קבוצה</button>
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
