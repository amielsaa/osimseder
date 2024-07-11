import React, { useContext, useEffect, useState } from 'react';
import GroupTO from './GroupTO';
import DataContext from '../../Helpers/DataContext';
import { fetchAllGroupsStaff } from '../../Helpers/StaffFrontLogic';

const GroupListTO = ({ selectedCity, selectedSchool }) => {
  const { user } = useContext(DataContext);
  const [groups, setGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      const groups = await fetchAllGroupsStaff();
      setGroups(groups);
    };
    fetchGroups();
  }, [user]);

  useEffect(() => {
    const filterGroups = () => {
      let filteredGroupsList = groups;

      if (selectedCity) {
        console.log('city');
        filteredGroupsList = filteredGroupsList.filter(
          group => parseInt(group.cityId) === parseInt(selectedCity)
        );
      }

      if (selectedSchool) {
        console.log('school');
        filteredGroupsList = filteredGroupsList.filter(
          group => parseInt(group.schoolId) === parseInt(selectedSchool)
        );
      }

      setFilteredGroups(filteredGroupsList);
    };

    filterGroups();
  }, [groups, selectedCity, selectedSchool]);

  const deleteGroupFromList = id => {
    setGroups(groups => groups.filter(group => group.id !== id));
  };

  return (
    <>
      {filteredGroups.length > 0 && (
        <>
          {filteredGroups.map(groupJson => (
            <GroupTO
              key={groupJson.id}
              groupId={groupJson.id}
              groupJson={groupJson}
              deleteGroupFromList={deleteGroupFromList}
            />
          ))}
        </>
      )}
    </>
  );
};

export default GroupListTO;
