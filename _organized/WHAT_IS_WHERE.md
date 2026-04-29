# 📍 ¿QUÉ ESTÁ DONDE? - Guía Rápida de Ubicación

**Referencia rápida:** Qué está en mainnet, qué en devnet, y dónde encontrarlo.

---

## 🔍 BÚSQUEDA RÁPIDA

| Necesitas Saber | Busca Aquí |
|-----------------|-----------|
| Qué es Luxor | `00_START_HERE.md` → `QUICK_START.md` |
| Mainnet vs Devnet | `MAINNET_vs_DEVNET_COMPARISON.md` ⭐ |
| Qué está en mainnet | `VERIFIED_MAINNET_STATE.md` |
| Cómo auditar devnet | `scripts/devnet/README.md` |
| Cómo completar multisig | `scripts/mainnet/README.md` |
| Comandos técnicos | `docs/CLAUDE.md` |
| Tokenomics | `docs/Whitepaper.md` |
| Smart contracts | `programs/excelsior/src/` |

---

## 📊 TABLA VISUAL: QUÉ ESTÁ DONDE

### Componente: Smart Contract "Excelsior"

```
┌─────────────────────────────────────────────────────────────┐
│ EXCELSIOR SMART CONTRACT (Anchor Program)                   │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ✅ ACTIVO            │ ✅ ACTIVO                            │
│ Program ID:          │ Program ID:                          │
│ 9d7SeR8Njzh32piG1... │ 9d7SeR8Njzh32piG1... (MISMO)        │
│                      │                                      │
│ Slot: 443,514,912    │ Slot: 401,608,950                   │
│ Balance: 4.73 SOL    │ Balance: 4.73 SOL                   │
│ Authority:           │ Authority:                          │
│ HQ8eEKM88MWZ45sKa... │ HQ8eEKM88MWZ45sKa... (MISMO)        │
│                      │                                      │
│ Status: TEST/DEV     │ Status: PRODUCCIÓN (SIN MULTISIG)   │
│                      │ ⚠️  INCOMPLETO - Falta handover     │
└──────────────────────┴──────────────────────────────────────┘
```

---

### Componente: Token LXR (Utility)

```
┌─────────────────────────────────────────────────────────────┐
│ TOKEN LXR (Utility) - 2,025,000,000 suministro total        │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ✅ CONFIRMADO        │ ✅ PROBABLE (No verificado)          │
│ Mint Address:        │ Mint Address:                        │
│ 7Qm6qUCXGZfGBYYF... │ 7Qm6qUCXGZfGBYYF... (MISMO ID)       │
│                      │                                      │
│ Owner: TokenzQdBN... │ Owner: ¿?                            │
│ Status: ACTIVO       │ Status: PROBABLEMENTE ACTIVO         │
│                      │                                      │
│ Validar con:         │ Validar con:                         │
│ audit_unique.js      │ solana account 7Qm6... -u m          │
└──────────────────────┴──────────────────────────────────────┘
```

---

### Componente: Token XLS (RWA/Gobernanza)

```
┌─────────────────────────────────────────────────────────────┐
│ TOKEN XLS (Real World Assets) - 20,250,000 suministro       │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ✅ CONFIRMADO        │ ✅ PROBABLE (No verificado)          │
│ Mint Address:        │ Mint Address:                        │
│ GM4vKHRrqg84mKRi... │ GM4vKHRrqg84mKRi... (MISMO ID)       │
│                      │                                      │
│ Status: BLOQUEADO    │ Status: PROBABLEMENTE BLOQUEADO      │
│ Razón: Espera DAO    │ Razón: Espera DAO + Auditoría       │
│ (Constitucional)     │ (Constitucional)                     │
│                      │                                      │
│ Validar con:         │ Validar con:                         │
│ audit_unique.js      │ solana account GM4v... -u m          │
└──────────────────────┴──────────────────────────────────────┘
```

---

### Componente: Token USDX (Stablecoin)

```
┌─────────────────────────────────────────────────────────────┐
│ TOKEN USDX (Stablecoin) - Respaldado por reserve            │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ❌ NO ENCONTRADO     │ ❌ NO ENCONTRADO                     │
│                      │                                      │
│ Status: FALTA        │ Status: FALTA                        │
│ Razón: Bloqueado     │ Razón: Bloqueado                     │
│ hasta auditoría      │ hasta auditoría                      │
│                      │                                      │
│ Nota: Requiere       │ Nota: Requiere                       │
│ reserve proof        │ reserve proof                        │
│                      │                                      │
│ ⚠️  INVESTIGAR       │ ⚠️  INVESTIGAR                       │
└──────────────────────┴──────────────────────────────────────┘
```

