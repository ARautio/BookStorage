import express from "express";
import sqlite from "sqlite3";
import * as http from "http";
import * as ws from "ws";

import { books } from "./endpoints/books";
import { BookRepository } from "./repository/bookRepository";
import { EPubRepository } from "./repository/epubRepository";
import { SettingsRepository } from "./repository/settingsRepository";
import Book from "./models/book";

const app = express();
const PORT = 8000;
const server = http.createServer(app);
const wss = new ws.Server({ server });

const db = new sqlite.Database(":memory:");

const settingsRepository = new SettingsRepository(db);
settingsRepository.initiate();

const ePubRepository = new EPubRepository(Book);
const bookRepository = new BookRepository(db);
bookRepository.initiate();

books({ app, wss }, bookRepository, ePubRepository, settingsRepository);

app.get("/", (req, res) => res.send("BookStorage started"));

wss.on("connection", (socket) => {
  socket.on("message", (message) => console.log(message));
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
server.on("upgrade", (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (socket) => {
    wss.emit("connection", socket, request);
  });
});
