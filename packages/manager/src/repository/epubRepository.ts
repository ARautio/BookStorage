import { promises as fs} from 'fs'
import EPub from 'epub2';

export class EPubRepository {
  settings
  Book

  constructor(settings: any, Book: any){
    this.settings = settings
    this.Book = Book
  }

  async getBooks(){
    //@TODO: Ability to read all directory levels
    const files = await fs.readdir(this.settings.bookPath)
    const books = files.map(async file => 
        this.getBookMeta(`${this.settings.bookPath}/${file}`, file)
    );
    return Promise.all(books)
  }

  async getBookMeta(filename: string, file: string){
    //@TODO: Read other file types than epub
    var epub = await EPub.createAsync(filename);
    return new this.Book({ filename: file, ...epub.metadata })
  }


}