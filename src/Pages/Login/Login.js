import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const Login = () => {
  const { setLoading } = useContext(AuthContext);

  const navigation = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const { login } = useContext(AuthContext);

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;

    const email = form.email.value;
    const password = form.password.value;
    login(email, password)
      .then(result => {
        const user = result.user;

        const currentUser = {
          email: user.email
        }

        fetch('https://genius-car-server-pi-pearl.vercel.app/jwt', {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(currentUser)
        })
          .then(res => res.json())
          .then(data => {
            localStorage.setItem('genius-token', data.token);
            navigation(from, { replace: true });
          })

      })
      .catch(err => {
        console.error('error: ', err);
      })
      .finally(() => {
        setLoading(false)
      })
  };

  return (
    <div className="hero w-full my-20">
      <div className="hero-content grid gap-10 md:grid-cols-2 flex-col lg:flex-row">
        <div className="text-center lg:text-left">
          <img className='w-3/4' src={img} alt="" />
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
          <h1 className="text-center text-5xl font-bold">Login</h1>
          <form onSubmit={handleLogin} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" name='email' placeholder="email" className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name='password' placeholder="password" className="input input-bordered" required />
              <label className="label">
                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <input className="btn btn-primary" type="submit" value="Login" />
            </div>
          </form>
          <SocialLogin></SocialLogin>
          <p className='text-center'>New to Genius Car? <Link to='/signup' className='text-orange-600 font-bold'>Sign Up</Link> </p>
        </div>
      </div>
    </div>
  );
};

export default Login;