import { promises as fs } from "fs";
import EPub from "epub2";

interface Callback {
  index: number;
  filename: string;
  total: number;
}

export class EPubRepository {
  Book;

  constructor(Book: any) {
    this.Book = Book;
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
    //@TODO: Read other file types than epub
    var epub = await EPub.createAsync(filename);
    callback(file);
    let imageFilename = undefined;
    if (epub.metadata.cover !== undefined) {
      imageFilename = await new Promise((resolve, reject) => {
        epub.getImage(
          epub.metadata.cover,
          async (error: any, img: any, mimetype: any) => {
            // @TODO: Check mimetype and give extension based on that
            const imageFilename =
              epub.metadata.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
              ".jpg";
            await fs.writeFile(`../../covers/${imageFilename}`, img);
            resolve(imageFilename);
          }
        );
      });
    }
    return new this.Book({
      filename: file,
      ...epub.metadata,
      coverFilename: imageFilename,
    });
  }
}
