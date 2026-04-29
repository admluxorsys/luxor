# 📄 RESUMEN EN UNA PÁGINA - LUXOR/EXCELSIOR

**TL;DR completo • 2026-04-29**

---

## 🎯 ¿QUÉ ES?

```
Luxor/Excelsior = Smart contract de Solana con 3 tokens
├─ LXR:  Token de utilidad (2.025B supply) ✅ Activo
├─ XLS:  Real World Assets/Gobernanza (20.25M supply) 🔒 Bloqueado
└─ USDX: Stablecoin (sin encontrar)

Desplegado en:
├─ DEVNET (testing) ✅ Tu control total
└─ MAINNET (producción) 🔐 Squad multisig (4-of-6 votos)
```

---

## 📍 UBICACIONES CLAVE

| Qué | Dónde | Qué hacer |
|-----|-------|-----------|
| **Código** | `/programs/excelsior/src/` | Editar y compilar |
| **Tests** | `/tests/` + `/_organized/tests/` | Escribir pruebas |
| **Devnet scripts** | `/_organized/scripts/devnet/` | Auditar devnet |
| **Mainnet scripts** | `/_organized/scripts/mainnet/` | Proponer cambios |
| **Billetera** | `/wallets/admin.json` | Usar en devnet |
| **Documentación** | `/_organized/docs/` | Leer guías |
| **Análisis** | `/_organized/` (*.md) | Entender estructura |

---

## 🔐 QUIÉN CONTROLA QUÉ

```
ANTES (cuando se desplegó a mainnet):
  Mainnet: billetera admin.json (tú solito)
  Devnet:  billetera admin.json (tú solito)

AHORA (estado actual):
  Mainnet: Squad multisig HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
           └─ Necesita 4 votos de 6 signers para cualquier cambio
  Devnet:  billetera admin.json (tú solito - sin restricciones)
```

---

## ⚡ ACCIONES RÁPIDAS

```bash
# Ver si todo funciona
solana config set --keypair ./wallets/admin.json
solana balance                    # ✅ Should work
anchor build                      # ✅ Should compile

# Auditar devnet
node _organized/scripts/devnet/audit_unique.js

# Ver mainnet
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Proponer cambio para mainnet
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts

# Votar en Squad
→ https://squads.so (busca: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe)
```

---

## 📊 TABLA DE ESTADO

| Componente | Devnet | Mainnet | Status |
|-----------|--------|---------|--------|
| **Programa** | 9d7SeR8N...jmfv | 9d7SeR8N...jmfv | ✅ Activo |
| **Token LXR** | Confirmado | Probable | ✅ Activo |
| **Token XLS** | Confirmado | Probable | 🔒 Bloqueado |
| **Token USDX** | No encontrado | No encontrado | ❌ Falta |
| **Control** | admin.json | Squad 4/6 | ✅ Seguro |
| **Cambios** | Inmediatos | Votación | ⏳ Squad |

---

## 🔄 WORKFLOW: CÓMO CAMBIAR CÓDIGO

```
LOCAL (Tu PC)
  ↓
Editar: programs/excelsior/src/instructions/*.rs
  ↓
Compilar: anchor build
  ↓
Testear: anchor test (o en devnet)
  ↓
DEVNET (Testing)
  ↓
anchor deploy --provider.cluster devnet
  ↓
Auditar: node _organized/scripts/devnet/audit_unique.js
  ↓
MAINNET (Si está listo)
  ↓
Propuesta: npx ts-node _organized/scripts/mainnet/mainnet_handover.ts
  ↓
SQUAD (Votación)
  ↓
https://squads.so → Ver propuesta
  ↓
Signers votan (necesita 4/6)
  ↓
MAINNET (Ejecución)
  ↓
Upgrade automático cuando hay 4 votos
```

---

## 📂 ESTRUCTURA (10 segundos)

```
/economy-triple-token/
├── programs/excelsior/        ← CÓDIGO (qué cambiar)
├── tests/                      ← TESTS
├── wallets/admin.json          ← BILLETERA
├── _organized/
│   ├── docs/                   ← GUÍAS
│   ├── scripts/devnet/         ← AUDITORÍA DEVNET
│   ├── scripts/mainnet/        ← CONTROL MAINNET
│   ├── config/                 ← CONFIGURACIÓN
│   └── *.md                    ← ANÁLISIS (este documento aquí)
└── app/                        ← FRONTEND (Next.js)
```

---

## 🎓 QUÉ LEER

**En 5 minutos:**
- Este archivo (ONE_PAGE_SUMMARY.md)
- [START_HERE_MASTER.md](START_HERE_MASTER.md)

