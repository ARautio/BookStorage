interface Book {
  filename: string;
  title: string;
  creator: string;
  description: string;
}

class Book {
  constructor({ title, filename, creator, description }: Book) {
    (this.filename = filename), (this.title = title);
    this.creator = creator;
    this.description = description;
  }
}

export default Book;
