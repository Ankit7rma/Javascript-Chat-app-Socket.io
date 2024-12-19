const { instrument } = require("@socket.io/admin-ui");
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:8080", "https://admin.socket.io"],
  },
});

io.on("connection", (socket) => {
  console.log(socket.id);
  //   socket.on("custom-event", (number, text, object) => {
  //     console.log(number, text, object);
  //   });
  socket.on("join-room", (room) => {
    if (room) {
      socket.join(room);
      console.log(`${socket.id} joined room: ${room}`);
    }
  });
  socket.on("send-message", (message, room) => {
    // io.emit("recieve-message", message);
    // socket.broadcast.emit("recieve-message", message);

    if (room === "") {
      socket.broadcast.emit("recieve-message", message);
    } else {
      //   socket.join(room);
      socket.to(room).emit("recieve-message", message);
    }
  });
});
instrument(io, {
  auth: false,
});
