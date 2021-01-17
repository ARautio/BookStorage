import * as opdsGen from "opds-generator";
import express from "express";
import * as ws from "ws";

import { getPath } from "../utils";
import { BookRepository } from "../repository/bookRepository";
import Book from "../models/book";

interface DataConnection {
  app: express.Application;
  wss: ws.Server;
}

const PATH = "/opds";

export const opds = (
  { app }: DataConnection,
  bookRepository: BookRepository
) => {
  const getOPDSPath = getPath(PATH);
  /** Root */
  app.get(getOPDSPath("/"), (req, res) => {
    res.set("Content-Type", "text/xml");
    res.send(
      opdsGen.root.root({
        baseDir: "/opds",
        updated: new Date(),
        options: [
          {
            id: "latest",
            title: "Latest additions",
            type: "XXX",
            updated: new Date(),
            description: "The latest added books",
            link: getOPDSPath("/latest.xml"),
          },
        ],
        settings: {
          name: "BookStorage",
          bookPath: "/",
          coverPath: "/",
        },
      })
    );
  });

  /** Latest additions */
  app.get(getOPDSPath("/latest.xml"), async (req, res) => {
    const latestBooks: any = await bookRepository.getBooks({ limit: 20 });
    res.set("Content-Type", "text/xml");
    console.log(latestBooks);
    res.send(
      opdsGen.book.root({
        id: "latest",
        baseUrl: "/opds",
        url: "latest",
        title: "Latest additions",
        updated: new Date(),
        books: latestBooks.map((book: Book) => ({
          title: book.title,
          uuid: book.ISBN,
          authors: [
            {
              name: book.creator,
            },
          ],
          updated: new Date(),
          coverFilename: book.coverFilename,
          description: book.description,
          files: [
            {
              filename: book.filename,
              filetype: "application/epub+zip",
            },
          ],
          settings: {
            name: "BookStorage",
            coverPath: "/assets/covers",
            bookPath: "/assets/books",
          },
        })),
      })
    );
  });
};
