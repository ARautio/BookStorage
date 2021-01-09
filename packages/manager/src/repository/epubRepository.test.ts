const { EPubRepository } = require("./epubRepository");
const { default: BookModel } = require("../models/book");

describe("EPub Repository", () => {
  const epubRepository = new EPubRepository(BookModel);

  describe("getBooks", () => {
    test("test that ", async () => {
      const books = await epubRepository.getBooks("./__tests__/fixtures/");
      expect(books.length).toEqual(1);
    });
  });
});
