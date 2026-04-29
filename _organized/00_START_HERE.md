# 🎯 COMIENZA AQUÍ - Guía de Navegación

**Bienvenido al repositorio reorganizado de Luxor/Excelsior**

---

## 🚀 LEE PRIMERO (En este orden)

### 1️⃣ RÁPIDO (5 minutos)
**Archivo:** `QUICK_START.md`
- Resumen ejecutivo del proyecto
- Comandos más comunes
- Links a documentación específica

### 2️⃣ ESENCIAL (10 minutos)
**Archivo:** `MAINNET_vs_DEVNET_COMPARISON.md`
- Tabla comparativa mainnet vs devnet
- Estado verificado en blockchain
- ⚠️ **IMPORTANTE:** Multisig status

### 3️⃣ TÉCNICO (20 minutos)
**Archivo:** `docs/CLAUDE.md`
- Arquitectura de smart contracts
- Comandos de desarrollo
- Estructura del código

### 4️⃣ VERIFICACIÓN (Si necesitas detalles)
**Archivo:** `VERIFIED_MAINNET_STATE.md`
- Datos verificados con Solana CLI
- Estado actual del programa
- Próximos pasos

---

## 📁 ESTRUCTURA ORGANIZADA

```
_organized/
├── 📚 docs/                          ← DOCUMENTACIÓN
│   ├── CLAUDE.md                     Guía técnica completa
│   ├── Whitepaper.md                 Tokenomics (English)
│   ├── Whitepaper_ES.md              Tokenomics (Español)
│   ├── README.md                     Visión del proyecto
│   └── GUIA_PROYECTO.md              Tutorial en español
│
├── 📜 scripts/                       ← UTILIDADES
│   ├── devnet/                       Scripts para auditoría devnet
│   │   ├── audit_unique.js           ⭐ Audita wallets únicas
│   │   ├── audit_master.js           Auditoría master
│   │   └── ... (8 scripts totales)
│   │
│   └── mainnet/                      Scripts para mainnet
│       ├── mainnet_handover.ts       ⚠️ TRANSFERENCIA MULTISIG
│       ├── upload_metadata.ts        Sube metadata
│       └── ... (5 scripts totales)
│
├── 🔧 config/                        ← CONFIGURACIÓN
│   ├── Anchor.toml                   Config devnet/mainnet
│   ├── tsconfig.json                 Config TypeScript
│   └── .gitignore
│
├── 📊 logs/                          ← HISTÓRICO
│   └── *.log                         Build, deploy, debug logs
│
├── 🎨 assets/                        ← VISUALES
│   └── logos/                        Logos del proyecto
│
├── 📋 DOCUMENTOS PRINCIPALES
│   ├── QUICK_START.md                Inicio rápido
│   ├── MAINNET_vs_DEVNET_COMPARISON.md    ← LEER SEGUNDO
│   ├── VERIFIED_MAINNET_STATE.md     Estado verificado
│   ├── NETWORK_ARCHITECTURE.md       Análisis de redes
│   ├── MAINNET_DEPLOYMENT_STATUS.md  Status despliegue
│   └── README_STRUCTURE.md           Explicación estructura
│
└── 📁 archive/                       ← MENOS USADO
    ├── audit-scripts/                Variaciones
    └── debug-logs/                   Logs previos

```

---

## 🎯 SEGÚN TU NECESIDAD

### "Quiero entender TODO en 10 minutos"
```bash
1. Leer: QUICK_START.md
2. Leer: MAINNET_vs_DEVNET_COMPARISON.md
3. Fin ✅
```

### "Quiero auditar DEVNET"
```bash
1. Leer: scripts/devnet/README.md
2. Ejecutar: cd scripts/devnet && node audit_unique.js
3. Ver resultados
```

### "Necesito completar MULTISIG en MAINNET"
```bash
1. Leer: VERIFIED_MAINNET_STATE.md
2. Revisar: scripts/mainnet/mainnet_handover.ts
3. Ejecutar: npx ts-node scripts/mainnet/mainnet_handover.ts
4. Verificar: solana program show 9d7Se... -u m
```

### "Voy a desarrollar en smart contracts"
```bash
1. Leer: docs/CLAUDE.md
2. Leer: docs/Whitepaper.md
3. Ver: programs/excelsior/src/
4. Compilar: anchor build
5. Testear: anchor test
```

