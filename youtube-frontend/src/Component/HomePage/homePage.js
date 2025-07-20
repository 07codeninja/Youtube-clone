import React, { useEffect, useState } from 'react';
import './homePage.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = ({ sideNavbar }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
  axios.get('http://localhost:8000/api/allVideo')
    .then(res => {
      console.log("VIDEOS FROM API:", res.data.videos);
      setData(res.data.videos);
    })
    .catch(err => {
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
          <div key={index} className="homePage_option">
            {item}
          </div>
        ))}
      </div>

      {/* Video Grid */}
      <div className={sideNavbar ? "home_mainPage" : "home_mainPageWithoutLink"}>
        {data.map((item, index) => (
          <Link to={`/watch/${item._id}`} className="youtube_Video" key={index}>
            {/* Thumbnail with duration */}
            <div className="youtube_thumbnailBox">
              <img
                src={
                  item.thumbnail?.startsWith('http')
                    ? item.thumbnail
                    : `http://localhost:8000/uploads/${item.thumbnail}`
                }
                alt="Thumbnail"
                className="youtube_thumbnailPic"
              />
              <div className="youtube_timingThumbnail">{item.time}</div>
            </div>

            {/* Title and Profile Info */}
            <div className="youtubeTitleBox">
              <div className="youtubeTitleBoxProfile">
                <img
                  src={
                    item?.user?.profilePic?.startsWith('http')
                      ? item.user.profilePic
                      : `http://localhost:8000/uploads/${item.user?.profilePic}`
                  }
                  alt="Profile"
                  className="youtube_thumbnail_Profile"
                />
              </div>
              <div className="youtubeTitleBox_Title">
                <div className="youtube_videoTitle">{item?.title}</div>
                <div className="youtube_channelName">{item?.user?.userName}</div>
                <div className="youtubeVideo_likes">{item?.like || 0} likes</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
