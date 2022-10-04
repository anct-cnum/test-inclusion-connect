import React from 'react';
import { useAuth } from 'react-oidc-context';

const Home = () => {
  const auth = useAuth();

  const login = async () => {
    await auth.signinRedirect();
  };

  return <button onClick={login}>Log in</button>;
};
export default Home;
