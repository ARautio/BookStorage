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
  app.get(getOPDSPath("/"), (req, res) => {
    res.set("Content-Type", "text/xml");
    res.send(opdsGen.root.root({ baseDir: "/opds", updated: new Date() }));
  });

  app.get(getOPDSPath("/*"), (req, res) => {
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
