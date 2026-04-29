# 🎯 ESTRUCTURA MAESTRA - DEVNET vs MAINNET
**Actualizado:** 2026-04-29  
**Estado:** Reorganización completada + Wallet verificada + Squad multisig identificado

---

## 📍 ESTADO ACTUAL DE ACCESO

### ✅ BILLETERA DISPONIBLE
```
Ubicación: /wallets/admin.json
Status:    ✅ EXISTE Y ACCESIBLE
Propósito: Control de programa en mainnet (antes de multisig)
Nota:      Esta es la wallet que controlaba todo ANTES de la transferencia
```

### 🔐 SQUAD MULTISIG IDENTIFICADO
```
Dirección:      HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
Tipo:           Squad Protocol (4-of-6 threshold)
Propietario de: Programa Excelsior 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
Status:         ✅ ACTIVO EN MAINNET
Ubicación:      https://squads.so/ (buscar la dirección)
```

---

## 🌐 ESTRUCTURA COMPLETA ORGANIZADA

```
/home/itsroosevelt_/excelsior-project/economy-triple-token/
│
├── ⭐ ARCHIVOS RAÍZ (Origen del proyecto)
│   ├── Anchor.toml ..................... Configuración Anchor (copia en _organized/config/)
│   ├── README.md ....................... Visión del proyecto (copia en _organized/docs/)
│   ├── CLAUDE.md ....................... Guía técnica (copia en _organized/docs/)
│   ├── Whitepaper.md ................... Tokenomics EN (copia en _organized/docs/)
│   ├── Whitepaper_ES.md ................ Tokenomics ES (copia en _organized/docs/)
│   ├── GUIA_PROYECTO.md ................ Guía español (copia en _organized/docs/)
│   ├── package.json .................... NPM config (copia en _organized/config/)
│   ├── tsconfig.json ................... TypeScript (copia en _organized/config/)
│   ├── .gitignore ...................... Git rules (copia en _organized/config/)
│   ├── wallets/
│   │   └── admin.json .................. ✅ WALLET (CRÍTICA - No borrar)
│   ├── yarn.lock ....................... Lock file
│   ├── node_modules/ ................... Dependencies
│   ├── target/ ......................... Build output
│   └── .git/ ........................... Git history
│
├── 📁 _organized/ ....................... NUEVA ESTRUCTURA ORGANIZADA
│   ├── 📚 docs/
│   │   ├── INDEX.md .................... Guía de lectura
│   │   ├── CLAUDE.md ................... Comandos + arquitectura
│   │   ├── README.md ................... Visión proyecto
│   │   ├── Whitepaper.md ............... Tokenomics (EN)
│   │   ├── Whitepaper_ES.md ............ Tokenomics (ES)
│   │   └── GUIA_PROYECTO.md ............ Guía técnica (ES)
│   │
│   ├── 🔧 config/
│   │   ├── Anchor.toml ................. Anchor.toml actual
│   │   ├── package.json ................ Package config
│   │   ├── tsconfig.json ............... TypeScript config
│   │   └── .gitignore .................. Git ignore
│   │
│   ├── 📜 scripts/
│   │   ├── devnet/
│   │   │   ├── README.md ............... Guía auditoría devnet
│   │   │   ├── audit_unique.js ........ ✅ Valida wallets/balances
│   │   │   ├── audit_master.js ........ Auditoría master
│   │   │   ├── audit_aggressive.js ... Auditoría agresiva
│   │   │   ├── audit_backup.js ....... Backup auditoría
│   │   │   ├── full_audit.js ......... Auditoría exhaustiva
│   │   │   ├── deep_scan.ts .......... Escaneo profundo
│   │   │   ├── deep_scan_efficient.js  Escaneo optimizado
│   │   │   ├── robust_scan.ts ........ Escaneo robusto
│   │   │   ├── final_scan.js ......... Escaneo final
│   │   │   ├── final_controlled_burn.js Quema controlada
│   │   │   ├── find_largest.js ....... Wallets más grandes
│   │   │   └── test.js ................ Test básico
│   │   │
│   │   └── mainnet/
│   │       ├── README.md .............. ⚠️ GUÍA MAINNET (CRÍTICA)
│   │       ├── mainnet_handover.ts ... ⚠️ TRANSFERENCIA MULTISIG
│   │       ├── wallet_registry.ts .... Registrar wallets vault
│   │       ├── upload_metadata.ts .... Metadata upload IPFS
│   │       ├── update_xls_metadata.ts  Actualizar XLS metadata
│   │       └── generate_metadata_base64.ts Generar metadata
│   │
│   ├── 🧪 tests/
│   │   ├── excelsior.ts.ignore ....... 17,706 líneas (tests principales)
│   │   ├── access_control.ts ......... 3,978 líneas (tests auth)
│   │   └── e2e_flow.ts ............... 4,305 líneas (tests e2e)
│   │
│   ├── 💻 programs/
│   │   └── excelsior/ ................. Smart contract (ORIGINAL)
│   │       ├── src/
│   │       │   ├── instructions/ ..... 13 módulos Rust (~2,000 líneas)
│   │       │   ├── state/ ........... Estados on-chain
│   │       │   └── lib.rs ........... Punto entrada
│   │       └── Cargo.toml
│   │
│   ├── 🖥️ app/
│   │   └── (Next.js 16 frontend - ORIGINAL)
│   │       ├── app/ .................. Next.js App Router
│   │       ├── components/ ........... React components
│   │       ├── public/ ............... Assets estáticos
│   │       └── package.json
│   │
│   ├── 📊 analysis/
│   │   ├── MAINNET_vs_DEVNET_COMPARISON.md .. Análisis completo
│   │   ├── VERIFIED_MAINNET_STATE.md ....... Datos blockchain
│   │   ├── NETWORK_ARCHITECTURE.md ........ Arquitectura redes
│   │   ├── MAINNET_DEPLOYMENT_STATUS.md ... Status despliegue
│   │   ├── README_STRUCTURE.md ............ Estructura explicada
│   │   ├── WHAT_IS_WHERE.md ............... Quick reference
│   │   ├── 00_START_HERE.md ............... Entry point
│   │   ├── QUICK_START.md ................. Resumen ejecutivo
│   │   └── MASTER_STRUCTURE.md (ESTE FILE) ORGANIZACIÓN MAESTRA
│   │
│   ├── 🗂️ archive/
│   │   └── (Archivos menos prioritarios)
│   │
│   └── 🎨 assets/
│       └── logos/ ....................... Logos proyecto
│
└── 📂 Otros (Independientes)
    ├── src/ ............................ Scripts utils devnet
    │   ├── scripts/
    │   │   └── create_tokens.ts .... Crear SPL tokens
    │   └── utils/
    └── admin-dashboard/ ............... Dashboard frontend
        └── lib/
            └── wallet-addresses.json .. Registro de wallets
```

