const chatService = require('./service');

exports.startThread = async (req, res) => {
    try {
        const user1Id = req.user.id;
        if (!user1Id) {
            return res.status(400).json({ success: false, error: 'User ID is required' });
        }
        const participantIds = req.body.participantIds || [];

        const thread = await chatService.startThread(user1Id, participantIds);
        res.status(201).json({ success: true, thread });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getThreads = async (req, res) => {
    try {
        const userId = req.user.id;
        const threads = await chatService.getUserThreads(userId);
        res.json({ success: true, threads });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getThreadMessages = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;

    await chatService.markMessagesAsRead(req.params.threadId, req.user.userId);

    const messages = await chatService.getThreadMessages(
      req.params.threadId,
      req.user.id,
      page,
      limit
    );

    res.json({ success: true, messages });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = await chatService.sendMessage(
      req.params.threadId,
      req.user.id,
      req.body.message
    );
    res.json({ success: true, message });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};
