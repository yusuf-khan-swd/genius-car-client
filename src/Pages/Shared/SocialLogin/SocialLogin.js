import React, { useContext } from 'react';
import { setAuthToken } from '../../../api/auth';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then(result => {
        const user = result.user;
        setAuthToken(user);
      })
      .catch(err => {
        console.error('error: ', err);
      })
  };

  return (
    <div>
      <p className='text-2xl font-bold text-center'>Social Login</p>
      <p className='text-center'>
        <button onClick={handleGoogleLogIn} className='btn btn-ghost'>Google</button>
      </p>
    </div>
  );
};

export default SocialLogin;