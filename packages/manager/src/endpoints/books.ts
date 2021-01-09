import express from "express";
import { getPath } from "../utils";

const PATH = "/books";

export const books = (
  app: express.Application,
  bookRepository: any,
  ePubRepository: any,
  settingsRepository: any
) => {
  const getBookPath = getPath(PATH);

  app.get(getBookPath("/"), async (req, res) => {
    res.send(await bookRepository.getBooks());
  });

  app.get(getBookPath("/import"), async (req, res) => {
    //@TODO: Error handling
    const settings = await settingsRepository.getSettings();
    const books = await ePubRepository.getBooks(settings.bookPath);
    await bookRepository.addBooks(books);
    res.sendStatus(200);
  });
};
