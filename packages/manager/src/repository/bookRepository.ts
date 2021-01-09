import sqlite3 from "sqlite3";
import Book from "../models/book";
import { getFromDB, runFromDB } from "../utils";

export class BookRepository {
  db;
  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  async initiate() {
    await runFromDB(
      this.db,
      `
      CREATE TABLE IF NOT EXISTS books (
        filename TEXT PRIMARY KEY,
        title TEXT
      );
    `
    );
  }

  async getBooks() {
    const books = await getFromDB(this.db, "SELECT * FROM books");
    return books;
  }

  async addBooks(books: [Book]) {
    return Promise.all(
      books.map(async ({ filename, title }) => {
        // @TODO: Check if filename is already
        const promise = getFromDB(
          this.db,
          `SELECT title FROM books WHERE "filename"="${filename}"`
        );
        const book: any = await promise;

        // @TODO: Update the book even though it's in DB
        console.log(book.length);
        if (book.length === 0) {
          await getFromDB(
            this.db,
            `INSERT INTO books (filename, title) VALUES("${filename}", "${title}")`
          );
        }
        return null;
      })
    );
  }
}
