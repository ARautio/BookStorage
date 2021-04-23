import EPub from '../src/index';

const BOOK_FILE = './test/__fixtures__/pg2097-images.epub';

describe('epub', () => {
  describe('loadEpub', () => {
    it('should be able to load', async () => {
      const epub = new EPub(BOOK_FILE);
      await epub.load();
      console.log(epub.metadata);
    });
  });
  describe('get cover', () => {
    it('should be able to load', async () => {
      const epub = new EPub(BOOK_FILE);
      await epub.load();
      console.log(await epub.getCover());
    });
  });
});
