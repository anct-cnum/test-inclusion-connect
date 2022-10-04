import { WebStorageStateStore } from 'oidc-client-ts';
import axios from 'axios';
const getProfile = () => JSON.parse(localStorage.getItem('oidc.user'));

export const oidcConfig = {
  client_id: '',
  client_secret: '',
  authority: 'https://',
  redirect_uri: 'http://localhost:3000/private',
  post_logout_redirect_uri: 'http://localhost:3000/login',
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  onSigninCallback: async () => {
    window.history.replaceState({}, document.title, window.location.pathname);
    const profile = await getProfile();
    const token = profile.access_token;
    axios
      .get('http://localhost:8080/login', {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:8080/login',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        localStorage.setItem('user', JSON.stringify(result?.data));
      })
      .catch((err) => console.log(err));
  },
};
