import fs from 'fs';
import readline from 'readline';
import Database from 'better-sqlite3';

const db = new Database('DATABASE.db');
db.pragma('journal_mode = WAL');

db.exec(`
CREATE TABLE IF NOT EXISTS students (
        card_id INTEGER PRIMARY KEY,
        firstname TEXT,
        lastname TEXT
);
`);

async function processLineByLine() {
  const fileStream = fs.createReadStream('liste-MPI.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  let i = 0;
  let progress = 0;
  for await (const line of rl) {
    i++;

    // Each line in input.txt will be successively available here as `line`.
    const data = line.split(', ');
    const id = data[0];
    const lastname = data[1];
    const firstname = data[2];

    console.log(lastname);

    const stmt = db.prepare("INSERT INTO students VALUES (?, ?, ?)");
    
    if(stmt.run(parseInt(id), firstname, lastname).changes != 1) console.log(`Ligne ${i}, id ${id}`);

    const newProgress = i/23 * 100;
    if(newProgress != progress) {
      progress = newProgress;
      process.stdout.write(`\r${progress.toFixed(2)}%`);
    }
  }
  console.log("Done.");
  
}

processLineByLine();