import React, { useEffect, useState } from 'react';
import './profile.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
  const { id } = useParams(); // This should be the userId (_id from DB)
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    try {
      setLoading(true);

      // Get user info
      const userRes = await axios.get(`http://localhost:4000/api/users/find/${id}`);
      setUser(userRes.data);

      // Get videos for user
      const videosRes = await axios.get(`http://localhost:4000/api/videos/find/user/${id}`);
      setVideos(videosRes.data || []);
    } catch (err) {
      console.error("Failed to fetch profile data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  return (
    <div className='profile'>
      <SideNavbar sideNavbar={sideNavbar} />
      <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>

        {/* Top Section */}
        <div className="profile_top_section">
          <div className="profile_top_section_profile">
            <img
              className='profile_top_section_img'
              src={
                user?.profilePic?.startsWith("http")
                  ? user.profilePic
                  : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'
              }
              alt="Profile"
            />
          </div>

          <div className="profile_top_section_About">
            {user ? (
              <>
                <div className="profile_top_section_About_name">
                  {user.channelName || "Unknown User"}
                </div>
                <div className='profile_top_section_info'>
                  @{user.userName || "unknown"} · {videos?.length || 0} Videos
                </div>
                <div className='profile_top_section_info'>
                  {user.about || "No bio provided."}
                </div>
              </>
            ) : (
              <>
                <div className="profile_top_section_About_name">Loading channel...</div>
                <div className='profile_top_section_info'>@loading · 0 Videos</div>
                <div className='profile_top_section_info'>Loading bio...</div>
              </>
            )}
          </div>
        </div>

        {/* Videos Section */}
        <div className="profile_videos">
          <div className="profile_videos_title">Videos &nbsp; <ArrowRightIcon /></div>

          <div className="profileVideos">
            {loading ? (
              <div style={{ padding: "1rem", color: "#777" }}>Loading videos...</div>
            ) : videos.length > 0 ? (
              videos.map((video) => (
                <Link to={`/watch/${video._id}`} className="profileVideo_block" key={video._id}>
                  <div className='profileVideo_block_thumbnail'>
                    <img
                      className='profileVideo_block_thumbnail_img'
                      src={
                        video.thumbnail?.startsWith("http")
                          ? video.thumbnail
                          : `http://localhost:4000/uploads/${video.thumbnail}`
                      }
                      alt="Video Thumbnail"
                    />
                  </div>
                  <div className="profileVideo_block_detail">
                    <div className="profileVideo_block_detail_name">{video.title}</div>
                    <div className="profileVideo_block_detail_about">
                      {user?.channelName || 'Unknown User'} • {video.views || 0} views • {new Date(video.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div style={{ padding: "1rem", color: "#777" }}>No videos uploaded yet.</div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;

