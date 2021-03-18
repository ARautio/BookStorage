import sqlite3 from "sqlite3";
import { default as Settings } from "../models/settings";
import { getSingleFromDB, runFromDB } from "../utils";

const bookPath = process.env.BOOK_PATH || "../../books";

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
        coverPath TEXT
      );
    `
    );
  }

  async getSettings(): Promise<Settings> {
    // @ TODO Combine database and docker settings
    const settings: any =
      (await getSingleFromDB(this.db, "SELECT * FROM settings")) || {};
    const wizard = settings.id === undefined;
    return new Settings({ bookPath, wizard, ...settings });
  }

  async saveSettings(settings: Settings) {}
}
