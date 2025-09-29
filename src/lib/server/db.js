import Database from "better-sqlite3";

const skip_db_access = process.env.SKIP_DB_ACCESS == "true";

let dbValue = {  };
let isbnDbValue = { };
if(!skip_db_access) {
    dbValue = new Database('databases/DATABASE.db', {
        fileMustExist: true
    });
    dbValue.pragma('journal_mode = WAL');
    console.log('Database initialized !');

    isbnDbValue = new Database('databases/books-by-isbn.db', {
        fileMustExist: true
    });
    isbnDbValue.pragma('journal_mode = WAL');
    console.log('ISBN database initialized !');
}

export const db = dbValue;
export const isbnDb = isbnDbValue;
