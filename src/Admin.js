import React, { useState, useEffect } from 'react';
import './Admin.css'
import { useNavigate } from 'react-router-dom';

import { FaTrash } from 'react-icons/fa';
function AdminPage() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [sortKey, setSortKey] = useState('');

  
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      setIsLoggedIn(true);
    }
  
    fetchUsers();
  }, []);
  
  function handleLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/admin');
  }
  

  function fetchUsers() {
    fetch('http://localhost:8000/')
      .then(response => response.json())
      .then(data => setUsers(data.data));
  }

  function handleLogin(event) {
    event.preventDefault();
    if (email === 'admin@gmail.com' && password === '1234') {
      setIsLoggedIn(true);
      // Store a value in local storage
      localStorage.setItem('isLoggedIn', true);
    } else {
      alert("your are not a admin")
      navigate('/');
    }
  }
  
  if (!isLoggedIn) {
    return (
      <div className="form-container">
        <div className="form-title">Admin Login</div> 
        <form className="form-card" onSubmit={handleLogin}>
          
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              required
            />
          </label>
          <br />
          <input type="submit" value="Login" />
        </form>
      </div>
    );
}



  function handleDelete(id) {
  
    fetch(`http://localhost:8000/${id}`, { method: 'DELETE' })
      .then(() => {
        fetchUsers();
      });
  }


  return (
    <div className="table-container">
      <button onClick={handleLogout} id="logout">Logout</button>
      <table>
        <thead>
          <tr>
            <th onClick={() => setSortKey('name')}>Name</th>
            <th onClick={() => setSortKey('email')}>Email</th>
            <th onClick={() => setSortKey('mobile')}>Phone Number</th>
            <th onClick={() => setSortKey('loginCount')}>Active/Non-Active</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
        {[...users]
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <span
                  className={
                    user.loginCount >= 2 ? 'active1' : 'non-active1'
                  }
                >
                  {user.loginCount >= 2 ? 'Active' : 'Non-Active'}
                </span>
              </td>

              <td>
                <span title="Delete the user">
                  <button onClick={() => handleDelete(user._id)}>
                    <FaTrash />
                  </button>
                </span>
              </td>
            </tr>
          ))}
      </tbody>
      </table>
    </div>
  );
}  
export default AdminPage;
