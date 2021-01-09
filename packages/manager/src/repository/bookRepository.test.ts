const sqlite = require("sqlite3");
const { BookRepository } = require("./bookRepository");
const { default: Book } = require("../models/book");

describe("Book Repository", () => {
  const db = new sqlite.Database(":memory:");
  const bookRepository = new BookRepository(db);

  beforeAll(async () => {
    await bookRepository.initiate();
  });

  describe("addBooks", () => {
    test("test that new titles will be added", async () => {
      const books = [
        new Book({
          filename: "TEST 1",
          title: "Test TITLE",
          creator: "Test Creator",
        }),
        new Book({
          filename: "TEST 2",
          title: "Test TITLE",
          creator: "Test Creator",
        }),
      ];
      await bookRepository.addBooks(books);
      const bookList = await bookRepository.getBooks();
      expect(bookList.length).toEqual(2);
    });
  });
});
