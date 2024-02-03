import './App.css';
import axios from "axios"
import {useEffect, useState} from "react"
function App() {

  const [checkList, setCheckList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3001").then((res) => {
      setCheckList(res.data.listOfGender)
      //console.log(res.data)
    })
  },[])
  return (
    <div className="App">
      {checkList.map((value, key) => {
        return <div>{value.gender}</div>
      })}
    </div>
  );
}

export default App;
