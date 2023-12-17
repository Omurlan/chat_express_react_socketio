const { Server } = require("socket.io");

const io = new Server({
  cors: {
    origin: "http://localhost:3000",
  },
});

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);

  socket.on("addNewUser", (userId) => {
    if (!onlineUsers[socket.id]) {
      onlineUsers[socket.id] = { userId, socketId: socket.id };
    }

    io.emit("getOnlineUsers", Object.values(onlineUsers));
  });

  socket.on("disconnect", () => {
    console.log("dissconnetc", socket.id);
    if (onlineUsers[socket.id]) {
      delete onlineUsers[socket.id];
    }

    io.emit("getOnlineUsers", Object.values(onlineUsers));
  });

  socket.on("sendMessage", (message) => {
    console.log("SEND", message);

    const user = Object.values(onlineUsers).find(
      (u) => u.userId === message.recipientId
    );

    if (user) {
      io.to(user.socketId).emit("getMessage", message);
    }
  });
});

io.listen(6060);
