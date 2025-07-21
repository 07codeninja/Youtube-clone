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

  const handleOnChangeInput = (e, name) => {
    setInputField(prev => ({ ...prev, [name]: e.target.value }));
  };

  const uploadMedia = async (e, type, key) => {
    const file = e.target.files[0];
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'youtube-clone');

    try {
      setLoader(true);
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dax5bbfos/${type}/upload`,
        data,
        {
          onUploadProgress: e => {
            const percent = Math.round((e.loaded * 100) / e.total);
            console.log(`${type} Upload: ${percent}%`);
          },
        }
      );

      setInputField(prev => ({
        ...prev,
        [key]: response.data.secure_url,
      }));
    } catch (err) {
      console.error(`${type} upload error:`, err);
      alert('Upload failed');
    } finally {
      setLoader(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const { title, description, videoType, thumbnail, videoLink } = inputField;

    if (!title || !description || !videoType || !thumbnail || !videoLink) {
      return alert('Please fill all fields');
    }

    setLoader(true);
    try {
      const res = await axios.post(
        'http://localhost:4000/api/video',
        inputField,
        { withCredentials: true }
      );
      console.log('✔️ Uploaded:', res.data);
      navigate('/');
    } catch (err) {
      console.error('Upload video failed:', err.response?.data || err);
      alert(err.response?.data.error || 'Upload error');
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className='videoUpload'>
      <div className="uploadBox">
        <div className="uploadVideoTitle">
          <YouTubeIcon sx={{ fontSize: "54px", color: "red", marginRight: "10px" }} />
          <span>Upload Video</span>
        </div>
        <form className="uploadForm" onSubmit={handleUpload}>
          {['title','description','videoType','videoLink','thumbnail'].map((name,i)=>{
            if(name==='thumbnail'||name==='videoLink') return null;
            return (
              <input
                key={i}
                type={name==='videoLink'?'text':'text'}
                placeholder={name.charAt(0).toUpperCase() + name.slice(1)}
                className="uploadFormInputs"
                value={inputField[name]}
                onChange={e => handleOnChangeInput(e, name)}
                required
              />
            );
          })}

          <label>Thumbnail</label>
          <input type="file" accept="image/*" onChange={e => uploadMedia(e, 'image', 'thumbnail')} required />
          {inputField.thumbnail && <img src={inputField.thumbnail} alt="Thumbnail" className="thumbnailPreview"/>}

          <label>Video File</label>
          <input type="file" accept="video/*" onChange={e => uploadMedia(e, 'video', 'videoLink')} required />

          <div className='uploadBtnGroup'>
            <button type="submit" className="uploadBtn" disabled={loader}>
              {loader ? 'Uploading...' : 'Upload'}
            </button>
            <button type="button" className="uploadBtn" onClick={() => navigate('/')}>
              Cancel
            </button>
          </div>
        </form>

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
