import fs from 'fs';
import EPub from '../src/index';

const BOOK_DIR = './test/fixtures';

describe('epub', () => {
  const files = fs.readdirSync(BOOK_DIR).filter(item => item.includes('.epub'));

  describe('loadEpub', () => {
    test.each(files)('File %s can be loaded', async file => {
      const epub = new EPub(`${BOOK_DIR}/${file}`);
      await epub.load();
      expect(epub.metadata).toMatchSnapshot();
    });
  });
  describe('get cover', () => {
    test.each(files)('File %s can read the cover', async file => {
      const epub = new EPub(`${BOOK_DIR}/${file}`);
      await epub.load();
      const cover = await epub.getCover();
      expect(Buffer.isBuffer(cover.file)).toEqual(true);
    });
  });
});
