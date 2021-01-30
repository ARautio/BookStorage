import { promises as fs } from "fs";

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
    const books = files.map(async (file, index) =>
      this.getBookMeta(`${bookPath}/${file}`, file, (filename) =>
        callbackForEachBook({ index, filename, total: files.length })
      )
    );
    return Promise.all(books);
  }

  async getBookMeta(
    filename: string,
    file: string,
    callback: (file: string) => void
  ) {
    var epub = new this.BookFile(filename);
    await epub.loadBook();
    callback(file);
    const imageFilename = await epub.saveCover();

    return new this.Book({
      filename: file,
      ...epub.getBook(),
      coverFilename: imageFilename,
    });
  }
}
