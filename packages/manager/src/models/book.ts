interface Book {
  filename: string;
  title: string;
  creator: string;
  description: string;
  ISBN: string;
  issued: string;
  coverFilename: string;
}

class Book {
  constructor({
    title,
    filename,
    creator,
    description,
    ISBN,
    issued,
    coverFilename,
  }: Book) {
    this.filename = filename;
    this.title = title;
    this.creator = creator;
    this.description = description;
    this.ISBN = ISBN;
    this.issued = issued;
    this.coverFilename = coverFilename;
  }
}

export default Book;
