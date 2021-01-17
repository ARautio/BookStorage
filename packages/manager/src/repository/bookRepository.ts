import sqlite3 from "sqlite3";
import Book from "../models/book";
import { getFromDB, runFromDB } from "../utils";

enum typeOption {
  "LATEST",
}

interface getOptions {
  limit?: number;
  type?: typeOption;
}

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
        title TEXT,
        description TEXT,
        creator TEXT,
        issued TEXT,
        coverFilename TEXT,
        ISBN TEXT
      );
    `
    );
  }

  async getBooks(options?: getOptions) {
    let query = "";
    if (options?.limit !== undefined) {
      query = `LIMIT ${options?.limit}`;
    }

    const books: Book[] = await getFromDB(
      this.db,
      `SELECT * FROM books ${query}`
    );
    return books;
  }

  async addBooks(books: [Book]) {
    return Promise.all(books.map(async (book) => this.addBook(book)));
  }

  async addBook({
    filename,
    title,
    creator,
    description,
    ISBN,
    issued,
    coverFilename,
  }: Book) {
    // @TODO: Check if filename is already
    const book: any = await getFromDB(
      this.db,
      `SELECT title FROM books WHERE "filename"="${filename}"`
    );

    // @TODO: Update the book even though it's in DB
    if (book.length === 0) {
      await getFromDB(
        this.db,
        `INSERT INTO books (filename, title, creator, description, ISBN, issued, coverFilename) 
          VALUES("${filename}", "${title}", "${creator}", "${description}","${ISBN}", "${issued}", "${coverFilename}")`
      );
    }
    return null;
  }
}
