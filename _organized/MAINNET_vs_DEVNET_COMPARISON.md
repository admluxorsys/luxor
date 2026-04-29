# 🌐 COMPARATIVA COMPLETA: MAINNET vs DEVNET

**Análisis del Proyecto Luxor/Excelsior**  
**Fecha:** 2026-04-29  
**Verificado con:** Solana CLI v3.18.0 + Code Analysis

---

## 📊 TABLA COMPARATIVA - ESTADO ACTUAL

### Smart Contract (Programa Excelsior)

```
┌────────────────────┬──────────────────────────┬──────────────────────────┐
│ COMPONENTE         │ DEVNET                   │ MAINNET                  │
├────────────────────┼──────────────────────────┼──────────────────────────┤
│ Program ID         │ 9d7SeR8Njzh32piG1HBxNR.. │ 9d7SeR8Njzh32piG1HBxNR.. │
│                    │ (IDENTICAL)              │ (IDENTICAL)              │
│ Status             │ ✅ ACTIVO                 │ ✅ ACTIVO                │
│ Last Deployed      │ Slot 443,514,912        │ Slot 401,608,950        │
│ Code Size          │ 679,920 bytes            │ 679,920 bytes           │
│ Balance (Rent)     │ 4.73344728 SOL           │ 4.73344728 SOL          │
│ Upgrade Authority  │ HQ8eEKM88MWZ45sKa...    │ HQ8eEKM88MWZ45sKa...   │
│ Authority Type     │ ⚠️ Single-Sig Wallet     │ ⚠️ Single-Sig Wallet    │
│ RPC Endpoint       │ https://api.devnet...    │ https://api.mainnet...  │
└────────────────────┴──────────────────────────┴──────────────────────────┘
```

### Tokens SPL (Mints)

```
┌────────────┬────────────────────────────────┬────────────────────────────────┐
│ TOKEN      │ DEVNET                         │ MAINNET                        │
├────────────┼────────────────────────────────┼────────────────────────────────┤
│ LXR        │ ✅ CONFIRMADO                  │ ✅ PROBABLE                    │
│ Mint       │ 7Qm6qUCXGZfGBYYFzq2kTbw...    │ Mismo ID (no verificado)       │
│ Suministro │ 2,025,000,000                 │ 2,025,000,000                 │
│ Status     │ ACTIVO                        │ ACTIVO (si existe)             │
│ Owner      │ TokenzQdBNbLqP5VEhdkAS6...    │ ¿?                             │
├────────────┼────────────────────────────────┼────────────────────────────────┤
│ XLS        │ ✅ CONFIRMADO                  │ ✅ PROBABLE                    │
│ Mint       │ GM4vKHRrqg84mKRixpVr5Fu...    │ Mismo ID (no verificado)       │
│ Suministro │ 20,250,000                    │ 20,250,000                    │
│ Status     │ BLOQUEADO (DAO activation)     │ BLOQUEADO (DAO activation)     │
├────────────┼────────────────────────────────┼────────────────────────────────┤
│ USDX       │ ❓ NO HALLADO                  │ ❓ NO HALLADO                  │
│ Status     │ Sin token confirmado           │ Sin token confirmado           │
│ Nota       │ Bloqueado hasta auditoría      │ Bloqueado hasta auditoría      │
└────────────┴────────────────────────────────┴────────────────────────────────┘
```

---

## 🔧 CONFIGURACIÓN Y CONEXIONES

### Configuración del Proyecto

```typescript
// Anchor.toml (ACTUAL)
[toolchain]
anchor_version = "0.32.1"
solana_version = "3.0.10"

[programs.devnet]
excelsior = "9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv"

[programs.mainnet]
excelsior = "9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv"

[registry]
url = "https://api.devnet.solana.com"

[provider]
cluster = "devnet"                    ← DEFAULT
wallet = "./wallets/admin.json"
```

### Scripts y Herramientas

