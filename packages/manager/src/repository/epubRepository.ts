import { promises as fs } from "fs";
import EPub from "epub2";

export class EPubRepository {
  Book;

  constructor(Book: any) {
    this.Book = Book;
  }

  async getBooks(bookPath: string) {
    //@TODO: Ability to read all directory levels
    const files = await fs.readdir(bookPath);
    const books = files.map(async (file) =>
      this.getBookMeta(`${bookPath}/${file}`, file)
    );
    return Promise.all(books);
  }

  async getBookMeta(filename: string, file: string) {
    //@TODO: Read other file types than epub
    var epub = await EPub.createAsync(filename);
    return new this.Book({ filename: file, ...epub.metadata });
  }
}
