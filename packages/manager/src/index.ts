import express from 'express';
import sqlite from 'sqlite3'

import { books } from './endpoints/books'
import { BookRepository } from './repository/bookRepository'
import { EPubRepository } from './repository/epubRepository'
import Book from './models/book'

const app = express();
const PORT = 8000;

const db = new sqlite.Database(':memory')

const ePubRepository = new EPubRepository({ bookPath: '../../books'}, Book)
const bookRepository = new BookRepository(db)

books(app, bookRepository, ePubRepository)

app.get('/', (req, res) => res.send('BookStorage started'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});