**En 30 minutos:**
- [MASTER_STRUCTURE.md](MASTER_STRUCTURE.md)
- [docs/CLAUDE.md](../docs/CLAUDE.md)

**En 2 horas:**
- [MAINNET_vs_DEVNET_COMPARISON.md](MAINNET_vs_DEVNET_COMPARISON.md)
- [SQUAD_MULTISIG_GUIDE.md](SQUAD_MULTISIG_GUIDE.md)
- [WALLET_STATUS_REPORT.md](WALLET_STATUS_REPORT.md)

---

## ✅ VERIFICACIÓN RÁPIDA (2 min)

```bash
✅ Billetera existe
   ls -la wallets/admin.json

✅ Código compila
   anchor build

✅ Devnet accesible
   node _organized/scripts/devnet/audit_unique.js

✅ Mainnet accesible
   solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

✅ Squad existe
   → https://squads.so (busca: HQ8e...)
```

---

## 🚨 LIMITACIONES

| Limitación | Razón | Solución |
|-----------|-------|----------|
| No puedo cambiar mainnet solo | Squad lo controla | Proponer + esperar 4/6 votos |
| USDX no existe | Bloqueado hasta auditoría | Esperar validación |
| XLS está bloqueado | Espera DAO constitucional | Esperar activación |
| Otros no ven mi billetera | Privada (bien hecho) | No necesitan |

---

## 💡 DIFERENCIAS CLAVE

```
DEVNET vs MAINNET

DEVNET (Tu sandbox):
  ✅ Cambios inmediatos
  ✅ SOL gratis (airdrop)
  ✅ Reinicios frecuentes
  ✅ Datos transitorios
  ✅ Perfecto para testing

MAINNET (Producción):
  ⚠️  Requiere votación Squad
  ⚠️  Cambios permanentes
  ⚠️  Dinero real
  ⚠️  Transacciones auditables
  ⚠️  Responsabilidad legal
```

---

## 📈 NÚMEROS IMPORTANTES

```
Smart Contract (Programa):
  ID: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
  Tamaño: 679,920 bytes
  Rent: 4.73 SOL
  Propietario: Squad multisig

Tokens:
  LXR (Utility):
    Supply: 2,025,000,000
    Mint: 7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth
    Status: ✅ Activo

  XLS (RWA/Gobernanza):
    Supply: 20,250,000
    Mint: GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki
    Status: 🔒 Bloqueado

  USDX (Stablecoin):
    Supply: Variable
    Status: ❌ No encontrado

Squad Multisig:
  Address: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
  Threshold: 4 de 6
  Signers: 6 (nombres privados)
  RPC: https://squads.so
```

---

## 🔗 ARCHIVOS EN `_organized/`

```
START_HERE_MASTER.md ............. ← EMPIEZA AQUÍ
ONE_PAGE_SUMMARY.md .............. ← TÚ ESTÁS AQUÍ
MASTER_STRUCTURE.md .............. Estructura completa
SQUAD_MULTISIG_GUIDE.md .......... Squad paso a paso
WALLET_STATUS_REPORT.md .......... Billetera + acceso
MAINNET_vs_DEVNET_COMPARISON.md . Análisis técnico
VERIFIED_MAINNET_STATE.md ........ Datos blockchain
NETWORK_ARCHITECTURE.md .......... Arquitectura redes
MAINNET_DEPLOYMENT_STATUS.md .... Status despliegue
WHAT_IS_WHERE.md ................. Quick reference
```

---

## 🎯 PRÓXIMO PASO

1. **Copia esta URL**: https://squads.so
2. **Busca**: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
3. **Conecta tu wallet**
4. **Verifica que eres signer** (si aplica)
5. **Lee [SQUAD_MULTISIG_GUIDE.md](SQUAD_MULTISIG_GUIDE.md)**
6. **¡Empieza a cambiar código!**

---

## 🆘 AYUDA RÁPIDA

| Pregunta | Respuesta |
|----------|-----------|
| ¿Dónde edito código? | `/programs/excelsior/src/` |
| ¿Cómo pruebo en devnet? | `anchor build` + `anchor test` |
| ¿Puedo cambiar mainnet? | No directamente, necesita votación Squad |
| ¿Tengo acceso a Squad? | Abre squads.so y conéctate |
| ¿La billetera es mía? | Sí, está en `/wallets/admin.json` |
| ¿Puede alguien acceder? | No, solo tú tienes el archivo |
| ¿Qué es eso de multisig? | 4 de 6 personas deben votar sí |
| ¿Cuánto cuesta? | En devnet: gratis. En mainnet: transacciones reales |

---

**Actualizado:** 2026-04-29  
**Status:** ✅ Todo listo para empezar  
**Siguiente:** Lee [START_HERE_MASTER.md](START_HERE_MASTER.md)

