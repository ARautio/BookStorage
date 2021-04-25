import express from "express";
import sqlite from "sqlite3";
import cors from "cors";
import * as http from "http";
import * as ws from "ws";

import { books } from "./endpoints/books";
import { opds } from "./endpoints/opds";
import { settings } from "./endpoints/settings";

import { BookRepository } from "./repository/bookRepository";
import { EPubRepository } from "./repository/epubRepository";
import { SettingsRepository } from "./repository/settingsRepository";
import Book from "./models/book";
import BookFile from "./models/bookfile";

const COVER_PATH = process.env.COVER_PATH || "../../covers/";
const BOOK_PATH = process.env.BOOK_PATH || "../../books";
const CONFIG_PATH = process.env.CONFIG_PATH || "../../config";

const app = express();
app.use(cors());

const PORT = 8000;
const server = http.createServer(app);
const wss = new ws.Server({ noServer: true });

const db = new sqlite.Database(`${CONFIG_PATH}/bookstorage.db`);

const settingsRepository = new SettingsRepository(db);
settingsRepository.initiate();

const ePubRepository = new EPubRepository(Book, BookFile);
const bookRepository = new BookRepository(db);
bookRepository.initiate();

books({ app, wss }, bookRepository, ePubRepository, settingsRepository);
opds({ app, wss }, bookRepository);
settings({ app, wss }, settingsRepository);

app.get("/", (req, res) => res.send("BookStorage started"));

app.use("/assets/books/", express.static(BOOK_PATH));
app.use("/assets/covers/", express.static(COVER_PATH));

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ action: "CONNECTION" }));
});

wss.on("close", (ws: any) => {
  ws.send("connection close");
});

server.on("upgrade", function(request, socket, head) {
  wss.handleUpgrade(request, socket, head, function(ws) {
    wss.emit("connection", ws, request);
  });
});

server.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