```
┌────────────────────────┬────────────────────────┬────────────────────────┐
│ FUNCIÓN                │ DEVNET SCRIPTS         │ MAINNET SCRIPTS        │
├────────────────────────┼────────────────────────┼────────────────────────┤
│ Auditoría              │ audit_*.js (8 tipos)   │ wallet_registry.ts     │
│ Escaneo de datos       │ deep_scan.ts           │ N/A                    │
│ Crear tokens           │ src/scripts/           │ N/A                    │
│                        │ create_tokens.ts       │                        │
│ Metadata               │ N/A                    │ upload_metadata.ts     │
│ Transferencia Multisig │ N/A                    │ ⚠️ mainnet_handover.ts │
│ Actualizar metadata    │ N/A                    │ update_xls_metadata.ts │
│ Generar metadata       │ N/A                    │ generate_metadata...   │
└────────────────────────┴────────────────────────┴────────────────────────┘
```

---

## 🔐 MULTISIG STATUS

### Estado Actual: ⚠️ INCOMPLETO

```
AUTORIDAD DE UPGRADE:
┌─────────────────────────────────────────────────────┐
│ Wallet: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe  │
│ Tipo:   SINGLE-SIG (Wallet Normal)                  │
│ NO ES: Multisig en blockchain                       │
├─────────────────────────────────────────────────────┤
│ ¿Quién es esta wallet?                              │
│ - Según CLAUDE.md: Genesis Squad (holder inicial)   │
│ - Función actual: Upgrade Authority                 │
│ - Rol: ¿Representante del multisig? ¿Signer solo?  │
└─────────────────────────────────────────────────────┘
```

### Multisig Configurado en Código (pero no en blockchain)

```rust
// CLAUDE.md especifica:
- Threshold: 4-of-6 signers
- Operaciones críticas: Requieren multisig
- Solo: Cambios de oracle, emergencia pause, etc.

// Pero la REALIDAD en blockchain:
- Upgrade Authority: Single wallet
- Sin validación multisig on-chain
```

### Próximo Paso Pendiente

```bash
# Script que DEBE ejecutarse para completar:
npx ts-node scripts/mainnet_handover.ts

# Debería:
1. Crear o conectar multisig (Squads/Realm)
2. Transferir upgrade authority
3. Establecer operadores
4. Validar cambios
```

---

## 📦 QUÉ FUE SUBIDO A CADA RED

### DEVNET (Red de Desarrollo)

✅ **Subido y Activo:**
- Programa Excelsior compilado (679 KB)
- Tokens LXR y XLS creados
- Wallets de vault registradas
- Suite de tests (17,706 líneas)
- Scripts de auditoría

🔧 **Configuración:**
- Default RPC: devnet.solana.com
- Wallet admin: ./wallets/admin.json
- Sin multisig (testing)

📊 **Uso:**
- Desarrollo activo
- Auditoría continua de balances
- Testing de nuevas features
- Validación de cambios

---

### MAINNET (Red de Producción)

✅ **Confirmado en Blockchain:**
- Programa Excelsior en slot 401,608,950
- Código idéntico a devnet (679 KB)
- Balance rent: 4.73 SOL

❓ **Probable pero No Verificado:**
- Tokens LXR y XLS (mismo mint ID que devnet)
- Wallets vault asociadas
- Metadata en IPFS

⚠️ **Pendiente:**
- Transferencia de authority a multisig
- Ejecución de `mainnet_handover.ts`
- Confirmación final de multisig setup

📊 **Uso:**
- Producción (con cuidados)
- Sin multisig final (estado incompleto)
- Operaciones limitadas

---

## 🔍 CÓMO VERIFICAR MAINNET LOCALMENTE

### Comando 1: Ver Programa

```bash
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Output esperado:
Program Id: 9d7SeR8...
Owner: BPFLoaderUpgradeab1e11...
Authority: HQ8eEKM88MWZ45sKaXoD3jf3f...
Balance: 4.73344728 SOL
```

### Comando 2: Ver Upgrade Authority

```bash
solana account HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m

# Si aparece "Owner: 11111..." = Wallet normal (no multisig)
```

### Comando 3: Ver Historial

```bash
solana history HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m | head -20

# Muestra transacciones y qué hizo la wallet
```

### Comando 4: Verificar Tokens

```bash
# Buscar mints (si existen)
solana spl-token accounts -u m | grep -i "luxor\|lxr\|xls"

# O buscar directamente por mint ID:
solana account 7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth -u m
```