### "Necesito saber qué fue subido a MAINNET"
```bash
1. Leer: MAINNET_vs_DEVNET_COMPARISON.md
2. Leer: VERIFIED_MAINNET_STATE.md
3. Ejecutar comandos de verificación en blockchain
```

---

## ✅ CHECKLIST RÁPIDO

### Estado del Proyecto (2026-04-29)

- ✅ Smart Contract compilado y funcionando
- ✅ Devnet operacional con auditoría automática
- ✅ Mainnet con programa desplegado
- ❓ Mainnet multisig (PENDIENTE)
- ❌ Token USDX no localizado
- ✅ Documentación completa

### Próximo Paso Crítico

```bash
# Transferir propiedad a multisig en mainnet
npx ts-node scripts/mainnet/mainnet_handover.ts
```

---

## 🔐 SEGURIDAD

⚠️ **IMPORTANTE:**
- `wallets/admin.json` contiene claves privadas
- NUNCA commitear wallet keys
- NUNCA compartir rutas de wallet
- Usar variables de entorno para RPC URLs

---

## 📞 SOPORTE RÁPIDO

| Problema | Solución |
|----------|----------|
| No sé por dónde empezar | Leer `QUICK_START.md` |
| Necesito auditar devnet | `scripts/devnet/README.md` |
| Necesito info de mainnet | `MAINNET_vs_DEVNET_COMPARISON.md` |
| Necesito comandos técnicos | `docs/CLAUDE.md` |
| Necesito entender economía | `docs/Whitepaper.md` |
| Necesito archivos originales | Ver `/` (raíz del proyecto) |

---

## 🗺️ UBICACIÓN DE ARCHIVOS ORIGINALES

Si necesitas los archivos originales (no reorganizados):
```bash
/home/itsroosevelt_/excelsior-project/economy-triple-token/
├── programs/                ← Smart contracts ORIGINALES
├── app/                     ← Next.js ORIGINAL
├── tests/                   ← Tests ORIGINALES
├── scripts/                 ← Scripts ORIGINALES
└── ... (todo sin cambios)
```

**Nada fue eliminado.** La carpeta `_organized/` es adicional para mejor navegación.

---

## 🎓 APRENDIZAJE PROGRESIVO

```
Principiante:
  1. QUICK_START.md
  2. docs/README.md
  3. MAINNET_vs_DEVNET_COMPARISON.md

Desarrollador:
  1. docs/CLAUDE.md
  2. programs/excelsior/src/lib.rs
  3. scripts/devnet/audit_unique.js
  4. anchor build && anchor test

Auditor/Operador:
  1. VERIFIED_MAINNET_STATE.md
  2. scripts/mainnet/mainnet_handover.ts
  3. solana program show [ID] -u m
  4. Revisar multisig status

Investigador:
  1. docs/Whitepaper.md (español o english)
  2. NETWORK_ARCHITECTURE.md
  3. MAINNET_DEPLOYMENT_STATUS.md
  4. Revisar git history
```

---

## 📈 RESUMEN VISUAL DEL PROYECTO

```
                    Economy Triple Token (Luxor)
                              │
                ┌─────────────┼─────────────┐
                │             │             │
            DEVNET        MAINNET      TESTING
              │               │            │
        [Activo]        [Activo]        [Local]
        Auditoría       Producción      Unit Tests
        Scripts         (Sin Multisig)  E2E Tests
        Testing         ⚠️ Incompleto   17.7K líneas
```

---

## 🚀 PRÓXIMOS PASOS (Hoy)

- [ ] Leer `QUICK_START.md` (5 min)
- [ ] Leer `MAINNET_vs_DEVNET_COMPARISON.md` (10 min)
- [ ] Ejecutar: `anchor build` para verificar compilación
- [ ] Ejecutar: `scripts/devnet/audit_unique.js` para auditar devnet
- [ ] Revisar: `scripts/mainnet/mainnet_handover.ts` (si necesitas multisig)
- [ ] Decidir: ¿Completar multisig transfer? ⚠️ CRÍTICO

---

**Última actualización:** 2026-04-29  
**Creado por:** Claude Code Analysis  
**Estado:** Completamente documentado y organizado
