import React, { useEffect } from 'react';
import axios from 'axios';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './Home';
import Board from './Board';
import Profile from './Profile';
import jwt_decode from 'jwt-decode';
import { useAuth } from 'react-oidc-context';

const App = () => {
  const location = useLocation();
  const profile =
    localStorage.getItem('user') !== 'undefined'
      ? JSON.parse(localStorage.getItem('user'))
      : null;
  const token = profile?.accessToken;
  const auth = useAuth();

  const logout = async () => {
    await axios.post('http://localhost:8080/logout', {
      withCredentials: true,
      headers: { Authorization: `Bearer ${token}` },
    });
    localStorage.removeItem('user');
    auth.signoutRedirect();
  };

  const refreshToken = async () => {
    const decodedToken = jwt_decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      let response;
      try {
        response = await axios.post(
          'http://localhost:8080/refresh-token',
          {},
          { withCredentials: true }
        );
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        logout();
        // console.log(error);
      }
    }
  };

  useEffect(() => {
    refreshToken();
  }, [location]);

  return (
    <Switch>
      <Route path='/login' exact component={Home} />
      <Route path='/private' exact component={Board} />
      <Route path='/profile' exact component={Profile} />
    </Switch>
  );
};

export default App;
