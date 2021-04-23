import { promises as fs } from "fs";
import path from "path";

interface Callback {
  index: number;
  filename: string;
  total: number;
}

export class EPubRepository {
  Book;
  BookFile;

  constructor(Book: any, BookFile: any) {
    this.Book = Book;
    this.BookFile = BookFile;
  }

  async getBooks(
    bookPath: string,
    callbackForEachBook: ({ index, filename, total }: Callback) => void = () =>
      null
  ) {
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
      const book = await epub.load();

      callback(file);
      const imageFilename = await epub.saveCover();

      return new this.Book({
        filename: file,
        ...book,
        coverFilename: imageFilename,
      });
    } catch (e) {
      // @TODO: Better erro handling
      throw Error("Error");
    }
  }
}
