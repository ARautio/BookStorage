import EPub from '../src/index';

const BOOK_FILE = './test/fixtures/pg2097-images.epub';

describe('epub', () => {
  describe('loadEpub', () => {
    it('should be able to load', async () => {
      const epub = new EPub(BOOK_FILE);
      await epub.load();
      expect(epub.metadata).toMatchSnapshot();
    });
  });
  describe('get cover', () => {
    it('should be able to load', async () => {
      const epub = new EPub(BOOK_FILE);
      await epub.load();
      const cover = await epub.getCover();
      expect(Buffer.isBuffer(cover.file)).toEqual(true);
    });
  });
});
