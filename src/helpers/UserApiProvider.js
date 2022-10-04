import { useState } from 'react';
import UserApiContext from './UserApiContext';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import dayjs from 'dayjs';

export const UserApiProvider = ({ children }) => {
  const [user, setUser] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  );

  const API = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: { Authorization: `Bearer ${user?.accessToken}` },
  });

  API.interceptors.request.use(async (req) => {
    if (!user) {
      setUser(
        localStorage.getItem('user')
          ? JSON.parse(localStorage.getItem('user'))
          : null
      );
      req.headers.Authorization = `Bearer ${user?.accessToken}`;
    }
    const accessToken = jwt_decode(user?.accessToken);
    const isExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1;
    if (!isExpired) return req;
    try {
      const response = await axios.post(
        'http://localhost:8080/refresh-token',
        {},
        { withCredentials: true }
      );
      setUser(response.data);
      localStorage.setItem('user', JSON.stringify(response.data));
      req.headers.Authorization = `Bearer ${response.data.accessToken}`;
      return req;
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <UserApiContext.Provider value={{ user, API }}>
      {children}
    </UserApiContext.Provider>
  );
};

export default UserApiContext;
