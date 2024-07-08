// const express = require("express");
// const app = express();
// const port = 3000;

// app.get("/", (req, res) => {
//   res.send("Hello World!zz");
// });

// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 8080 });

server.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    ws.send(`Server received: ${message}`);
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
