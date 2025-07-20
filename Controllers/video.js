const Video = require('../models/video');

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

exports.getAllVideo = async (req, res) => {
  try {
    const videos = await Video.find().populate('user', 'channelName profilePic');
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getVideoById = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('user', 'channelName profilePic');
    res.status(200).json({ video });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllVideoByUserID = async (req, res) => {
  try {
    const videos = await Video.find({ user: req.params.userId }).populate('user', 'channelName profilePic');
    res.status(200).json({ videos });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
