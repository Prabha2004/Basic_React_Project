import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, addUser, deleteUser } from './redux/dataSlice';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.data);
  const [search, setSearch] = useState('');
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const handleAddUser = () => {
    if (newUser.trim()) {
      dispatch(addUser({ id: Date.now(), name: newUser }));
      setNewUser('');
    }
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const filteredData = data.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Dynamic Web Application</h1>
      
      <input
        className="search-bar"
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <button className="fetch-btn" onClick={() => dispatch(fetchData())}>Refetch Data</button>

      <div className="add-user">
        <input
          type="text"
          placeholder="Add new user"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser}>Add User</button>
      </div>

      <ul className="user-list">
        {filteredData.map((item) => (
          <li key={item.id}>
            {item.name}
            <button className="delete-btn" onClick={() => handleDeleteUser(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
