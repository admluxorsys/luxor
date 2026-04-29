# 📁 Estructura Reorganizada - Economy Triple Token

**Propósito:** Separar documentación, configuración, scripts devnet/mainnet y archivos útiles.

---

## 🎯 NUEVA ESTRUCTURA (en `/_ organized/`)

```
_organized/
│
├── 📚 docs/
│   ├── INDEX.md ........................ Guía de lectura (leer primero)
│   ├── CLAUDE.md ....................... ⭐ TÉCNICO - Comandos, arquitectura
│   ├── README.md ....................... ⭐ VISIÓN - Qué es Luxor
│   ├── Whitepaper.md ................... 📖 GOBERNANZA (English)
│   ├── Whitepaper_ES.md ................ 📖 GOBERNANZA (Español)
│   └── GUIA_PROYECTO.md ................ 📖 GUÍA TÉCNICA (Español)
│
├── 🔧 config/
│   ├── Anchor.toml ..................... Configuración Anchor/Solana
│   ├── tsconfig.json ................... Configuración TypeScript
│   └── .gitignore ...................... Git ignore rules
│
├── 📜 scripts/
│   ├── devnet/
│   │   ├── README.md ................... 🔍 Guía de auditoría devnet
│   │   ├── audit_unique.js ............ Audita wallets únicas (devnet)
│   │   ├── audit_master.js ............ Auditoría master (devnet)
│   │   ├── audit_aggressive.js ........ Auditoría agresiva (devnet)
│   │   ├── audit_backup.js ............ Backup auditoría (devnet)
│   │   ├── full_audit.js .............. Auditoría exhaustiva (devnet)
│   │   ├── deep_scan.ts ............... Escaneo profundo (devnet)
│   │   ├── deep_scan_efficient.js ..... Escaneo optimizado (devnet)
│   │   ├── robust_scan.ts ............. Escaneo robusto (devnet)
│   │   ├── final_scan.js .............. Escaneo final (devnet)
│   │   ├── final_controlled_burn.js ... Quema controlada (devnet)
│   │   ├── find_largest.js ............ Encuentra wallets grandes (devnet)
│   │   └── test.js .................... Test básico (devnet)
│   │
│   └── mainnet/
│       ├── README.md ................... 🚀 Guía de mainnet (CRÍTICO)
│       ├── mainnet_handover.ts ........ ⚠️ TRANSFERENCIA MULTISIG
│       ├── upload_metadata.ts ......... Metadata upload (mainnet)
│       ├── update_xls_metadata.ts ..... Actualizar XLS (mainnet)
│       ├── wallet_registry.ts ......... Registrar wallets (mainnet)
│       └── generate_metadata_base64.ts  Generar metadata (mainnet)
│
├── 🧪 tests/
│   ├── excelsior.ts.ignore ............ 17,706 líneas - Tests completos
│   ├── access_control.ts .............. Tests de control de acceso
│   └── e2e_flow.ts .................... Tests end-to-end
│
├── 💻 programs/
│   └── excelsior/ ..................... Smart contracts (ORIGINAL)
│       ├── src/
│       │   ├── instructions/ .......... 13 módulos Rust (~2,000 líneas)
│       │   ├── state/ ................ Estados on-chain
│       │   └── lib.rs ................ Punto de entrada
│       └── Cargo.toml
│
├── 🖥️ app/
│   └── (Next.js 16 app - ORIGINAL)
│       ├── components/ ................ React components
│       ├── app/ ....................... Next.js App Router
│       ├── public/ .................... Assets estáticos
│       └── package.json
│
├── 🔑 wallets/
│   └── admin.json ..................... ⚠️ PRIVADO - Admin wallet
│
├── 🎨 assets/
│   └── logos/ ......................... Logos del proyecto
│
├── 📋 logs/
│   ├── build*.log ..................... Logs de compilación
│   ├── deploy*.log .................... Logs de despliegue
│   └── script_debug.log ............... Debug logs
│
├── 🗂️ archive/
│   └── (Archivos menos prioritarios)
│
├── NETWORK_ARCHITECTURE.md ............ 🌐 Devnet vs Mainnet (NUEVO)
├── README_STRUCTURE.md ................ Este archivo
├── package.json ....................... Dependencies root
└── yarn.lock .......................... Lock file

```

