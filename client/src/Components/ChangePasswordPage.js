import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmMessage from './ConfirmMessage';
import PasswordChanger from './PasswordChanger';
import DataContext from '../Helpers/DataContext';
import {authenticateRegisterEmail} from '../Helpers/utils'

const ChangePasswordPage = () => {
    const {navigate} = useContext(DataContext)
    const { token, encryptedEmail } = useParams()
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showConfirmSuccess,setShowConfirmSuccess] = useState(false)
    const [showConfirmFailed,setShowConfirmFailed] = useState(false)

    /* useEffect(() => {
        const authenticate = async () => {
            setResponse(await authenticateRegisterEmail(token, encryptedEmail))
            setLoading(false)
        }
        authenticate()
    }, [token]) */

    function submitPasswordChange(data) {
        try {
            console.log(data)
            setShowConfirmSuccess(true)

        }catch(e) {
            setShowConfirmFailed(true)

        }
    }
    


  return (
    <>
    {(/* !response && !loading && */
        <PasswordChanger  onSubmit={submitPasswordChange} fromLoginPage={true}/>
      )}

    {showConfirmSuccess && (
      <ConfirmMessage
      title={`!הסיסמה שונתה בהצלחה`}
      confirmationMessage={`אנא התחבר דרך העמוד הראשי`}
      handleConfirm={() => navigate('/')}
      />
    )}
    {showConfirmFailed && (
      <ConfirmMessage
      title={`תקלה`}
      confirmationMessage={`ייתכן שהסיסמה לא תואמת או שהייתה שגיאת מערכת, נסו שוב`}
      handleConfirm={() => setShowConfirmFailed(false)}
      />
    )}
    </>
  );
}

export default ChangePasswordPage;