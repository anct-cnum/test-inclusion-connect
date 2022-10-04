import React, { useEffect, useState, useContext } from 'react';
import UserApiContext from './helpers/UserApiProvider';
import { useAuth } from 'react-oidc-context';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Board = () => {
  const user = useContext(UserApiContext);
  const { API } = useContext(UserApiContext);
  const [users, setUsers] = useState([]);
  const auth = useAuth();

  const logout = async () => {
    await axios.post('http://localhost:8080/logout', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${user?.user?.accessToken}` },
    });
    localStorage.removeItem('user');
    auth.signoutRedirect();
  };

  const fetchUsers = () =>
    API.get('custom-route-get')
      .then((fetchedUsers) => setUsers(fetchedUsers?.data))
      .catch((err) => console.log(err));

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div>
        Hello {auth.user?.profile.sub} <button onClick={logout}>Log out</button>
      </div>
      <h1>Tableau de bord</h1>
      <h2>Utilisateurs</h2>
      <button onClick={fetchUsers}>Requête</button>
      <ul>
        {users?.length > 0
          ? users.map((user, i) => <li key={i}>{user.name}</li>)
          : 'No users'}
      </ul>
      <Link to='/profile'>Profile</Link>
    </>
  );
};

export default Board;
