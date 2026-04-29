# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Luxor / Excelsior** is a modular sovereignty protocol on the Solana blockchain. The repository contains three independent modules: **LXR** (utility token, active), **XLS** (RWA governance token, locked until DAO activation), and **USDX** (stablecoin, locked until reserve conditions met).

## Repository Structure

| Directory | Purpose |
|-----------|---------|
| `smart-contracts/` | Anchor (Rust) on-chain program — the core protocol |
| `admin-dashboard/` | Next.js internal management UI with wallet/protocol controls |
| `landing-page/` | Public-facing Next.js website with i18n (8 locales) |
| `pos-integrations/` | Point-of-sale merchant integration tools |

## Commands

### Admin Dashboard (`admin-dashboard/`)
```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run lint      # ESLint check
```

### Landing Page (`landing-page/`)
```bash
npm run dev       # Start dev server
npm run build     # Production build + generates sitemap (postbuild)
npm run lint      # ESLint check
```

### Smart Contracts (`smart-contracts/`)
```bash
anchor build                              # Compile the Rust program
anchor test                               # Run the full test suite (localnet)
anchor deploy --provider.cluster devnet  # Deploy to devnet
npx ts-node scripts/create_tokens.ts     # Create SPL tokens (or: anchor run create-tokens)
npx ts-node scripts/init_distribution.ts # Initialize token distribution
```

Individual test files:
```bash
npx ts-mocha tests/excelsior.ts          # Main protocol tests
npx ts-mocha tests/access_control.ts    # Access control tests
npx ts-mocha tests/e2e_flow.ts          # End-to-end flow tests
```

## Smart Contract Architecture

The single Anchor program (`programs/excelsior/`) is deployed at `9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv` (devnet and mainnet). It handles all three token modules.

**Key instruction groups** (`src/instructions/`):
- `init_ix.rs` — Protocol initialization
- `swap.rs` — `buy_xls` / `redeem_xls` (LXR ↔ XLS)
- `stake.rs` — XLS staking/unstaking
- `fees.rs` — Fee harvesting and distribution (Fee Collector → XLS Vault 30% / USDX Reserve 30% / Founder 40%)
- `distribution.rs` — Rent income distribution across 12 RWA vaults
- `vesting.rs` — Linear vesting with cliff and optional TGE percentage
- `withdrawals.rs` — Timelock-gated withdrawals with daily limits
- `access_control.rs` — Operator roles + emergency pause
- `config_management.rs` — Oracle config (Pyth primary, Chainlink fallback), module feature flags
- `inflation.rs` — Periodic inflation emission and manual burn
- `usdx_ops.rs` — USDX mint/redeem (locked until reserve conditions met)

**State accounts** (`src/state/`): `config.rs`, `user_account.rs`, `vesting.rs`, `security.rs`, `access_control.rs`

**Toolchain**: Anchor `0.32.1`, Solana `3.0.10` (set in `Anchor.toml`). Wallet for scripts: `wallets/admin.json`.

## Admin Dashboard Architecture

- **Framework**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, shadcn/ui
- **Auth**: NextAuth v5 with credentials provider — credentials come from `ADMIN_USERNAME` / `ADMIN_PASSWORD` env vars
- **Solana integration**: `@coral-xyz/anchor` + `@solana/wallet-adapter-react`. The IDL is at `lib/idl.json`; wallet registry (all protocol vault addresses) is at `lib/wallet-addresses.json`
- **Multi-environment**: `lib/environments.ts` defines `devnet` / `mainnet` / `testnet` configs with program IDs, mint addresses, and multisig addresses. Default is `devnet`
- **Route groups**: `(auth)/login` for sign-in; `(dashboard)/` for protected pages; `(dashboard)/modules/[id]` for per-module views

## Landing Page Architecture

- **Framework**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4
- **i18n**: `next-intl` with 8 locales (en, es, fr, pt, de, zh, ja, ru) — translation files in `messages/`. The `[locale]` dynamic segment wraps all routes; middleware in `middleware.ts` handles routing
- **Backend**: Firebase (Firestore for data, Analytics for tracking) — initialized in `lib/firebase.ts` and `lib/firebase-admin.ts`
- **Key components**: `Hero.tsx`, `LiveStats.tsx`, `TokenomicsChart.tsx`, `IconMarquee.tsx` at the root of `components/`

## Protocol Key Addresses

- **Program ID (devnet/mainnet)**: `9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv`
- **Genesis Squad (initial supply holder)**: `HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe`
- **Fee Collector**: `DdWG5ooDR84VfkM7nK5yTx9FnWNMQWk7NzTsTYQzBZmU`
- **Multisig threshold**: 4-of-6 signers required for high-risk operations (emergency pause, liquidity migration, vault fund movements)

For all vault addresses, see `admin-dashboard/lib/wallet-addresses.json`.

## Important Notes

- The **XLS module** is constitutionally locked and inactive — its activation requires a DAO vote + multisig ratification. Do not add code that bypasses this.
- The **USDX module** mint is gated behind reserve/audit conditions (`usdx_ops.rs`).
- Any movement of non-personal-wallet funds requires a 48-hour public announcement per the whitepaper.
- Mainnet program IDs and mint addresses in `environments.ts` have `// TODO: Update for Mainnet` markers and currently use devnet values.
