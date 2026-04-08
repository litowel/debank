import express from 'express';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import Database from 'better-sqlite3';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize SQLite database
const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}
const db = new Database(path.join(dbDir, 'defi.db'));

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    wallet_address TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS loans (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    amount REAL NOT NULL,
    collateral_nft_id TEXT,
    status TEXT NOT NULL, -- 'pending', 'active', 'repaid', 'liquidated'
    interest_rate REAL NOT NULL,
    duration_days INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );

  CREATE TABLE IF NOT EXISTS transactions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    type TEXT NOT NULL, -- 'deposit', 'withdrawal', 'swap', 'loan_disbursement', 'repayment'
    amount REAL NOT NULL,
    token TEXT NOT NULL,
    status TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
  
  CREATE TABLE IF NOT EXISTS donation_links (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_amount REAL,
    raised_amount REAL DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- API Routes ---

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  // Get user profile or create if not exists
  app.post('/api/users/auth', (req, res) => {
    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address required' });
    }

    let user = db.prepare('SELECT * FROM users WHERE wallet_address = ?').get(walletAddress);
    if (!user) {
      const id = crypto.randomUUID();
      db.prepare('INSERT INTO users (id, wallet_address) VALUES (?, ?)').run(id, walletAddress);
      user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    }
    res.json(user);
  });

  // Get user dashboard data
  app.get('/api/users/:walletAddress/dashboard', (req, res) => {
    const { walletAddress } = req.params;
    const user = db.prepare('SELECT * FROM users WHERE wallet_address = ?').get(walletAddress);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const loans = db.prepare('SELECT * FROM loans WHERE user_id = ? ORDER BY created_at DESC LIMIT 5').all(user.id);
    const transactions = db.prepare('SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 10').all(user.id);
    const donationLinks = db.prepare('SELECT * FROM donation_links WHERE user_id = ?').all(user.id);

    res.json({
      user,
      loans,
      transactions,
      donationLinks,
      balances: {
        USDC: 15420.50,
        ETH: 2.4,
      } // Mock balances for now
    });
  });

  // Create a loan application
  app.post('/api/loans/apply', (req, res) => {
    const { walletAddress, amount, collateralNftId, durationDays } = req.body;
    const user = db.prepare('SELECT * FROM users WHERE wallet_address = ?').get(walletAddress);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const id = crypto.randomUUID();
    const interestRate = 5.5; // Fixed for prototype
    
    db.prepare(\`
      INSERT INTO loans (id, user_id, amount, collateral_nft_id, status, interest_rate, duration_days)
      VALUES (?, ?, ?, ?, 'pending', ?, ?)
    \`).run(id, user.id, amount, collateralNftId, interestRate, durationDays);

    res.json({ success: true, loanId: id });
  });

  // Get funding offers (mock)
  app.get('/api/funding/offers', (req, res) => {
    res.json([
      { id: 'offer_1', maxAmount: 50000, interestRate: 4.5, durationDays: 30, type: 'nft_collateral' },
      { id: 'offer_2', maxAmount: 10000, interestRate: 8.0, durationDays: 90, type: 'unsecured_credit' }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(\`Server running on http://localhost:\${PORT}\`);
  });
}

startServer();
