import express from "express";
import * as ws from "ws";
import { getPath } from "../utils";

import Book from "../models/book";
import { BookRepository } from "../repository/bookRepository";
import { EPubRepository } from "../repository/epubRepository";
import { SettingsRepository } from "../repository/settingsRepository";

const PATH = "/books";

interface DataConnection {
  app: express.Application;
  wss: ws.Server;
}

interface Callback {
  index: number;
  filename: string;
  total: number;
}

export const books = (
  { app, wss }: DataConnection,
  bookRepository: BookRepository,
  ePubRepository: EPubRepository,
  settingsRepository: SettingsRepository
) => {
  const getBookPath = getPath(PATH);

  /**
   * Get All books
   */
  app.get(getBookPath("/"), async (req, res) => {
    res.send(await bookRepository.getBooks());
  });

  /**
   * Import books from the paht
   */
  app.get(getBookPath("/import"), async (req, res) => {
    const callback = ({ filename, index, total }: Callback) => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({
              action: "BOOK_IMPORT",
              data: { filename, index, total },
            })
          );
        }
      });
    };

    const settings = await settingsRepository.getSettings();

    try {
      const books: Promise<Book>[] = await ePubRepository.getBooks(
        settings.bookPath
      );
      const bookSize = books.length;
      Promise.all(
        books.map(async (book: Promise<Book>, index: number) => {
          try {
            const bookData = await book;
            await bookRepository.addBook(bookData);
            callback({
              filename: bookData.filename,
              index: index + 1,
              total: bookSize,
            });
          } catch (e) {
            // TODO: Handle filename from the error
            wss.clients.forEach(function each(client) {
              if (client.readyState === 1) {
                client.send(
                  JSON.stringify({
                    action: "BOOK_IMPORT_ERROR",
                    data: {
                      index: index + 1,
                      total: bookSize,
                    },
                  })
                );
              }
            });
          }
        })
      );
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};
