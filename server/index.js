import express from 'express';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const db = new Database(join(__dirname, 'carbon_dating.db'));

app.use(express.json());

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS samples (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    carbon_14_ratio REAL NOT NULL,
    estimated_age INTEGER,
    location TEXT,
    date_analyzed DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// API Routes
app.get('/api/samples', (req, res) => {
  const samples = db.prepare('SELECT * FROM samples ORDER BY date_analyzed DESC').all();
  res.json(samples);
});

app.post('/api/analyze', (req, res) => {
  const { name, description, carbon_14_ratio, location } = req.body;
  
  // Simple age calculation (for demonstration)
  const estimated_age = Math.round(-8033 * Math.log(carbon_14_ratio / 1));
  
  const stmt = db.prepare(`
    INSERT INTO samples (name, description, carbon_14_ratio, estimated_age, location)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(name, description, carbon_14_ratio, estimated_age, location);
  res.json({ id: result.lastInsertRowid, estimated_age });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});