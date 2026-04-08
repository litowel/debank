# DeFi SuperApp Project Phases

## Phase 1: Architecture
- **Frontend:** React 19, React Router, Tailwind CSS, Lucide Icons. Mobile-first, dark mode UI.
- **Backend:** Node.js with Express, serving as an API and Vite middleware for development.
- **Database:** SQLite (using \`better-sqlite3\`) for local development, easily migratable to PostgreSQL for production.
- **Web3 Layer:** thirdweb SDK (v5) for wallet connection, smart accounts, and contract interactions.
- **State Management:** React hooks and thirdweb hooks.

## Phase 2: Database Schema
The database uses the following core tables:
- \`users\`: Stores user profiles and wallet addresses.
- \`loans\`: Tracks loan applications, amounts, collateral NFT IDs, status, interest rates, and duration.
- \`transactions\`: Logs all platform activity (deposits, withdrawals, swaps, loan disbursements, repayments).
- \`donation_links\`: Stores user-generated donation campaigns and payment links.

## Phase 3: UI Pages
The application includes the following modular pages:
- **Dashboard:** Overview of balances, active loans, and recent activity.
- **Payments:** Interface for sending/receiving crypto, creating payment links, and invoices.
- **Swaps:** DEX interface for token exchange.
- **Donations:** Campaign management and shareable donation links.
- **Funding:** Instant funding eligibility checker and loan offers.
- **NFT Lending:** Interface to view eligible NFTs, lock collateral, and receive loan offers.
- **Admin:** Dashboard for risk review, user management, and system status.
- **Terms:** Compliance pages, risk warnings, and partner liquidity disclosures.

## Phase 4: API Routes
The Express backend exposes the following REST API endpoints:
- \`GET /api/health\`: System health check.
- \`POST /api/users/auth\`: Authenticate or create a user based on wallet address.
- \`GET /api/users/:walletAddress/dashboard\`: Fetch user dashboard data (loans, transactions, balances).
- \`POST /api/loans/apply\`: Submit a new loan application.
- \`GET /api/funding/offers\`: Retrieve available funding offers based on eligibility.

## Phase 5: Smart Contract Structure
The platform relies on modular smart contracts (to be deployed via thirdweb):
- **User Vault Contract:** Manages user deposits and balances.
- **Lending Pool Contract:** Holds liquidity from partner lenders and handles disbursements.
- **NFT Collateral Contract:** Escrows NFTs used as collateral and manages lock/unlock states.
- **Repayment Contract:** Processes loan repayments and calculates interest.
- **Liquidation Contract:** Monitors floor prices and triggers liquidations if LTV thresholds are breached.
- **Fee Collection Contract:** Routes platform service fees and processing fees to the protocol treasury.

## Phase 6: Web3 Integration
- **Wallet Connection:** Integrated \`thirdweb/react\` \`ConnectButton\` for seamless onboarding.
- **Smart Accounts:** Configurable via thirdweb to support gasless transactions and account abstraction.
- **Contract Interactions:** Use thirdweb's \`useReadContract\` and \`useWriteContract\` hooks to interact with the modular smart contracts.

## Phase 7: Testing and Deployment
- **Testing:** Unit tests for API routes, integration tests for smart contracts using Hardhat/Foundry, and E2E tests for the frontend using Playwright.
- **Deployment:** 
  - Frontend & Backend: Deployable as a unified container to Google Cloud Run or Vercel (frontend) + Render (backend).
  - Database: Migrate SQLite to managed PostgreSQL (e.g., Supabase or AWS RDS).
  - Smart Contracts: Deploy to target EVM chains (Ethereum, Base, Arbitrum) using thirdweb deploy.
