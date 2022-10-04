import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from 'react-oidc-context';
import { oidcConfig } from './lib/oidcConfig';
import { UserApiProvider } from './helpers/UserApiProvider';

ReactDOM.render(
  <Router>
    <AuthProvider {...oidcConfig}>
      <UserApiProvider>
        <App />
      </UserApiProvider>
    </AuthProvider>
  </Router>,
  document.getElementById('root')
);
