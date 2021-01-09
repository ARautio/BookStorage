
interface Book {
  filename: string,
  title: string,
  creator: string
}

class Book {
  constructor({ title, filename, creator }: Book){
    this.filename = filename,
    this.title = title
    this.creator = creator
  }
}

export default Book