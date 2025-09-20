// server.js
import { WebSocketServer } from "ws";

const server = new WebSocketServer({ port: 8080 });

server.on("connection", (socket) => {
  console.log("✅ Client connected");

  socket.on("message", (message) => {
    console.log("📩 Received:", message.toString());
    socket.send(`Server says: ${message}`);
  });

  socket.on("close", () => {
    console.log("❌ Client disconnected");
  });
});

console.log("🚀 WebSocket server running on ws://localhost:8080");