---

### Componente: Wallets Vault (Gobernanza)

```
┌─────────────────────────────────────────────────────────────┐
│ WALLETS VAULT (12 RWA Vaults + Fee Collector)              │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ✅ REGISTRADAS       │ ❓ PROBABLE (No verificado)          │
│ Ubicación: ~/../ ... │ Ubicación: ~/../ ...                 │
│ admin-dashboard/     │ admin-dashboard/                     │
│ lib/wallet-         │ lib/wallet-                          │
│ addresses.json       │ addresses.json                       │
│                      │                                      │
│ Contiene:            │ Contiene:                            │
│ - Genesis Squad      │ - Genesis Squad                      │
│ - Fee Collector      │ - Fee Collector                      │
│ - 12 RWA Vaults      │ - 12 RWA Vaults                      │
│ - Operator Wallet    │ - Operator Wallet                    │
│ - Multisig (4-of-6)  │ - Multisig (4-of-6)                  │
│                      │                                      │
│ Status: ACTIVAS      │ Status: PROBABLEMENTE ACTIVAS        │
└──────────────────────┴──────────────────────────────────────┘
```

---

### Componente: Multisig (Gobernanza)

```
┌─────────────────────────────────────────────────────────────┐
│ MULTISIG CONTROL (4-of-6 threshold)                         │
├──────────────────────┬──────────────────────────────────────┤
│ EN DEVNET            │ EN MAINNET                           │
├──────────────────────┼──────────────────────────────────────┤
│ ✅ CONFIGURADO       │ ❌ INCOMPLETO                        │
│ Threshold: 4-of-6    │ Threshold: 4-of-6 (en código)       │
│                      │                                      │
│ Estado: EN CÓDIGO    │ Estado: NO EN BLOCKCHAIN             │
│ (Validación por      │ (Solo single-sig wallet)             │
│ smart contract)      │                                      │
│                      │                                      │
│ Autoridad actual:    │ Autoridad actual:                    │
│ HQ8eEKM88MWZ45sKa... │ HQ8eEKM88MWZ45sKa...               │
│ (Wallet normal)      │ (Wallet normal - PROBLEMA)          │
│                      │                                      │
│ Próximo paso:        │ Próximo paso:                        │
│ N/A (solo dev)       │ ⚠️  Ejecutar mainnet_handover.ts    │
│                      │                                      │
│ RIESGO: BAJO         │ RIESGO: ALTO                         │
│ (Es testing)         │ (Producción sin multisig)            │
└──────────────────────┴──────────────────────────────────────┘
```

---

## 🔐 MULTISIG: ESTADO DETALLADO

### Configuración en CÓDIGO (EN AMBAS REDES):

```rust
// programs/excelsior/src/state/access_control.rs
Threshold: 4 signers de 6 totales

Operaciones Protegidas:
✅ Cambiar oracle config (Pyth ↔ Chainlink)
✅ Pausa de emergencia
✅ Modificar fee distribution
✅ Transferir vault funds
✅ Cambiar operador principal
```

### Estado en BLOCKCHAIN:

```
DEVNET:
  ✅ Configurado en código
  ✅ Usado para testing
  ⚠️  No validación real on-chain

MAINNET:
  ❌ Upgrade Authority: SINGLE-SIG
  ❌ NO hay multisig implementado
  ⚠️  CRÍTICO: Necesita transferencia
  
  Script pendiente:
  → scripts/mainnet/mainnet_handover.ts
  
  Debería:
  1. Crear multisig (Squads Protocol o similar)
  2. Transferir upgrade authority
  3. Validar cambio
```

---

## 📍 DÓNDE ESTÁ CADA ARCHIVO

### Documentación Original (SIN CAMBIOS)

```
/economy-triple-token/
├── README.md ......................... Visión del proyecto
├── Whitepaper.md .................... Tokenomics (English)
├── Whitepaper_ES.md ................. Tokenomics (Español)
├── CLAUDE.md ......................... Guía técnica
├── GUIA_PROYECTO.md ................. Tutorial español
└── Anchor.toml ...................... Config Solana
```

### Documentación Reorganizada (EN _organized/)

