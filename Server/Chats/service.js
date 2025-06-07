const ChatThread = require('./chatThread.model');
const Message = require('./message.model');

const getUserThreads = async (userId) => {
    return ChatThread.find({ participants: userId })
        .sort({ updatedAt: -1 })
        .populate('participants', 'name email');
};

const getThreadMessages = async (threadId, userId, page = 1, limit = 20) => {
    const thread = await ChatThread.findById(threadId);
    if (!thread) throw new Error('Thread not found');
    if (!thread.participants.includes(userId)) throw new Error('Access denied');

    const messages = await Message.find({ thread: threadId })
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('sender', 'name email');

    return messages;
};

const sendMessage = async (threadId, senderId, messageText) => {
    const thread = await ChatThread.findById(threadId);
    if (!thread) throw new Error('Thread not found');
    if (!thread.participants.includes(senderId)) throw new Error('Access denied');

    const message = await Message.create({
        thread: threadId,
        sender: senderId,
        message: messageText,
        readBy: [senderId],
    });

    thread.lastMessage = messageText;
    await thread.save();

    return message;
};

const startThread = async (participantIds) => {
    const thread = await ChatThread.create({
        participants: participantIds,
    });

    return thread;
};

const markMessagesAsRead = async (threadId, userId) => {
    await Message.updateMany(
        { thread: threadId, readBy: { $ne: userId } },
        { $push: { readBy: userId } }
    );
};

module.exports = {
    getUserThreads,
    getThreadMessages,
    sendMessage,
    startThread,
    markMessagesAsRead,
};
