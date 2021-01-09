const { EPubRepository } = require("./epubRepository");
const { default: BookModel } = require("../models/book");

describe("EPub Repository", () => {
  const epubRepository = new EPubRepository(
    {
      bookPath: "./__tests__/fixtures/",
    },
    BookModel
  );

  describe("getBooks", () => {
    test("test that ", async () => {
      const books = await epubRepository.getBooks();
      expect(books.length).toEqual(1);
    });
  });
});