```
_organized/
├── docs/
│   ├── CLAUDE.md .................... Copiado
│   ├── Whitepaper.md ............... Copiado
│   ├── Whitepaper_ES.md ............ Copiado
│   ├── README.md ................... Copiado
│   ├── GUIA_PROYECTO.md ............ Copiado
│   └── INDEX.md .................... NUEVO
│
└── NUEVOS DOCUMENTOS CREADOS:
    ├── 00_START_HERE.md ............ Punto de entrada
    ├── QUICK_START.md ............. Resumen ejecutivo
    ├── MAINNET_vs_DEVNET_COMPARISON.md .. CRÍTICO
    ├── VERIFIED_MAINNET_STATE.md .. Datos blockchain
    ├── NETWORK_ARCHITECTURE.md .... Análisis redes
    ├── MAINNET_DEPLOYMENT_STATUS.md  Status
    ├── README_STRUCTURE.md ........ Estructura explicada
    └── WHAT_IS_WHERE.md ........... ESTE ARCHIVO
```

### Scripts (Separados por Red)

```
_organized/scripts/
├── devnet/
│   ├── README.md .................. Guía auditoría
│   ├── audit_unique.js ........... ⭐ Audita wallets
│   ├── audit_master.js ........... Auditoría master
│   ├── audit_aggressive.js ....... Auditoría agresiva
│   ├── full_audit.js ............. Auditoría exhaustiva
│   ├── deep_scan.ts .............. Escaneo profundo
│   ├── robust_scan.ts ............ Escaneo robusto
│   ├── final_controlled_burn.js .. Quema controlada
│   ├── find_largest.js ........... Encuentra grandes wallets
│   └── (13 scripts totales)
│
└── mainnet/
    ├── README.md .................. ⚠️  GUÍA CRÍTICA
    ├── mainnet_handover.ts ........ ⚠️  TRANSFERENCIA MULTISIG
    ├── upload_metadata.ts ......... Upload metadata IPFS
    ├── update_xls_metadata.ts ..... Actualizar XLS
    ├── wallet_registry.ts ......... Registrar wallets
    └── generate_metadata_base64.ts  Generar metadata
```

### Configuración

```
_organized/config/
├── Anchor.toml .................... Copia de config
├── tsconfig.json .................. Copia de config
└── .gitignore ..................... Copia de config
```

### Datos y Logs

```
_organized/
├── logs/ ........................... Todos los *.log
├── assets/ ......................... Logos
└── archive/ ........................ Scripts menos usados
```

---

## 🎯 FLUJOS DE TRABAJO TÍPICOS

### "Auditar DEVNET"

```bash
cd _organized/scripts/devnet/
node audit_unique.js

# Lee antes: _organized/scripts/devnet/README.md
```

### "Completar MULTISIG en MAINNET"

```bash
# 1. Leer documentación
cat _organized/VERIFIED_MAINNET_STATE.md
cat _organized/scripts/mainnet/README.md

# 2. Revisar script
cat _organized/scripts/mainnet/mainnet_handover.ts

# 3. Ejecutar (con cuidado)
npx ts-node scripts/mainnet/mainnet_handover.ts

# 4. Verificar cambio
solana program show 9d7Se... -u m
```

### "Verificar MAINNET"

```bash
# Ver programa
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Ver autoridad
solana account HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m

# Ver tokens
solana account 7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth -u m
solana account GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki -u m

# Ver wallet registry
cat admin-dashboard/lib/wallet-addresses.json | jq
```

---

## ⚡ RESUMEN RAPIDÍSIMO

| Qué | Dónde | Estado |
|-----|-------|--------|
| **Smart Contract** | Mainnet + Devnet | ✅ ACTIVO |
| **Token LXR** | Mainnet + Devnet | ✅ ACTIVO |
| **Token XLS** | Mainnet + Devnet | 🔒 BLOQUEADO |
| **Token USDX** | ❓ NO HALLADO | ❌ FALTA |
| **Wallets Vault** | wallet-addresses.json | ✅ REGISTRADAS |
| **Multisig** | Mainnet | ⚠️  SIN ACTIVAR |
| **Scripts Devnet** | _organized/scripts/devnet/ | ✅ FUNCIONANDO |
| **Scripts Mainnet** | _organized/scripts/mainnet/ | ✅ LISTOS (no ejecutados) |
| **Documentación** | _organized/docs/ | ✅ COMPLETA |

---

## 📞 SI NO ENCUENTRAS ALGO

```
Archivo original:        /economy-triple-token/
Estructura reorganizada: /_organized/
Documentos análisis:     /_organized/*.md
Scripts devnet:          /_organized/scripts/devnet/
Scripts mainnet:         /_organized/scripts/mainnet/
Smart contracts:         /programs/excelsior/src/
Frontend:                /app/
```

Busca en `00_START_HERE.md` si aún no encuentras nada.

---

**Último update:** 2026-04-29  
**Estado:** ✅ Todo documentado y organizado