---

## 📊 ANÁLISIS DE PRIORIDADES

### ⭐⭐⭐ CRÍTICO (Leer primero)
```
_organized/docs/
├── INDEX.md .................. Qué leer y en qué orden
└── CLAUDE.md ................. Comandos y arquitectura técnica
```

### ⭐⭐ IMPORTANTE
```
_organized/docs/
├── README.md ................. Visión del proyecto
├── Whitepaper.md ............. Arquitectura economía
├── GUIA_PROYECTO.md .......... Guía técnica española

_organized/
└── NETWORK_ARCHITECTURE.md ... Devnet vs Mainnet
```

### ⭐ REFERENCIA
```
_organized/
├── config/ ................... Configuración técnica
├── scripts/ .................. Utilidades de operación
└── logs/ ..................... Histórico de compilación
```

### 🗑️ ARCHIVO (menos usado)
```
_organized/archive/
├── audit-scripts/ ............ Variaciones de auditoría
└── debug-logs/ ............... Logs de debug previos
```

---

## 🔄 CÓMO USAR ESTA ESTRUCTURA

### 1️⃣ Para Desarrollador Nuevo
```bash
1. Leer: _organized/docs/INDEX.md
2. Leer: _organized/docs/CLAUDE.md
3. Leer: _organized/NETWORK_ARCHITECTURE.md
4. cd app && npm run dev
```

### 2️⃣ Para Auditoría Devnet
```bash
cd _organized/scripts/devnet/
node audit_unique.js
```

### 3️⃣ Para Despliegue Mainnet
```bash
⚠️ ANTES DE USAR:
1. Verificar script: cat _organized/scripts/mainnet/mainnet_handover.ts
2. Revisar: _organized/scripts/mainnet/README.md
3. Ejecutar: npx ts-node _organized/scripts/mainnet/mainnet_handover.ts
```

---

## 📈 BENEFICIOS DE ESTA ESTRUCTURA

| Beneficio | Antes | Después |
|-----------|-------|---------|
| **Claridad** | Archivos mezclados | Carpetas separadas por función |
| **Devnet vs Mainnet** | Confuso, hardcodeado | Claramente separado |
| **Documentación** | Dispersa | Centralizada en `docs/` |
| **Scripts** | 8 archivos raíz | Organizados por red |
| **Logs** | Contamina raíz | Agrupados en `logs/` |
| **Mantenibilidad** | Difícil de navegar | Intuitiva y clara |

---

## 🚀 PRÓXIMOS PASOS

1. **Verificar que todo está OK:**
   ```bash
   ls -la _organized/
   # Debe mostrar: docs/ config/ scripts/ tests/ programs/ app/ ...
   ```

2. **Crear análisis Mainnet:**
   ```bash
   # En scripts/mainnet/README.md, agregar:
   - Fecha de primer despliegue
   - Mints de tokens (LXR, XLS, USDX)
   - Wallets multisig
   - Status actual
   ```

3. **Documentar migración:**
   ```bash
   # Crear archivo: _organized/deployments/MIGRATION_LOG.md
   # Registrar:
   - Qué se movió (mints, liquidity, etc)
   - Cuándo
   - Quién lo hizo (multisig signer)
   - Verificación
   ```

---

## 📝 NOTAS IMPORTANTES

- ✅ **No se eliminó nada** — Todo está en `_organized/` con estructura clara
- ✅ **Archivos originales preservados** — En `archive/` si necesitas referencias
- ✅ **Scripts actuales funcionan** — Paths pueden necesitar actualización
- ⚠️ **Mainnet requiere env vars** — `RPC_URL`, wallet path, etc.
- 🔐 **Wallets en .gitignore** — No commitear `wallets/admin.json`
