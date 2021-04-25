interface BookProps {
  filename: string;
  title?: string;
  creator?: string;
  description?: string;
  ISBN?: string;
  issued?: string;
  coverFilename?: string;
}

export type BookConstructor = new (props: BookProps) => Book;
class Book {
  filename: string;
  title?: string;
  creator?: string;
  description?: string;
  ISBN?: string;
  issued?: string;
  coverFilename?: string;

  constructor({
    title,
    filename,
    creator,
    description,
    ISBN,
    issued,
    coverFilename,
  }: BookProps) {
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
