import sqlite3 from 'sqlite3'

export const getPath = (basePath: string) => (path: string): string =>`${basePath}${path}`


export const getFromDB = (db: sqlite3.Database, query: string) => {
  return new Promise( (resolve, reject) => {
    db.all(query, (error, rows) => {
      if (error)
        reject(error);
      else
        resolve(rows);
    });
  });
}