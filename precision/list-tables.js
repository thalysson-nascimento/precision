const Database = require('better-sqlite3');
try {
  const db = new Database('./prisma/dev.db');
  const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table';").all();
  console.log("Tables in database:", tables);
  for (const table of ['Company', 'JobRole', 'Employee', 'Team', '_Migration']) {
    try {
      const info = db.prepare(`PRAGMA table_info(${table});`).all();
      console.log(`Table structure for ${table}:`, info);
      const count = db.prepare(`SELECT COUNT(*) as count FROM ${table};`).get();
      console.log(`Table count for ${table}:`, count);
    } catch (e) {
      console.log(`Failed to inspect ${table}:`, e.message);
    }
  }
} catch (err) {
  console.error("Error reading database:", err);
}