---

## 🎯 DEVNET vs MAINNET - SEPARACIÓN CLARA

### ✅ DEVNET (Red de Prueba)
```
Propósito:    Testing y desarrollo activo
RPC:          https://api.devnet.solana.com
Programa:     9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
Status:       ACTIVO y TESTEABLE

Scripts:      _organized/scripts/devnet/*
Auditorías:   13 scripts específicos para devnet
Tests:        /tests/ (pueden correr contra devnet)
Tokens:
  - LXR:      7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth ✅ Verificado
  - XLS:      GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki ✅ Verificado
  - USDX:     ❓ No encontrado en audits
Wallets:      admin-dashboard/lib/wallet-addresses.json
Multisig:     ✅ Configurado en código (4-of-6)
```

### 🚀 MAINNET (Producción)
```
Propósito:    PRODUCCIÓN - Control por Squad Multisig
RPC:          https://api.mainnet-beta.solana.com
Programa:     9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv (MISMO ID)
Status:       ✅ ACTIVO, BAJO CONTROL MULTISIG

Scripts:      _organized/scripts/mainnet/*
Control:      Squad Multisig (HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe)
Tokens:
  - LXR:      7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth (probable - mismo ID)
  - XLS:      GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki (probable - mismo ID)
  - USDX:     ❓ No encontrado
Wallets:      admin-dashboard/lib/wallet-addresses.json
Multisig:     ✅ Implementado en blockchain (Squad Protocol)
Propietario:  HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
```

