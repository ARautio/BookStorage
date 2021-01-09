import sqlite3 from "sqlite3";
import { default as Settings } from "../models/settings";
import { getSingleFromDB, runFromDB } from "../utils";

export class SettingsRepository {
  db;
  constructor(db: sqlite3.Database) {
    this.db = db;
  }

  async initiate() {
    await runFromDB(
      this.db,
      `
      CREATE TABLE IF NOT EXISTS settings (
        id INTEGER,
        bookPath TEXT
      );
    `
    );
  }

  async getSettings(): Promise<Settings> {
    const settings: any =
      (await getSingleFromDB(this.db, "SELECT * FROM settings")) || {};
    return new Settings({ bookPath: "../../books", ...settings });
  }

  async saveSettings(settings: Settings) {}
}
