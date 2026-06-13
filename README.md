# solana-reliability-sdk

TypeScript SDK for improved RPC failover and transaction reliability on Solana.

## Features
- Pre-flight simulation before submitting
- Automatic RPC endpoint failover
- Dynamic priority fee injection

## Quick Start
```typescript
import { ReliabilityConnection } from './src';

const conn = new ReliabilityConnection([
  'https://api.mainnet-beta.solana.com',
  'https://solana-api.projectserum.com',
]);

const sig = await conn.sendSmartTransaction(tx, [signer]);
```

## Payout address (USDC, Solana)
`7gJJQjtmULo2561oDByFvDgsEAMgp1PZBxVP6neXYBmK`
