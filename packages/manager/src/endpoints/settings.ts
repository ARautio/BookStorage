import express from "express";
import * as ws from "ws";
import { getPath } from "../utils";

const PATH = "/settings";

interface DataConnection {
  app: express.Application;
  wss: ws.Server;
}

export const settings = (
  { app, wss }: DataConnection,
  settingsRepository: any
) => {
  const getSettingsPath = getPath(PATH);

  app.get(getSettingsPath("/"), async (req, res) => {
    res.send(await settingsRepository.getSettings());
  });
};
