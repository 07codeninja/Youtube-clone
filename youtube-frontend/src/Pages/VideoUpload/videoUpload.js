import React, { useState } from 'react';
import './videoUpload.css';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const VideoUpload = () => {
  const [inputField, setInputField] = useState({
    title: '',
    description: '',
    videoLink: '',
    thumbnail: '',
    videoType: '',
  });

  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const handleOnChangeInput = (event, name) => {
    setInputField({
      ...inputField,
      [name]: event.target.value,
    });
  };

  const uploadMedia = async (e, type, key) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'youtube-clone');

    try {
      setLoader(true); // Show loader during upload
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dax5bbfos/${type}/upload`,
        data,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            console.log(`${type} Upload Progress: ${percent}%`);
          },
        }
      );

      const mediaUrl = response.data.secure_url;
      console.log(`Uploaded ${type} URL:`, mediaUrl);

      setInputField((prev) => ({
        ...prev,
        [key]: mediaUrl,
      }));
    } catch (err) {
      console.error(`${type} Upload Error:`, err);
    } finally {
      setLoader(false); // Hide loader after upload
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const { title, description, videoType, thumbnail, videoLink } = inputField;

    if (!title || !description || !videoType || !thumbnail || !videoLink) {
      alert('Please fill all fields and upload both video & thumbnail!');
      return;
    }

    setLoader(true);
    console.log('Uploading video with data:', inputField);

    setTimeout(() => {
      setLoader(false);
      alert('Video uploaded successfully!');
      navigate('/');
    }, 1500);
  };

  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red", marginRight: "10px" }} />
          <span>Upload Video</span>
        </div>

        <form className="uploadForm" onSubmit={handleUpload}>
          <input
            type="text"
            placeholder="Title of Video"
            className="uploadFormInputs"
            value={inputField.title}
            onChange={(e) => handleOnChangeInput(e, 'title')}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="uploadFormInputs"
            value={inputField.description}
            onChange={(e) => handleOnChangeInput(e, 'description')}
            required
          />
          <input
            type="text"
            placeholder="Video Type (e.g. Education, Music)"
            className="uploadFormInputs"
            value={inputField.videoType}
            onChange={(e) => handleOnChangeInput(e, 'videoType')}
            required
          />

          <label className='uploadLabel'>Thumbnail</label>
          <input
            type="file"
            accept="image/*"
            className="uploadFileInput"
            onChange={(e) => uploadMedia(e, 'image', 'thumbnail')}
            required
          />
          {inputField.thumbnail && (
            <img
              src={inputField.thumbnail}
              alt="Thumbnail Preview"
              className="thumbnailPreview"
            />
          )}

          <label className='uploadLabel'>Video File</label>
          <input
            type="file"
            accept="video/*"
            className="uploadFileInput"
            onChange={(e) => uploadMedia(e, 'video', 'videoLink')}
            required
          />

          <div className='uploadBtnGroup'>
            <button type="submit" className="uploadBtn" disabled={loader}>
              {loader ? 'Uploading...' : 'Upload'}
            </button>
            <button type="button" className="uploadBtn" onClick={() => navigate('/')}>
              Home
            </button>
          </div>
        </form>

        {/* ✅ Loader Below Form */}
        {loader && (
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </Box>
        )}
      </div>
    </div>
  );
};

export default VideoUpload;
