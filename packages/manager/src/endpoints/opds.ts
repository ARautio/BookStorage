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
  app.get(getOPDSPath("/"), (req, res) => {});
};
