const { EPubRepository } = require("./epubRepository");
const { default: BookModel } = require("../models/book");
const { default: BookFileModel } = require("../models/bookfile");

describe("EPub Repository", () => {
  const epubRepository = new EPubRepository(BookModel, BookFileModel);

  describe("getBooks", () => {
    test("test that ", async () => {
      const books = await epubRepository.getBooks("./__tests__/fixtures/");
      const resolvedBooks: any[] = await Promise.all(
        books.map(async (book: any) => await book)
      );
      expect(resolvedBooks.length).toEqual(1);
      expect(resolvedBooks[0].filename).not.toEqual(undefined);
    });
  });
});
