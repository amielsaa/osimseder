import React, { useState } from 'react';
import Group from './Group';
import FilterBox from './FilterBox';

const GroupList = () => {
  const initialGroupIds = Array.from({ length: 10 }, (_, index) => (index + 1).toString().padStart(3, '0'));
  const [groupIds, setGroupIds] = useState(initialGroupIds);
  const [filterValue, setFilterValue] = useState('');

  const filteredGroups = groupIds.filter(groupId =>
    groupId.includes(filterValue)
  );

  return (
    <>
      <FilterBox filterValue={filterValue} onFilterChange={setFilterValue} />
      {filteredGroups.map((groupId) => (
        <Group key={groupId} groupId={groupId} />
      ))}
    </>
  );
}

export default GroupList;
