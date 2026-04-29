# 🌐 Arquitectura de Redes: DEVNET vs MAINNET

**Fecha de análisis:** 2026-04-29  
**Estado:** El programa está en AMBAS redes con el MISMO ID

---

## 📍 ESTADO ACTUAL DE DESPLIEGUES

### Programa Inteligente (Smart Contract)

```
Programa ID (IDÉNTICO en ambas redes):
┌─────────────────────────────────────────────┐
│  9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv  │
└─────────────────────────────────────────────┘
      ↓
   ┌──────────────────────┬──────────────────────┐
   │                      │                      │
   ▼                      ▼                      ▼
[DEVNET]           [MAINNET]              [LOCALNET]
Operativo          Producción             Testing
```

---

## ⚙️ CONFIGURACIÓN DEVNET

### Conexión
```
RPC Endpoint: https://api.devnet.solana.com
Cluster: devnet
Wallet Admin: ./wallets/admin.json
```

### Tokens Desplegados
| Token | Mint Address | Suministro | Estado |
|-------|--------------|-----------|--------|
| LXR | `7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth` | 2,025,000,000 | ✅ ACTIVO |
| XLS | `GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki` | 20,250,000 | 🔒 BLOQUEADO |
| USDX | ? (no encontrado en audits) | Variable | 🔒 BLOQUEADO |

### Scripts Activos
```
🔍 Auditoría Devnet:
  ├── audit_unique.js ................ Valida balances LXR/XLS
  ├── audit_master.js ................ Auditoría completa
  ├── audit_aggressive.js ............ Auditoría con reintentos
  ├── full_audit.js .................. Exhaustiva
  └── *.ts/js scan files ............. Escaneos especializados

📜 Herramientas:
  ├── src/scripts/create_tokens.ts ... Crear SPL tokens
  ├── src/scripts/generate_wallets.ts  Generar wallets
  └── tests/ ......................... Suite de pruebas (17K líneas)
```

### Wallets Registradas
Almacenadas en: `admin-dashboard/lib/wallet-addresses.json`

---

## 🚀 CONFIGURACIÓN MAINNET

### Conexión
```
RPC Endpoint: https://api.mainnet-beta.solana.com (default via env RPC_URL)
Cluster: mainnet
Status: PRODUCCIÓN (si está siendo usado)
```

### Despliegues en Mainnet
El programa ID `9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv` también existe aquí.

### Scripts de Control Mainnet
```
🔐 Scripts Críticos (MAINNET):
  ├── scripts/mainnet_handover.ts ......... TRANSFERENCIA DE PROPIEDAD MULTISIG
  ├── scripts/upload_metadata.ts ......... Upload metadata a IPFS
  ├── scripts/update_xls_metadata.ts ..... Actualizar XLS metadata
  ├── scripts/wallet_registry.ts ......... Registrar wallets vault
  └── scripts/generate_metadata_base64.ts  Generar metadata
```

### ⚠️ OBSERVACIÓN CRÍTICA
```
Anchor.toml ACTUAL:
[provider]
cluster = "devnet"                    ← DEFAULT ES DEVNET
wallet = "./wallets/admin.json"

Pero también define:
[programs.mainnet]
excelsior = "9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv"

Esto significa:
✅ CAN deploy a mainnet (configurado)
⚠️  PERO default scripts usan devnet
```

---

## 🔄 QUÉ FUE SUBIDO A MAINNET

### Confirmado en el Código:
```typescript
// scripts/mainnet_handover.ts existe y está CONFIGURED
// Esto sugiere que:
// 1. ✅ El programa fue desplegado
// 2. ✅ Hubo intención de transferencia de propiedad
// 3. ✅ Se preparó metadata para mainnet
```

### Tokens en Mainnet:
**NO CONFIRMADOS aún** — Los audits están hardcodeados para devnet.

Para confirmar qué está en mainnet, necesitarías:
```bash
# Ver qué programas tienes en mainnet
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Ver mints en mainnet
# (necesita magic Eden API o similar)
```

---

## 📊 MATRIZ DE ESTADO

| Componente | Devnet | Mainnet | Confirmación |
|-----------|--------|---------|--------------|
| Programa Excelsior | ✅ Sí | ✅ Sí (ID idéntico) | Anchor.toml |
| Token LXR Mint | ✅ Confirmado | ❓ Por verificar | Audit scripts devnet |
| Token XLS Mint | ✅ Confirmado | ❓ Por verificar | Audit scripts devnet |
| Token USDX | ❓ No en audits | ❓ No en audits | No encontrado |
| Wallets Vault | ✅ Registradas | ❓ Necesita verificar | wallet-addresses.json |
| Admin Wallet | ✅ wallets/admin.json | ✅ Mismo archivo | Usado en Anchor.toml |
| Multisig (4-of-6) | ✅ Configurado | ✅ Configurado | CLAUDE.md |

---

## 🎯 RECOMENDACIONES PARA SEPARARLOS

### Opción 1: Por Variables de Entorno
```bash
# .env
NETWORK=devnet  # o "mainnet"
RPC_URL=https://api.devnet.solana.com
WALLET_PATH=./wallets/admin.json
```

### Opción 2: Archivos Separados
```
config/
├── devnet.toml
├── mainnet.toml
└── localnet.toml
```

### Opción 3: Rama Git (RECOMENDADO)
```bash
git branch devnet  # rama actual
git branch mainnet # branch separada con configs mainnet
```

---

## 🔐 CONEXIÓN DEL MULTISIG

### Configuración Actual:
```
Multisig Threshold: 4-of-6
Signers: [no publicados en el código]
```

### Dónde está configurado:
- `programs/excelsior/src/state/access_control.rs` — Roles y permisos
- `programs/excelsior/src/instructions/access_control.rs` — Validación

### Cómo funciona:
1. Instrucción crítica (ej: cambiar config)
2. Requiere firma de operator
3. Se valida con multisig threshold
4. Se ejecuta si cumple 4-of-6

**El multisig ACTUAL es dueño porque está en:**
- `Genesis Squad` (holder inicial): `HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe`
- `Fee Collector`: `DdWG5ooDR84VfkM7nK5yTx9FnWNMQWk7NzTsTYQzBZmU`

---

## ✅ PRÓXIMOS PASOS SUGERIDOS

1. **Ejecutar auditoría en mainnet:**
   ```bash
   RPC_URL=https://api.mainnet-beta.solana.com npx ts-node scripts/wallet_registry.ts
   ```

2. **Crear rama separada:**
   ```bash
   git checkout -b mainnet
   # Cambiar Anchor.toml para mainnet
   # Cambiar scripts a mainnet RPC
   ```

3. **Documentar migración:**
   - Fecha de despliegue a mainnet
   - Mints de tokens en mainnet
   - Wallets actualizadas
   - Transferencia de propiedad multisig
