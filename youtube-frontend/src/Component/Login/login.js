import React, { useState } from 'react';
import './login.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link } from 'react-router-dom';

const Login = ({ setLoginModal }) => {
  const [loginField, setLoginField] = useState({ userName: '', password: '' });

  const handleOnChangeInput = (event, name) => {
    setLoginField({
      ...loginField,
      [name]: event.target.value,
    });
  };

  const handleLoginFun = () => {
  console.log('Login button clicked'); // ✅ This confirms button is working

  const { userName, password } = loginField;

  if (!userName || !password) {
    alert('Please fill in both fields');
    return;
  }

  console.log('Username:', userName);
  console.log('Password:', password);

  alert(`Logging in with username: ${userName}`);
  setLoginModal(false);
};

  return (
    <div className='login'>
      <div className='login_card'>
        {/* Title with YouTube Icon */}
        <div className='titleCard_login'>
          <YouTubeIcon sx={{ fontSize: '54px' }} className='login_youtubeImage' />
          <span>Login</span>
        </div>

        {/* Credentials Input */}
        <div className='loginCredentials'>
          <div className='userNameLogin'>
            <input
              className='userNameLoginUserName'
              placeholder='Username'
              type='text'
              value={loginField.userName}
              onChange={(e) => handleOnChangeInput(e, 'userName')}
            />
          </div>
          <div className='userNameLogin'>
            <input
              className='userNameLoginUserName'
              placeholder='Password'
              type='password'
              value={loginField.password}
              onChange={(e) => handleOnChangeInput(e, 'password')}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className='login_buttons'>
          <div className='login-btn' onClick={handleLoginFun}>Login</div>

          <Link to='/signup' className='login-btn' onClick={() => setLoginModal(false)}>
            SignUp
          </Link>

          <Link to='/' className='login-btn' onClick={() => setLoginModal(false)}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
