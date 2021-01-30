import express from "express";
import sqlite from "sqlite3";
import cors from "cors";
import * as http from "http";
import * as ws from "ws";

import { books } from "./endpoints/books";
import { opds } from "./endpoints/opds";
import { BookRepository } from "./repository/bookRepository";
import { EPubRepository } from "./repository/epubRepository";
import { SettingsRepository } from "./repository/settingsRepository";
import Book from "./models/book";
import BookFile from "./models/bookfile";

const app = express();
app.use(cors());

const PORT = 8000;
const server = http.createServer(app);
const wss = new ws.Server({ noServer: true });

const db = new sqlite.Database(":memory:");

const settingsRepository = new SettingsRepository(db);
settingsRepository.initiate();

const ePubRepository = new EPubRepository(Book, BookFile);
const bookRepository = new BookRepository(db);
bookRepository.initiate();

books({ app, wss }, bookRepository, ePubRepository, settingsRepository);
opds({ app, wss }, bookRepository);

app.get("/", (req, res) => res.send("BookStorage started"));

app.use("/assets/books/", express.static("../../books"));
app.use("/assets/covers/", express.static("../../covers"));

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ action: "CONNECTION" }));
});

wss.on("close", (ws: any) => {
  ws.send("connection close");
});

server.on("upgrade", function (request, socket, head) {
  wss.handleUpgrade(request, socket, head, function (ws) {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
