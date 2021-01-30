import EPub from "epub2";
import { promises as fs } from "fs";

class BookFile {
  filename: string;
  epub: any;

  constructor(filename: string) {
    this.filename = filename;
  }

  async loadBook() {
    // @TODO: Handle book by booktype
    this.epub = await EPub.createAsync(this.filename);
  }

  getBook() {
    return this.epub.metadata;
  }

  async saveCover() {
    // @TODO: Error handling reporting
    if (this.epub.metadata.cover !== undefined) {
      const imageFilename = await new Promise((resolve, reject) => {
        this.epub.getImage(
          this.epub.metadata.cover,
          async (error: any, img: any, mimetype: any) => {
            const imageFilename =
              this.epub.metadata.cover
                .replace(/[^a-z0-9]/gi, "_")
                .toLowerCase() + ".jpg";
            await fs.writeFile(`../../covers/${imageFilename}`, img);
            resolve(imageFilename);
          }
        );
      });
      return imageFilename;
    }
    return undefined;
  }
}

export default BookFile;
