import axios from "axios";
import { createContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import useWindowEvents from './useWindowEvents.js';




const DataContext = createContext({})
export const DataProvider = ({children}) => {
    // const [user,setUser] = useState({email:'1', userName: "ארי מאיר",role:'Student' , phoneNumber:"0508639353", parentName: "אורלי אושרי",
    // parentNumber: "0503428526", School: "מקיף ו", sex:"זכר", languages:["אנגלית", "עברית"], personalRequests:"כבד לי בלילות"
    // , groupId:"002" })
    const { width } = useWindowEvents();
    const [user,setUser] = useState({});
    const [loginRefresh, setLoginRefresh] = useState(false);



    useEffect(() => {
        if(localStorage.getItem("accessToken")) {
            axios.get(`http://localhost:3001/api/auth/update_user_session`, {headers: {accessToken:localStorage.getItem("accessToken")}}).then((res) => {
                if(res.data.error) alert(res.data.error);
                else {
                    setUser(res.data.user.dataValues);
                    //window.location.reload();
                    
                    
                    
                };
            });
        }
    }, [loginRefresh])
   
    const updateUserGroupId = async (newGroupId) => {
        setUser((prevUser) => ({
          ...prevUser,
          groupId: newGroupId
        }));
      };
    const navigate = useNavigate();
    return (
        <DataContext.Provider value = { {
            user, setUser, navigate , updateUserGroupId,loginRefresh, setLoginRefresh
        }}>
            {children}
            </DataContext.Provider>
    )

    
}

export default DataContext;