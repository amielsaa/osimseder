import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ConfirmMessage from './ConfirmMessage';
import PasswordChanger from './PasswordChanger';
import DataContext from '../Helpers/DataContext';
import { authenticateChangePassword } from '../Helpers/utils'
import { changeUserPasswordExternal } from '../Helpers/StaffFrontLogic'


const ChangePasswordPage = () => {
    const {navigate} = useContext(DataContext)
    const { token, encryptedEmail } = useParams()
    const [response, setResponse] = useState(false)
    const [loading, setLoading] = useState(true)
    const [showConfirmSuccess,setShowConfirmSuccess] = useState(false)
    const [showConfirmFailed,setShowConfirmFailed] = useState(false)

    useEffect(() => {
        const authenticate = async () => {
            try {
                setResponse(await authenticateChangePassword(token, encryptedEmail))
                setLoading(false)
            } catch (e) {
                setShowConfirmFailed(true)
            }
        }
        authenticate()
    }, [token]) 

    function submitPasswordChange(data) {
        try {
            console.log(data)
            changeUserPasswordExternal(encryptedEmail, data.newPassword)
            setShowConfirmSuccess(true)

        }catch(e) {
            setShowConfirmFailed(true)

        }
    }
    


  return (
    <>
    {((!loading && !showConfirmSuccess && !showConfirmFailed) && 
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
      confirmationMessage={`ייתכן שהסיסמה לא תואמת או שהייתה שגיאת מערכת`}
      handleConfirm={() => navigate('/')}
      />
    )}
    </>
  );
}

export default ChangePasswordPage;