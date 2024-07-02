import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './css/EditDetailsPopUp.css';

// Validation schema
const getValidationSchema = (userRole) => {
  const baseSchema = {
    firstName: Yup.string().required('שדה נדרש'),
    lastName: Yup.string().required('שדה נדרש'),
    phoneNumber: Yup.string()
      .matches(/^\d+$/, 'מספר פלאפון חייב להיות מספר')
      .required('שדה נדרש'),
    gender: Yup.string().required('שדה נדרש'),
  };

  if (userRole === 'Student') {
    return Yup.object({
      ...baseSchema,
      parentName: Yup.string().required('שדה נדרש'),
      parentPhoneNumber: Yup.string()
        .matches(/^\d+$/, 'מספר פלאפון חייב להיות מספר')
        .required('שדה נדרש'),
      extraLanguage: Yup.string(),
      issuesText: Yup.string().required('שדה נדרש'),
    });
  }

  return Yup.object(baseSchema);
};

const languages = ["ערבית","ספרדית","אמהרית","רוסית"]

const StudentInfoChanger = ({ userRole, onClose, onSubmit, props }) => {
 

  const initialValues = {
    firstName: props.firstName || '',
    lastName: props.lastName || '',
    phoneNumber: props.phoneNumber || '',
    gender: props.gender || '',
    parentName: props.parentName || '',
    parentPhoneNumber: props.parentPhoneNumber || '',
    extraLanguage: props.extraLanguage || '',
    issuesText: props.issuesText || '',
  };

  return (
    <div className="overlay-student-info-changer">
      <div className="confirmation-modal-student-info-changer">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>עדכון פרטי משתמש</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={getValidationSchema(userRole)}
          onSubmit={onSubmit}
        >
          <Form>
            <div>
              <label htmlFor="firstName">שם</label>
              <Field name="firstName" type="text" />
              <ErrorMessage name="firstName" component="div" />
            </div>
            <div>
              <label htmlFor="lastName">שם משפחה</label>
              <Field name="lastName" type="text" />
              <ErrorMessage name="lastName" component="div" />
            </div>
            <div>
              <label htmlFor="phoneNumber">מספר פלאפון</label>
              <Field name="phoneNumber" type="text" />
              <ErrorMessage name="phoneNumber" component="div" />
            </div>
             <div>
                <label htmlFor="gender">מין: </label>
                    <Field as="select" id="gender" name="gender">
                        <option value={initialValues.gender}>{initialValues.gender}</option>
                        <option value="זכר">זכר</option>
                        <option value="נקבה">נקבה</option>
                        <option value="אחר">אחר</option>
                    </Field>
                    <ErrorMessage name="gender" component="span" />
                </div>
            {userRole === 'Student' && (
              <>
                <div>
                  <label htmlFor="parentName">שם הורה</label>
                  <Field name="parentName" type="text" />
                  <ErrorMessage name="parentName" component="div" />
                </div>
                <div>
                  <label htmlFor="parentPhoneNumber">מספר פלאפון הורה</label>
                  <Field name="parentPhoneNumber" type="text" />
                  <ErrorMessage name="parentPhoneNumber" component="div" />
                </div>
                <div>
                    <label htmlFor="extraLanguage"> שפה נוספת </label>
                    <Field as="select" id="extraLanguage" name="extraLanguage">
                        <option value={initialValues.extraLanguage}>{initialValues.extraLanguage}</option>
                        {languages.map((lang) => (
                            <option key={lang} value={lang}>{lang}</option>
                        ))}
                    </Field>
                    <ErrorMessage name="extraLanguage" component="span" />
                    </div>
                <div>
                  <label htmlFor="issuesText">בקשות אישיות</label>
                  <Field as="textarea" name="issuesText" />
                  <ErrorMessage name="issuesText" component="div" />
                </div>
              </>
            )}
            <div className="change-info-button-container">
              <button type="submit" className="confirmation-button-change-info">
                עדכן פרטים
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default StudentInfoChanger;
