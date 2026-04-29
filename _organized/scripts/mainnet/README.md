# 🚀 Mainnet Scripts - Despliegue y Configuración

Estos scripts están configurados para **Mainnet** (requieren RPC_URL env var).

## Scripts Críticos
- `mainnet_handover.ts` — Transferencia de propiedad del multisig (CRÍTICO)
- `upload_metadata.ts` — Sube metadata a IPFS/Irys para mainnet
- `update_xls_metadata.ts` — Actualiza metadata de XLS en mainnet
- `wallet_registry.ts` — Registra wallets de vault en mainnet
- `generate_metadata_base64.ts` — Genera metadata en base64

## Red Configurada
```
RPC: https://api.mainnet-beta.solana.com (default)
Network: mainnet
Nota: Requiere variable de entorno RPC_URL
```

## ⚠️ IMPORTANTE
Estos scripts modifican el estado en **MAINNET**. Úsalos solo si:
1. Tienes autorización del multisig
2. Has verificado la configuración
3. Entiendes las implicaciones
