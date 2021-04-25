import EPub from "epub-meta";
import { promises as fs } from "fs";

const COVER_PATH = process.env.COVER_PATH || "../../covers";

export type BookFileConstructor = new (filename: string) => BookFile;

class BookFile extends EPub {
  async saveCover() {
    // @TODO: Error handling reporting
    if (this.cover !== undefined && this.metadata?.title !== undefined) {
      const coverFile = await this.getCover();
      if (coverFile.file !== undefined) {
        const imageFilename =
          this.metadata.title.replace(/[^a-z0-9]/gi, "_").toLowerCase() +
          ".jpg";
        await fs.writeFile(`${COVER_PATH}/${imageFilename}`, coverFile.file);
        return imageFilename;
      }
    }
    return undefined;
  }
}

export default BookFile;
