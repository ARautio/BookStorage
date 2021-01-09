interface Settings {
  bookPath: string;
}

class Settings {
  bookPath;
  constructor({ bookPath }: Settings) {
    this.bookPath = bookPath;
  }
}

export default Settings;
