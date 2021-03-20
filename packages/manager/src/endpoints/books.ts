import express from "express";
import * as ws from "ws";
import { getPath } from "../utils";

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

    const callback = ({ filename, index, total }: Callback) => {
      wss.clients.forEach(function each(client) {
        if (client.readyState === 1) {
          client.send(
            JSON.stringify({ action: "BOOK_IMPORT", data: { filename } })
          );
        }
      });
    };
    try {
      const books = await ePubRepository.getBooks(settings.bookPath, callback);
      Promise.all(
        books.map(async (book: any) => {
          try {
            await bookRepository.addBook(await book);
          } catch (e) {
            // TODO: Handle filename from the error
            wss.clients.forEach(function each(client) {
              if (client.readyState === 1) {
                client.send(
                  JSON.stringify({
                    action: "BOOK_IMPORT_ERROR",
                    data: {},
                  })
                );
              }
            });
          }
          //
        })
      );
      res.sendStatus(200);
    } catch (e) {
      console.log(e);
      res.sendStatus(500);
    }
  });
};
