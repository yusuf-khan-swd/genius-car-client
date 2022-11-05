import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {
  const { googleLogIn } = useContext(AuthContext);

  const handleGoogleLogIn = () => {
    googleLogIn()
      .then(result => {
        const user = result.user;

        const currentUser = {
          email: user.email
        };

        fetch('https://genius-car-server-pi-pearl.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(currentUser)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('genius-token', data.token)
          })
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