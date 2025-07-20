import React, { useState, useEffect } from 'react';
import './profile.css';
import SideNavbar from '../../Component/SideNavbar/sideNavbar';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = ({ sideNavbar }) => {
    const { id } = useParams();
    const [videos, setVideos] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const fetchProfileData = async () => {
        try {
            const userRes = await axios.get(`http://localhost:8000/api/user/${id}`);
            setUser(userRes.data.user || {});

            const videosRes = await axios.get(`http://localhost:8000/api/video/user/${id}`);
            setVideos(videosRes.data.videos || []);
        } catch (err) {
            console.error('Failed to fetch profile data:', err);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className='profile'>
            <SideNavbar sideNavbar={sideNavbar} />

            <div className={sideNavbar ? "profile_page" : "profile_page_inactive"}>
                {/* Top Section */}
                <div className="profile_top_section">
                    <div
                        className="profile_top_section_profile"
                        onClick={() => navigate(`/profile/${user._id}`)}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            className='profile_top_section_img'
                            src={user?.profilePic?.startsWith('http') ? user.profilePic : '/default-avatar.png'}
                            alt="Profile"
                        />
                    </div>
                    <div className="profile_top_section_About">
                        <div className="profile_top_section_About_name">
                            {user?.channelName || "Unnamed Channel"}
                        </div>
                        <div className='profile_top_section_info'>
                            @{user?.userName || "unknown"} · {videos?.length || 0} Videos
                        </div>
                        <div className='profile_top_section_info'>
                            {user?.about || "No bio available."}
                        </div>
                    </div>
                </div>

                {/* Videos Section */}
                <div className="profile_videos">
                    <div className="profile_videos_title">Videos <ArrowRightIcon /></div>

                    <div className="profileVideos">
                        {videos.length > 0 ? (
                            videos.map((item) => (
                                <Link to={`/watch/${item._id}`} className="profileVideo_block" key={item._id}>
                                    <div className='profileVideo_block_thumbnail'>
                                        <img
                                            className='profileVideo_block_thumbnail_img'
                                            src={
                                                item.thumbnail?.startsWith("http")
                                                    ? item.thumbnail
                                                    : `http://localhost:/uploads/${item.thumbnail}`
                                            }
                                            alt="Video Thumbnail"
                                        />
                                    </div>
                                    <div className="profileVideo_block_detail">
                                        <div className="profileVideo_block_detail_name">{item.title}</div>
                                        <div className="profileVideo_block_detail_about">
                                            {user?.channelName} • {item.views || 0} views • {new Date(item.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div style={{ padding: "1rem", color: "#777" }}>
                                No videos uploaded yet.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
