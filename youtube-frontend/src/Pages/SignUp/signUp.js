import React, { useState } from 'react';
import './signUp.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

const SignUp = () => {
  const navigate = useNavigate();

  const [uploadedImageUrl, setUploadedImageUrl] = useState("https://th.bing.com/th/id/OIP.Wy2uo_y-ttULYs4chLmqSAAAAA?rs=1&pid=ImgDetMain");
  const [signUpField, setSignUpField] = useState({
    channelName: '',
    userName: '',
    password: '',
    about: '',
    profilePic:uploadedImageUrl
  });

  const [progressBar, setProgressBar] = useState(false);

  const handleInputField = (event, name) => {
    setSignUpField({
      ...signUpField,
      [name]: event.target.value
    });
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'youtube-clone');

    try {
      setProgressBar(true);
      const response = await axios.post('https://api.cloudinary.com/v1_1/dax5bbfos/image/upload', data);
      setProgressBar(false);
      const imageUrl = response.data.url;
      setUploadedImageUrl(imageUrl);
      setSignUpField({
        ...signUpField,
        profilePic: imageUrl
      });
    } catch (err) {
      console.error('Image upload failed', err);
      toast.error('Image upload failed');
      setProgressBar(false);
    }
  };

  const handleSignup = async () => {
    const { channelName, userName, password, profilePic } = signUpField;

    if (!channelName || !userName || !password || !profilePic) {
      toast.warning('Please fill in all required fields');
      return;
    }

    try {
      console.log('Sending data to backend:', signUpField);
      toast.success('Signed up successfully!');
      navigate('/');
    } catch (err) {
      console.error(err);
      toast.error('Signup failed');
    }
  };

  return (
    <div className='signUp'>
      <div className="signup_card">
        <div className="signUp_title">
          <YouTubeIcon sx={{ fontSize: "54px" }} className='login_youtubeImage' />
          <span>SignUp</span>
        </div>

        <div className="signUp_Inputs">
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.channelName}
            onChange={(e) => handleInputField(e, 'channelName')}
            placeholder="Channel Name"
            required
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.userName}
            onChange={(e) => handleInputField(e, 'userName')}
            placeholder="User Name"
            required
          />
          <input
            type="password"
            className="signUp_Inputs_inp"
            value={signUpField.password}
            onChange={(e) => handleInputField(e, 'password')}
            placeholder="Password"
            required
          />
          <input
            type="text"
            className="signUp_Inputs_inp"
            value={signUpField.about}
            onChange={(e) => handleInputField(e, 'about')}
            placeholder="About Your Channel"
          />

          <div className="image_upload_signup">
            <div className="upload_input_container">
              <input type="file" accept="image/*" onChange={uploadImage} />
            </div>
            <div className="image_upload_signup_div">
              <img
                className="image_default_signUp"
                src={uploadedImageUrl || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}
                alt="Profile Preview"
              />
            </div>
          </div>

          <div className="signUpBtns">
            <div className="signUpBtn" onClick={handleSignup}>SignUp</div>
            <Link to="/" className="signUpBtn">Home Page</Link>
          </div>

          {progressBar && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress />
            </Box>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
