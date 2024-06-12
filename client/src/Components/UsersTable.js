import React from 'react';
import './css/UsersIndex.css';

const UsersTable = ({ users, prepareJoinGroupAction, prepareDeleteStudentAction }) => {
  return (
    <div className='content-box-users-table'>
      <table>
        <thead>
          <tr>
            <th>שם</th>
            <th>שם משפחה</th>
            <th>מספר טלפון</th>
            <th>שם הורה</th>
            <th>מספר טלפון הורה</th>
            <th>עיר</th>
            <th>בית ספר</th>
            <th>מגדר</th>
            <th>שפה</th>
            <th>קבוצה</th>
            <th>מחק חניך</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.lastName}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.parentName}</td>
              <td>{user.parentPhoneNumber}</td>
              <td>{user.city}</td>
              <td>{user.school}</td>
              <td>{user.gender}</td>
              <td>{user.language}</td>
              {!user.groupId? <td className='group-id-td'><button className='join-group-button' onClick={() => prepareJoinGroupAction(user.id,user.name, user.lastName,  user.school)}>צרף</button></td> : <td>{user.groupId}</td>}
              <td><button className='delete-student-button' onClick={() => prepareDeleteStudentAction(user.id, user.name , user.lastName)}>X</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
