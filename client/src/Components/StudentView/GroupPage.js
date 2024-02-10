// GroupPage.js
import Header from '../Header';
import Nav from '../Nav';
import '../css/GroupPage.css'

import React from 'react';

const GroupPage = ({role , userName}) => {
  return (
    <div>
        <Header userName={userName}  role={role}/>
        <Nav role={role}/>
      <div className='content-Box-Group'>
        <h1>קבוצה: 001</h1>
        <div className='Group-Info'>
          <div className='Info'>חניך גרעין : </div>
          <div className='Info'>בית ספר : </div>
          <div className='Info'>שם קשיש : </div>
          <div className='Info'>כתובת הבית : </div>
        </div>
        <div className='group-title'>
          <h1>חברי הקבוצה</h1>
        </div>
        <div className='Group-Info'>
          <div className='Info'>ארי מאיר</div>
          <div className='Info'>פליקס רויזמן</div>
          <div className='Info'>עמיאל סעד </div>
          <div className='Info'>יואב אביטל</div>
        </div>
        <div className='group-title'>
          <h1>מטלות</h1>          
        </div>
        <div className='Group-Info'>          
        </div>
      </div>
      
        

    </div>
  );
}

export default GroupPage;