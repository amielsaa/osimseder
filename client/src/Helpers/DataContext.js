import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import ConfirmationMessage from "../Components/ConfirmationMessage";



const DataContext = createContext({})
export const DataProvider = ({children}) => {
    // const [user,setUser] = useState({userId:'1', userName: "ארי מאיר",role:'Student' , phoneNumber:"0508639353", parentName: "אורלי אושרי",
    // parentNumber: "0503428526", School: "מקיף ו", sex:"זכר", languages:["אנגלית", "עברית"], personalRequests:"כבד לי בלילות"
    // , groupId:"002" })
    
    const [user,setUser] = useState({});

    useEffect(() => {
        if(localStorage.getItem("accessToken")) {
            axios.get(`http://localhost:3001/auth/update_user_session`, {headers: {accessToken:localStorage.getItem("accessToken")}}).then((res) => {
                if(res.data.error) alert(res.data.error);
                else {
                    setUser(res.data.user.dataValues);
                    console.log(res.data.user.dataValues);
                };
            });
        }
    }, [])
    
    const navigate = useNavigate();
    return (
        <DataContext.Provider value = { {
            user, setUser, navigate
        }}>
            {children}
            </DataContext.Provider>
    )
}

export default DataContext;