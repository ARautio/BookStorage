import express from "express";
import { book } from "opds-generator";
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
        if (client.readyState === WebSocket.OPEN) {
          client.send({
            action: "BOOK_IMPORT",
            data: { filename, index, total },
          });
        }
      });
    };
    const books = await ePubRepository.getBooks(settings.bookPath, callback);

    await Promise.all(
      books.map(async (book: any) => {
        await bookRepository.addBook(book);
      })
    );

    res.sendStatus(200);
  });
};
