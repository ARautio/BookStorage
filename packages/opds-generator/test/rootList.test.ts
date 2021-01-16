import * as rootList from '../src/rootList';
import xmlParser from 'fast-xml-parser';

describe('rootList', () => {
  describe('root', () => {
    it('should form valid xml', () => {
      expect(
        xmlParser.validate(
          rootList.root({
            baseDir: '/',
            updated: new Date('2020-01-01'),
            options: [
              {
                title: 'Popular',
                type: 'entry',
                link: '/books',
                updated: new Date('2020-01-02'),
                description: 'Popular books',
              },
            ],
          })
        )
      ).toEqual(true);
    });

    it('should generate base item', () => {
      expect(
        rootList.root({
          baseDir: '/',
          updated: new Date('2020-01-01'),
          options: [
            {
              title: 'Popular',
              type: 'entry',
              link: '/books',
              updated: new Date('2020-01-02'),
              description: 'Popular books',
            },
          ],
        })
      ).toMatchSnapshot();
    });
  });
  describe('rootEntry', () => {
    it('should generate an entry', () => {
      expect(
        rootList.rootEntry({
          title: 'Test Book',
          type: 'entry',
          link: '/books',
          updated: new Date('2020-01-01'),
          description: 'Trest',
        })
      ).toMatchSnapshot();
    });
  });
});
