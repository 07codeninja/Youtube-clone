const Comment = require('../Modals/comment');

exports.addComment = async (req, res) => {
  try {
    const { video, message } = req.body;

    const comment = new Comment({
      user: req.user._id,
      video,
      message,
    });

    await comment.save();
    res.status(201).json({ message: 'Comment added successfully', comment });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getCommentByVideoId = async (req, res) => {
  try {
    const comments = await Comment.find({ video: req.params.videoId })
      .populate('user', 'channelName profilePic')
      .sort({ createdAt: -1 });

    res.status(200).json({ comments });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
