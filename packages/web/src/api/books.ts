import { get } from "./utils/fetch";

/**
 * Returns list of books
 */
export const getBooks = async () => {
  return get("/books");
};

export const importBooks = async () => {
  return get("/books/import");
};
