import express from "express";
import sqlite from "sqlite3";

import { books } from "./endpoints/books";
import { BookRepository } from "./repository/bookRepository";
import { EPubRepository } from "./repository/epubRepository";
import { SettingsRepository } from "./repository/settingsRepository";
import Book from "./models/book";

const app = express();
const PORT = 8000;

const db = new sqlite.Database(":memory:");

const settingsRepository = new SettingsRepository(db);
settingsRepository.initiate();

const ePubRepository = new EPubRepository(Book);
const bookRepository = new BookRepository(db);
bookRepository.initiate();

books(app, bookRepository, ePubRepository, settingsRepository);

app.get("/", (req, res) => res.send("BookStorage started"));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
