import React from 'react';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const history = useHistory();
  return (
    <div>
      <button onClick={history.goBack}>retour</button>
      <p>Profile</p>
    </div>
  );
};

export default Profile;
