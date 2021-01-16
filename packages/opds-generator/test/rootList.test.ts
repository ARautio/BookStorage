import * as rootList from '../src/rootList';

describe('rootList', () => {
  describe('rootEntry', () => {
    it('works', () => {
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