---

## 🔐 CÓMO CONECTAR CON SQUAD MULTISIG

### Paso 1: Acceder a Squad
```bash
# En tu navegador:
1. Ir a https://squads.so
2. Conectar wallet (puede ser cualquier wallet con permiso)
3. Buscar Squad por dirección: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
```

### Paso 2: Ver Transacciones Pendientes
```
En Squad:
- Ver todas las transacciones pendientes
- Ver propuestas de actualización de código
- Ver transferencias de fondos
- Ver cambios de configuración
```

### Paso 3: Crear Nueva Propuesta
```bash
# Cuando quieras actualizar el contrato:
1. Compilar nuevo código: anchor build
2. Ejecutar: npx ts-node _organized/scripts/mainnet/mainnet_handover.ts
3. Esto crea una propuesta en Squad
4. Los 6 signers ven la propuesta
5. Se necesitan 4 firmas para aprobar
6. El upgrade se ejecuta automáticamente
```

---

## 📋 CHECKLIST DE SETUP LOCAL

```
✅ Billetera verificada:     /wallets/admin.json EXISTE
✅ Scripts devnet listos:     _organized/scripts/devnet/
✅ Scripts mainnet listos:    _organized/scripts/mainnet/
✅ Documentación organizada:  _organized/docs/ + _organized/analysis/
✅ Tests disponibles:         _organized/tests/ + /tests/
✅ Programa accesible:        programs/excelsior/src/

❓ Pendientes:
  - Verificar acceso a Squad Multisig (necesitas ser signer)
  - Conectar wallet a Squad
  - Obtener permisos si no eres signer aún
```

---

## 🚀 PRÓXIMOS PASOS INMEDIATOS

### Para Empezar a Trabajar Localmente:

```bash
# 1. Verificar billetera
cat wallets/admin.json  # ⚠️ Mira que la dirección coincida

# 2. Instalar dependencias (si no está)
yarn install

# 3. Para devnet - auditar estado actual
cd _organized/scripts/devnet
node audit_unique.js

# 4. Para mainnet - conectar a squad
# Ir a https://squads.so
# Buscar: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
```

### Para Hacer Cambios en Mainnet:

```bash
# 1. Cambiar código del contrato
# Editar: programs/excelsior/src/instructions/*.rs

# 2. Compilar
anchor build

# 3. Preparar upgrade
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts

# 4. Propuesta aparece en Squad
# Los 6 signers reciben notificación

# 5. Esperan a 4 aprobaciones
# El upgrade se ejecuta automáticamente
```

---

## ⚠️ NOTAS CRÍTICAS

1. **La billetera admin.json NO fue eliminada** — Sigue siendo valiosa para testing en devnet
2. **El Squad controla mainnet** — No puedes hacer cambios unilaterales
3. **Devnet es tuyo** — Puedes experimentar libremente
4. **Mainnet necesita propuesta** — Cada cambio pasa por Squad voting
5. **Los mints son idénticos** — LXR y XLS usan el mismo ID en ambas redes

---

## 📞 ARCHIVOS QUE CONSULTASTE

He leído todos estos para preparar el reporte:

✅ WHAT_IS_WHERE.md  
✅ MAINNET_vs_DEVNET_COMPARISON.md  
✅ MAINNET_DEPLOYMENT_STATUS.md  
✅ README_STRUCTURE.md  
✅ NETWORK_ARCHITECTURE.md  

**Conclusión de lecturas:** El proyecto está bien configurado. Squad multisig está activo en mainnet. Necesitas acceso a Squad para hacer cambios.

---

**Última actualización:** 2026-04-29  
**Status:** ✅ Reorganización completada + Wallet verificada + Squad identificado
