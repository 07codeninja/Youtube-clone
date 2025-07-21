const Video = require('../Modals/video');

// Upload Video
exports.uploadVideo = async (req, res) => {
  try {
    const { title, description, videoLink, thumbnail, videoType } = req.body;

    const video = new Video({
      user: req.user._id,
      title,
      description,
      videoLink,
      thumbnail,
      videoType,
    });

    await video.save();
    res.status(201).json({ message: 'Video uploaded successfully', video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Videos
exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'channelName profilePic');
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// ✅ FIXED: Get Single Video by ID (this was missing)
exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('user', 'channelName profilePic createdAt');
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get All Videos by User ID (for channel page)
exports.getAllVideoByUserID = async (req, res) => {
  try {
    const { userId } = req.params;
    const videos = await Video.find({ user: userId });

    if (!videos || videos.length === 0) {
      return res.status(404).json({ message: 'No videos found for this user.' });
    }

    res.status(200).json(videos);
  } catch (error) {
    res.status(500).json({ message: 'Server error while fetching videos by user ID', error });
  }
};