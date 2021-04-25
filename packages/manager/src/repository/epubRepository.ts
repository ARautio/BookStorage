import { promises as fs } from "fs";
import path from "path";

import Book, { BookConstructor } from "../models/book";
import { BookFileConstructor } from "../models/bookfile";
interface Callback {
  index: number;
  filename: string;
  total: number;
}

export class EPubRepository {
  Book;
  BookFile;

  constructor(Book: BookConstructor, BookFile: BookFileConstructor) {
    this.Book = Book;
    this.BookFile = BookFile;
  }

  async getBooks(
    bookPath: string,
    callbackForEachBook: ({ index, filename, total }: Callback) => void = () =>
      null
  ): Promise<Book[]> {
    //@TODO: Ability to read all directory levels
    const files = await fs.readdir(bookPath);
    let resolvedBooks: any[] = [];

    files.forEach((file, index) => {
      if (path.extname(file) === ".epub") {
        resolvedBooks.push(
          this.getBookMeta(`${bookPath}/${file}`, file, (filename) =>
            callbackForEachBook({ index, filename, total: files.length })
          )
        );
      }
    });
    return resolvedBooks;
  }

  async getBookMeta(
    filename: string,
    file: string,
    callback: (file: string) => void
  ) {
    try {
      var epub = new this.BookFile(filename);
      await epub.load();
      console.log(epub.metadata?.coverPath);
      const imageFilename = await epub.saveCover();
      callback(file);
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
