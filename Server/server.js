const http = require('http');
const app = require('./src/app');
const server = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const ChatThread = require('./src/Chat/chatThread.model');
const Message = require('./src/Chat/message.model');

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('joinThread', (threadId) => {
        socket.join(threadId);
    });

    socket.on('sendMessage', async ({ threadId, senderId, message }) => {
        try {
            const thread = await ChatThread.findById(threadId);
            if (!thread) throw new Error('Thread not found');

            const newMessage = await Message.create({
                thread: threadId,
                sender: senderId,
                message: message,
                readBy: [senderId],
            });

            thread.lastMessage = message;
            await thread.save();

            io.to(threadId).emit('newMessage', {
                threadId,
                message: newMessage,
            });
        } catch (err) {
            console.error(err);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});
