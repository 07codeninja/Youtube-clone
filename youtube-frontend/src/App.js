import './App.css';
import Navbar from './Component/Navbar/navbar';
import Home from './Pages/Home/home';
import Video from './Pages/Video/video';
import Profile from './Pages/Profile/profile';
import VideoUpload from './Pages/VideoUpload/videoUpload';
import SignUp from './Pages/SignUp/signUp';
import Login from './Component/Login/login'; 
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const setSideNavbarFunc = (value) => setSideNavbar(value);

  return (
    <div className="App">
      <Navbar setSideNavbarFunc={setSideNavbarFunc} sideNavbar={sideNavbar} />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} />} />
        <Route path="/watch/:id" element={<Video />} />
        <Route path="/user/:id" element={<Profile sideNavbar={sideNavbar} />} />
        <Route path="/:id/upload" element={<VideoUpload />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
