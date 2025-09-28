import Database from "better-sqlite3";

export const db = new Database('DATABASE.db', {
    fileMustExist: true
});
db.pragma('journal_mode = WAL');
console.log('Database initialized !');

export const isbnDb = new Database('books-by-isbn.db', {
    fileMustExist: true
});
isbnDb.pragma('journal_mode = WAL');
console.log('ISBN database initialized !');