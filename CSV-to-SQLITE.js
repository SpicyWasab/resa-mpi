import fs from 'fs';
import readline from 'readline';
import Database from 'better-sqlite3';

const db = new Database('books-by-isbn.db');
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS books (
        isbn INTEGER PRIMARY KEY,
        title TEXT,
        url TEXT,
        editor TEXT,
        format TEXT,
        pages INTEGER
);
`);

async function processLineByLine() {
  const fileStream = fs.createReadStream('open4goods-isbn-dataset.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let i = 0;
  let progress = '';
  for await (const line of rl) {
    i++;

    // Each line in input.txt will be successively available here as `line`.
    const data = line.replaceAll('"', '').split(',');
    const isbn = data[0];
    const title = data[1];
    const url = data[7];
    const editeur = data[8];
    const format = data[9];
    const nb_page = data[10];

    // console.log(isbn, title, url, editeur, format, nb_page);

    const stmt = db.prepare("INSERT INTO books VALUES (?, ?, ?, ?, ?, ?)");
    
    if(stmt.run(parseInt(isbn), title, url, editeur, format, parseInt(nb_page)).changes != 1) console.log(`Ligne ${i}, isbn ${isbn}`);

    const newProgress = i/7562122 * 100;
    if(newProgress != progress) {
      progress = newProgress;
      process.stdout.write(`\r${progress.toFixed(2)}%`);
    }
  }
  console.log("Done.");
  
}

processLineByLine();