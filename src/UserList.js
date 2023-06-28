import React, { useEffect, useState } from 'react';
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://reqres.in/api/users?page=2');
      
      const data = await response.json();
      setUsers(data.data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
const handleSearch = event => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearch}
      />

      <ul className='userList'>
        {filteredUsers.map(user => (
          <li key={user.id} className='list'>
            <img src={user.avatar} alt="Avatar" />
            <p>ID: {user.id}</p>
            <p>Name: {user.first_name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;