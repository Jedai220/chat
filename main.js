import express from "express";
import fs from "node:fs/promises"
import http from "node:http";
import { WebSocketServer } from "ws";

let allMessageArray = new Array();
const port = 8000,
  host = "localhost";
const app = express();
app.use(express.static("client"));
const server = http.createServer(app);




const wss = new WebSocketServer({ server });
wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
        for (let client of wss.clients) {
            client.send(`I LOVE SOCKET AND YOU TO BECAUSE I FEEL WEBSOCKET IN MY USEFOOL HEAD${allMessageArray.length}`);
            console.log(JSON.parse(msg.toString()));
        // client.send(msg.toString());
        }
    });
});

server.listen(port, host, () => {
  console.log("Server started");
});
