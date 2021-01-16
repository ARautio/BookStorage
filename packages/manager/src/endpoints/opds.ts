import * as opdsGen from "opds-generator";
import express from "express";
import * as ws from "ws";

import { getPath } from "../utils";

interface DataConnection {
  app: express.Application;
  wss: ws.Server;
}

const PATH = "/opds";

export const opds = ({ app }: DataConnection) => {
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
            title: "Latest additions",
            type: "XXX",
            updated: new Date(),
            description: "The latest added books",
            link: getOPDSPath("/latest.xml"),
          },
        ],
      })
    );
  });

  /** Latest additions */
  app.get(getOPDSPath("/latest.xml"), (req, res) => {
    res.set("Content-Type", "text/xml");
    res.send(
      opdsGen.book.root({
        baseUrl: "/opds",
        type: "SOMETHING",
        kind: "SOMETHING",
        title: "Latest additions",
        updated: new Date(),
        books: [
          {
            title: "Book",
            uuid: "",
            authors: [],
            updated: new Date(),
            isbn: "",
            language: "",
            issued: new Date(),
            coverfilename: "",
            coverFilename: "",
            description: new Date(),
            files: [
              {
                filename: "/assets/books/book.epub",
                filetype: "application/epub+zip",
              },
            ],
            publisher: "",
            settings: {
              coverPath: "",
              filePath: "",
            },
          },
        ],
      })
    );
  });
  app.get(getOPDSPath("/*"), (req, res) => {
    console.log(req);
    res.set("Content-Type", "text/xml");
    res.send(
      opdsGen.book.root({
        baseUrl: "/opds",
        type: "SOMETHING",
        kind: "SOMETHING",
        title: "Popular",
        updated: new Date(),
        books: [],
      })
    );
  });
};
