import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/allVideo')
      .then((res) => {
        console.log("VIDEOS FROM API:", res.data.videos);
        setData(res.data.videos);
      })
      .catch((err) => {
        console.log("API error:", err);
      });
  }, []);

  const options = [
    "All", "Twenty20 Cricket", "Music", "Live", "Mixes", "Gaming",
    "Debates", "Coke Studio Pakistan", "Democracy", "Pakistani dramas", "Comedy"
  ];

  return (
    <div className={sideNavbar ? 'homePage' : 'fullHomePage'}>
      {/* Scrollable category options */}
      <div className="homePage_options">
        {options.map((item, index) => (
          <div key={index} className="homePage_option">{item}</div>
        ))}
      </div>

      {/* Video Grid */}
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {data.map((item) => (
          <Link to={`/watch/${item._id}`} className="youtube_Video" key={item._id}>
            {/* Thumbnail with duration */}
            <div className="youtube_thumbnailBox">
              <img
                src={item.thumbnail}
                alt="Thumbnail"
                className="youtube_thumbnailPic"
              />
              <div className="youtube_timingThumbnail">{item?.duration || "10:00"}</div>
            </div>

            {/* Title and Profile Info */}
            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img
                  src={
                    item?.user?.profilePic?.startsWith('http')
                      ? item.user.profilePic
                      : `http://localhost:4000/uploads/${item?.user?.profilePic}`
                  }
                  alt="Profile"
                  className="youtube_thumbnail_Profile"
                />
              </div>

              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item.title}</div>
                <div className="youtube_channelName">
                  {item?.user?.channelName || item?.user?.userName || "Unknown User"}
                </div>
                <div className="youtubeVideo_likes">{item?.like || 0} likes</div>
                <div className="youtubeVideo_joined">
                  Joined: {item?.user?.createdAt ? new Date(item.user.createdAt).toDateString() : 'N/A'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
