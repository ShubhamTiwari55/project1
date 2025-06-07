const chatService = require('./chat.service');

exports.getThreads = async (req, res) => {
    try {
        const threads = await chatService.getUserThreads(req.user.userId);
        res.json({ success: true, threads });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getThreadMessages = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        // Mark messages as read when opening thread
        await chatService.markMessagesAsRead(req.params.threadId, req.user.userId);

        const messages = await chatService.getThreadMessages(
            req.params.threadId,
            req.user.userId,
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
            req.user.userId,
            req.body.message
        );
        res.json({ success: true, message });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.startThread = async (req, res) => {
    try {
        const thread = await chatService.startThread(req.body.participantIds);
        res.status(201).json({ success: true, thread });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
