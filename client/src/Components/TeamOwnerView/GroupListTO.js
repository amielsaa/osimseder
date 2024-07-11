import React, { useContext, useEffect, useState } from 'react';
import GroupTO from './GroupTO';
import DataContext from '../../Helpers/DataContext';
import {fetchAllGroupsStaff} from '../../Helpers/StaffFrontLogic'
const GroupListTO = ({selectedCity, selectedSchool}) => {
  const { user } = useContext(DataContext);

  
  const [groups, setGroupIds] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([])
  
  




    

    useEffect(() => {
    const setGroups = async () => {
      const groups = await fetchAllGroupsStaff();
      setGroupIds(groups);
      FilterGroups()
    };
    setGroups();

  }, [user,selectedCity, selectedSchool]);  

  

  const deleteGroupFromList = (id) => {
    setGroupIds(groupIds => groupIds.filter(group => group.id !== id));
  }
  // Amiel - this is the new function that filters groups
  function FilterGroups() {
    let filteredGroupsList = groups;

    if (selectedCity) {
      console.log("city")
      filteredGroupsList = filteredGroupsList.filter(group => parseInt(group.cityId) == parseInt(selectedCity));
    }

    if (selectedSchool) {
      console.log("neighborhood")
      filteredGroupsList = filteredGroupsList.filter(group => parseInt(group.schoolId) == parseInt(selectedSchool));
    }

    setFilteredGroups(filteredGroupsList);

  }



  return (
    <> 
      {/*Amiel - should be filteredGroups here instead of groups. test it out when you finish with all the back stuff. */}
      { (filteredGroups.length > 0) && <>
      {filteredGroups.map((groupJson) => (
        <GroupTO key={groupJson.id}
                groupId={groupJson.id}
                groupJson={groupJson}
                deleteGroupFromList={deleteGroupFromList} />
      ))} </>
      }
    </>
  );
}

export default GroupListTO;
