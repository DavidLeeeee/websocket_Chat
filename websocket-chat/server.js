const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static("public"));

wss.on("connection", (ws) => {
  console.log("New client connected");

  ws.on("message", (message) => {
    console.log(`Received: ${message}`);
    // 메시지를 객체로 변환
    const messageData = JSON.parse(message);
    // 모든 클라이언트에게 메시지 브로드캐스트
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            sender: messageData.sender,
            text: messageData.text,
          })
        );
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
