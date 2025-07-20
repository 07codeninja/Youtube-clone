import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import './video.css';

const Video = () => {
  const { id } = useParams();

  const [videoData, setVideoData] = useState(null);
  const [videoUrl, setVideoURL] = useState('');
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchVideoById = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/getVideoById/${id}`);
        const video = res.data.video;
        setVideoData(video);
        setVideoURL(video.videoLink);
        setLikes(video.like);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/comment/${id}`); // ✅ FIXED
        setComments(res.data.comments);
      } catch (err) {
        console.log(err);
      }
    };

    fetchVideoById();
    fetchComments();
  }, [id]);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(disliked ? likes + 2 : likes + 1);
      setDisliked(false);
    }
    setLiked(!liked);
  };

  const handleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      if (liked) setLikes(likes - 1);
      setLiked(false);
      setDisliked(true);
    }
  };

  const handleAddComment = async () => {
    if (commentInput.trim() === '') return;
    try {
      const res = await axios.post(
        `http://localhost:8000/api/comment`, // ✅ FIXED
        {
          video: id,
          message: commentInput,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setComments([res.data.comment, ...comments]);
      setCommentInput('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancelComment = () => {
    setCommentInput('');
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  return (
    <div className="video">
      <div className="videoPostSection">
        {/* Video Player */}
        <div className="video_youtube">
          {videoData && (
            <video width="100%" controls autoPlay className="video_youtube_video">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {/* Title and Channel Info */}
        <div className="video_youtubeAbout">
          <div className="video_uTubeTitle">{videoData?.title}</div>

          <div className="youtube_video_ProfileBlock">
            <div className="youtube_video_ProfileBlock_left">
              <Link to={`/user/${videoData?.user?._id}`}>
                <img
                  className="youtube_video_ProfileBlock_left_image"
                  src={
                    videoData?.user?.profilePic ||
                    'https://randomuser.me/api/portraits/men/32.jpg'
                  }
                  alt="Profile"
                />
              </Link>

              <div className="youtubeVideo_subsView">
                <div className="youtubePostProfileName">{videoData?.user?.userName}</div>
                <div className="youtubePostProfileSubs">
                  Joined: {new Date(videoData?.user?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="subscribeBtnYoutube">Subscribe</div>
          </div>

          {/* Like/Dislike Buttons */}
          <div className="youtube_like_dislike_buttons">
            <button className={`likeButton ${liked ? 'active' : ''}`} onClick={handleLike}>
              <ThumbUpOutlinedIcon fontSize="small" />
              <span className="likeCount">{likes}</span>
            </button>
            <button className={`dislikeButton ${disliked ? 'active' : ''}`} onClick={handleDislike}>
              <ThumbDownAltOutlinedIcon fontSize="small" />
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="youtubeSelfComment">
          <img
            className="video_youtubeSelfCommentProfile"
            src="https://randomuser.me/api/portraits/lego/1.jpg"
            alt="Your profile"
          />
          <div className="addAComment">
            <input
              className="addAcommentInput"
              type="text"
              placeholder="Add a comment..."
              value={commentInput}
              onChange={handleCommentChange}
            />
            {commentInput && (
              <div className="cancelSubmitComment">
                <div className="cancelComment" onClick={handleCancelComment}>
                  Cancel
                </div>
                <div className="cancelComment" onClick={handleAddComment}>
                  Comment
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Comment Count */}
        <div
          className="commentCount"
          style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '16px', color: 'white' }}
        >
          {comments.length} {comments.length === 1 ? 'Comment' : 'Comments'}
        </div>

        {/* Comment List */}
        <div className="youtubeOthersComments">
          {comments.map((item, index) => (
            <div className="youtubeSelfComment" key={index}>
              <img
                className="video_youtubeSelfCommentProfile"
                src={item.user?.profilePic || 'https://randomuser.me/api/portraits/lego/1.jpg'}
                alt="User"
              />
              <div className="youtubeOthersCommentsRight">
                <div className="commentUserAndTime">
                  <span className="commentUserName">{item.user?.userName || 'Anonymous'}</span>
                  <span className="commentTimestamp">
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : ''}
                  </span>
                </div>
                <div className="commentText">{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Suggestions */}
      <div className="videoSuggestions">
        {[...Array(6)].map((_, i) => (
          <div className="videoSuggestionsBlock" key={i}>
            <div className="video_suggestion_thumbnail">
              <img
                src="https://images.indianexpress.com/2024/06/New-Project-2024-06-30T002213.995.jpg"
                alt="Thumbnail"
                className="video_suggestion_thumbnail_img"
              />
            </div>
            <div className="video_suggestions_About">
              <div className="video_suggestions_About_title">
                T20 2024 Worldcup Final IND vs SA Last 5 overs #cricket #india
              </div>
              <div className="video_suggestions_About_Profile">Cricket 320</div>
              <div className="video_suggestions_About_Profile">136K views · 1 day ago</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Video;
