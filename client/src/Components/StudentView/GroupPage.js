// GroupPage.js
import Header from '../Header';
import Nav from '../Nav';

import React from 'react';

const GroupPage = ({role , userName}) => {
  return (
    <div>

        <Header userName={userName}  role={role}/>

        <Nav role={role}/>

    </div>
  );
}

export default GroupPage;