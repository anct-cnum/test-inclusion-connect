import axios from 'axios';

const logout = async (auth) => {
  const token = auth.user?.access_token;
  await axios.post('http://localhost:8080/logout', {
    withCredentials: true,
    headers: { Authorization: `Bearer ${token}` },
  });
  localStorage.removeItem('user');
  auth.signoutRedirect();
};

export default logout;
