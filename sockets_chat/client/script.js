
import { io } from "socket.io-client"; // or import * as io from 'socket.io-client';

const messageInput = document.querySelector("#message-input");
const roomInput = document.querySelector("#room-input");
const joinRoomButton = document.querySelector("#join-room-button");
const form = document.querySelector("#form");

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  displayMessage(`You are connected with Id : ${socket.id}`);
});

socket.on("recieve-message", (message) => {
  displayMessage(message);
});

// socket.emit("custom-event", 12, "as", { a: "as" });

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageInput.value;
  const room = roomInput.value;

  if (message === "") return;

  displayMessage(message);
  socket.emit("send-message", message, room);
  messageInput.value = "";
});

joinRoomButton.addEventListener("click", () => {
  const room = roomInput.value;
  if (room !== "") {
    socket.emit("join-room", room);
    displayMessage(`Joined room: ${room}`);
  }
});

function displayMessage(message) {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector("#message-container").append(div);
}
