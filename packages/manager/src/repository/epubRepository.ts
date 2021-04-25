import { promises as fs } from "fs";
import path from "path";

import Book, { BookConstructor } from "../models/book";
import { BookFileConstructor } from "../models/bookfile";

export class EPubRepository {
  Book;
  BookFile;

  constructor(Book: BookConstructor, BookFile: BookFileConstructor) {
    this.Book = Book;
    this.BookFile = BookFile;
  }

  async getBooks(bookPath: string): Promise<Promise<Book>[]> {
    //@TODO: Ability to read all directory levels
    const files = await fs.readdir(bookPath);
    let resolvedBooks: any[] = [];

    files.forEach((file, index) => {
      if (path.extname(file) === ".epub") {
        resolvedBooks.push(this.getBookMeta(`${bookPath}/${file}`, file));
      }
    });
    return resolvedBooks;
  }

  async getBookMeta(filename: string, file: string) {
    try {
      var epub = new this.BookFile(filename);
      await epub.load();
      const imageFilename = await epub.saveCover();
      return new this.Book({
        filename: file,
        creator: epub.metadata?.author.join(", "),
        ...epub.metadata,
        coverFilename: imageFilename,
      });
    } catch (e) {
      console.log(e);
      // @TODO: Better error handling
      throw Error(`Error with ${filename}`);
    }
  }
}
