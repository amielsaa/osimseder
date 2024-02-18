import { createContext, useState} from "react";
import { useNavigate } from "react-router-dom";



const DataContext = createContext({})
export const DataProvider = ({children}) => {
    const [user,setUser] = useState({userId:'1', userName: "ארי מאיר",role:'TeamOwner' , phoneNumber:"0508639353", parentName: "אורלי אושרי",
    parentNumber: "0503428526", School: "מקיף ו", sex:"זכר", languages:["אנגלית", "עברית"], personalRequests:"כבד לי בלילות"
    , groupId:"002" })
    const navigate = useNavigate();
    const URL = 'http://localhost:3001';
    

      
    return (
        <DataContext.Provider value = { {
            user, setUser, URL, navigate
        }}>
            {children}
            </DataContext.Provider>
    )
}

export default DataContext;