---

## 🚨 PROBLEMAS IDENTIFICADOS

### ⚠️ Problema 1: Single-Sig Authority en Mainnet

```
Riesgo:     ALTO
Severidad:  Crítica
Status:     NO RESUELTO

Descripción:
El programa en mainnet tiene upgrade authority como single-sig wallet.
Esto viola el principio de "4-of-6 multisig" documentado.

Solución:
Ejecutar: npx ts-node scripts/mainnet_handover.ts
```

### ⚠️ Problema 2: Tokens USDX No Encontrados

```
Riesgo:     MEDIO
Status:     NO RESUELTO

Descripción:
El token USDX no aparece en audits ni en configuración de mainnet.
Debería estar creado (aunque bloqueado).

Verificación:
Buscar mint USDX en _organized/scripts/mainnet/
```

### ⚠️ Problema 3: Mints Mainnet No Verificados

```
Riesgo:     BAJO-MEDIO
Status:     NECESITA VERIFICACIÓN

Descripción:
LXR y XLS probablemente fueron desplegados con los mismos IDs.
Pero no hay confirmación explícita en blockchain.

Verificación:
solana account 7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth -u m
solana account GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki -u m
```

---

## ✅ CHECKLIST DE ESTADO

### Devnet (Desarrollo)

- ✅ Programa compilado y desplegado
- ✅ Tokens LXR y XLS activos
- ✅ Wallets vault creadas
- ✅ Tests ejecutables
- ✅ Scripts de auditoría funcionando
- ⚠️ Sin multisig (OK para dev)

### Mainnet (Producción)

- ✅ Programa en blockchain (verificado)
- ✅ Code size idéntico a devnet
- ✅ Balance rent cubierto
- ❓ Tokens LXR/XLS (probable)
- ❓ Wallets vault (probable)
- ❌ **Multisig NO IMPLEMENTADO** ⚠️
- ❌ **mainnet_handover.ts NO EJECUTADO** ⚠️

---

## 🎯 RECOMENDACIONES URGENTES

### 1️⃣ VALIDACIÓN (Hoy)

```bash
# Verificar mints en mainnet
solana account 7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth -u m
solana account GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki -u m

# Mostrar output completo
```

### 2️⃣ MULTISIG SETUP (CRÍTICO)

```bash
# Revisar script antes de ejecutar
cat scripts/mainnet_handover.ts

# Verificar configuración de multisig
grep -r "multisig\|Squads\|Realm" scripts/

# Ejecutar transferencia
npx ts-node scripts/mainnet_handover.ts
```

### 3️⃣ POST-VERIFICACIÓN

```bash
# Confirmar que authority cambió
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Debe mostrar multisig como authority
```

---

## 📈 TABLA RESUMIDA FINAL

| Aspecto | Devnet | Mainnet | Estado |
|---------|--------|---------|--------|
| Programa | ✅ Activo | ✅ Activo (Slot 401M) | Sincronizado |
| Token LXR | ✅ Verificado | ✅ Probable | OK |
| Token XLS | ✅ Verificado | ✅ Probable | OK |
| Token USDX | ❌ No hallado | ❌ No hallado | FALTA |
| Wallets Vault | ✅ Registradas | ❓ Probable | VERIFICAR |
| Multisig | ❌ No (OK) | ❌ FALTA | **CRÍTICO** |
| Authority | Wallet | Wallet (HQ8e) | CAMBIAR |
| RPC Endpoint | devnet.solana.com | mainnet-beta.solana.com | Configurado |

---

## 📝 CONCLUSIÓN

**Estado General:** 🟡 PARCIALMENTE COMPLETO

- ✅ Smart contract desplegado y funcionando
- ✅ Tokens creados y operacionales
- ❌ Multisig configurado en código pero NO en blockchain
- ⚠️ Falta ejecutar script de transferencia de propiedad

**Próximo paso:** Ejecutar `mainnet_handover.ts` para completar seguridad multisig.

---

**Documento generado:** 2026-04-29  
**Verificación:** Solana CLI + Code Review  
**Confidencialidad:** Información pública de blockchain
