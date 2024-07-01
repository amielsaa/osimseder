import React from 'react';
import './css/UsersIndex.css';

const StaffTable = ({ users, prepareJoinGroupAction, prepareDeleteStaffAction, onApproveStaffMember }) => {


  return (
    <div className='content-box-users-table'>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>שם משפחה</th>
            <th>תפקיד</th>
            <th>מספר טלפון</th>
            <th>עיר</th>
            <th>איזור</th>
            <th>מגדר</th>
            <th>אישור משתמש</th>
            <th>מחק איש סגל</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.accesses}</td>   
              <td>{user.phoneNumber}</td>
              <td>{user.cityName}</td>
              <td>{user.areaName}</td>
              <td>{user.gender}</td>
                {user.isVerified ? (
                    <td>{"מאושר/ת"}</td>
                ) : (
                    <td>
                    <div className='approve-box'>
                    <button className='approve-button' onClick={() => onApproveStaffMember(user)} >✔</button>
                    </div>
                    </td>
                )}
                
              <td><button className='delete-student-button' onClick={() => prepareDeleteStaffAction(user)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StaffTable;
