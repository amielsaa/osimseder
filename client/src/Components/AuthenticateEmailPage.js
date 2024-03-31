import React, { useContext, useEffect, useState } from 'react';
import './css/Footer.css';
import { useParams } from 'react-router-dom';
import ConfirmMessage from './ConfirmMessage';
import DataContext from '../Helpers/DataContext';
import {authenticateRegisterEmail} from '../Helpers/utils'

const AuthenticateEmailPage = () => {
    const {navigate} = useContext(DataContext)
    const {token, encryptedEmail} = useParams()
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const authenticate = async () => {
            setResponse(await authenticateRegisterEmail(token, encryptedEmail))
            setLoading(false)
        }
        authenticate()
    })
  return (
    <>
    {response && !loading && (
        <ConfirmMessage
            title = {"ההרשמה הסתיימה בהצלחה!"}
            confirmationMessage={`ברוכים הבאים!`}
            handleConfirm={() => navigate('/')}
        />
      )}
        {!response && !loading && (
        <ConfirmMessage
            title = {"שגיאה"}
            confirmationMessage={`אחד או יותר מהשדות לא מאושרים ע"י המערכת, נסה להחליף אימייל או סיסמה`}
            handleConfirm={() => navigate('/404')}
        />
      )}
    </>
  );
}

export default AuthenticateEmailPage;