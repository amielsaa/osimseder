import { useEffect, useState } from "react";

const Filter = (selectionFunction, valueToUseState, SetValueToUseState, ChooseTitle) => {
    
    const [listForFilter,setListForFilter] = useState([])
    useEffect(()=> {
        const setList = async() => {
            const res = selectionFunction()
            setListForFilter(res)
        }
    })
  return (
   <>
   <div className='filter_and_label'>
            <label htmlFor='label_for_filter'>בחר/י {ChooseTitle}:</label>
          {schoolOptions && <select
            className='filter'
            id='filter'
            name='filter'
            value={valueToUseState}
            onChange={(e) => SetValueToUseState(e.target.value)}
          >
            <option value=''>בחר/י {ChooseTitle}</option>
            {schoolOptions.map((school) => (
              <option key={school.id} value={school.id}>
                {school.schoolName}
              </option>
            ))}
          </select>}
          </div>
   </>
  )
}

export default Filter;