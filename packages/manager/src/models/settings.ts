import { timeStamp } from "console";

interface Settings {
  bookPath: string;
  coverPath: string;
  wizard: boolean;
}

class Settings {
  bookPath;
  coverPath;

  constructor({ bookPath, coverPath, wizard }: Settings) {
    this.bookPath = bookPath;
    this.coverPath = coverPath;
    this.wizard = wizard;
  }
}

export default Settings;
