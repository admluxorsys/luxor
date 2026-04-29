# ⚡ RESUMEN EJECUTIVO - PLAN DE LANZAMIENTO ANTIBOT LXR

**Para presentar a Squad Multisig en 5 minutos**

---

## 🎯 LO QUE HAREMOS

```
Lanzar LXR con 5 CAPAS de protecciones anti-bot
que se desactivan AUTOMÁTICAMENTE en cronograma pre-aprobado
```

---

## 💰 NÚMEROS CLAVE

| Concepto | Valor |
|----------|-------|
| **Liquidez Inicial** | 101,250,000 LXR (5% del supply total) |
| **Fases de Lanzamiento** | 4 fases en 7 días |
| **Billeteras en Whitelist Inicial** | ~1,000 (comunidad verificada) |
| **Protecciones Simultáneas** | 8-10 reglas activas (descrecientes) |

---

## 🛡️ 5 CAPAS DE PROTECCIÓN

### CAPA 1: Atómica (Obligatoria)
- ✅ Pool creation + first buy = misma transacción
- ✅ Bot Tax en fallos

### CAPA 2: Límites Económicos (Crítica)
- ✅ Max Wallet: Comienza 0.5%, sube a 1% → 2% → ilimitado
- ✅ Max TX: Comienza 0.2%, sube a 0.5% → 1% → ilimitado
- ✅ Cooldown: 60s → 30s → 10s → 0s

### CAPA 3: Impuesto Decreciente (Táctico)
- ✅ **Primeros 5s: 99% tax** (imposible para bots)
- ✅ **Primeros 60s: 40% tax** (demasiado caro)
- ✅ **Después 5 min: 0% tax** (normal)

### CAPA 4: Verificación (Avanzada)
- ✅ Whitelist Merkle Tree (primeros 30 min)
- ✅ SNS / Seeker verification (boosts)
- ✅ Backend signature check (dinámico)

### CAPA 5: Monitoreo (Activo)
- ✅ Detección de patrones sospechosos
- ✅ Alertas en Discord en tiempo real
- ✅ Blacklist temporal para confirmados bots

---

## 📅 CRONOGRAMA DE DESACTIVACIÓN

```
🔴 FASE 0 - PRE-LANZAMIENTO
   └─ SOLO WHITELIST, todo bloqueado

🟠 FASE 1 - PRIMERAS 24H
   ├─ T+0:30 → Abre al público (se quita whitelist)
   ├─ T+4:00 → Sniper tax baja a 60%
   └─ T+24:00 → Tax a 0%, increase limits

🟡 FASE 2 - 24-72 HORAS
   ├─ Max wallet: 0.5% → 1%
   ├─ Max TX: 0.2% → 0.5%
   ├─ Cooldown: 60s → 30s
   └─ Status: RESTRICCIÓN MEDIA

🟢 FASE 3 - DÍAS 3-7
   ├─ Max wallet: 1% → 2%
   ├─ Max TX: 0.5% → 1%
   ├─ Cooldown: 30s → 10s
   └─ Status: CASI LIBRE

✅ FASE 4 - DESPUÉS 1 SEMANA
   └─ TODO DESACTIVADO (completamente libre)
```

---

## 📊 EJEMPLO PRÁCTICO

### Escenario: Bot intenta dominar en Fase 1

```
Bot: "Voy a comprar 50.6M LXR (50% de liquidez inicial)"

Realidad:
├─ Límite max wallet: 506K LXR (0.5%)
├─ Límite max TX: 405K LXR (0.2%)
├─ Cooldown: 60 segundos
├─ Sniper tax: 99%
└─ Resultado: 
   ├─ Necesita 125+ transacciones
   ├─ Cada una pierde 99% a tax
   ├─ Toma >2 horas (cooldown)
   ├─ Costo prohibitivo
   └─ BOT SE RINDE ❌
```

---

## 🔒 PROTECCIONES CONTRA TIPOS ESPECÍFICOS DE BOTS

```
Bot Type           | Attack Vector        | Nuestra Defensa
================================================================================
Sniper Bot         | Compra en bloque 0    | Sniper Tax 99%, atomicidad
MEV/Jito Bot       | Front-running         | Slippage guard + rate limiter
Sybil Attack       | 1000+ wallets         | Max wallet % + cooldown
Ladder Bot         | Múltiples micro-buys  | Cooldown + anti-multi-buy
Dump Bot           | Venta masiva 48h      | Monitoreo + circuit breaker
Flash Loan         | Buy + sell mismo slot | Anti-Flash-Loan check
Wallet Splitter    | Dividir entre wallets | Max wallet enforcement
```

---

## ✅ BENEFICIOS PARA LA COMUNIDAD

```
✅ Precio protegido en primeras 24h (evita crash)
✅ Distribución equitativa (limita ballenas)
✅ Oportunidad real para usuarios normales
✅ Demuestra profesionalismo (confianza)
✅ Completamente TRANSPARENTE (comunidad ve todo)
✅ REVERSIBLE (multisig puede desactivar si hay problema)
```

---

## ⚠️ RIESGOS MITIGADOS

```
❌ Rug Pull           → NO APLICABLE (token ya en blockchain)
❌ Pump & Dump        → Limitado por rate limiters
❌ Whale Accumulation → Limitado por max wallet
❌ Bot Takeover       → Limitado por todas las capas
❌ Flash Loan Exploit → Anti-Flash-Loan check
❌ Sybil Attack       → Whitelist + Merkle Tree
```

---

## 🔧 IMPLEMENTACIÓN TÉCNICA

```
Opción: Crear VAULT INTERMEDIARIO (no modificar token LXR original)

Flujo:
User → Tu Vault Contract (con reglas)
       ↓
       Aplica todas validaciones
       ↓
       CPI → Raydium Pool
       ↓
       Recibe LXR
       ↓
User recibe LXR protegido

Ventaja: Token LXR no se toca, todo es modular
```

---

## 📋 COSAS QUE NECESITAMOS APROBAR

```
1. ✅ Código Rust del Vault (audit ready)
2. ✅ Cronograma de desactivación (pre-aprobado)
3. ✅ Merkle root de whitelist (comunidad pre-aprobada)
4. ✅ Backend signature verification service (opcional pero recomendado)
5. ✅ Monitoreo dashboard en Discord
```

---

## 🎬 TIMELINE A MAINNET

```
T-7 Días:     ✅ Código finalizado y auditado
T-3 Días:     ✅ Propuesta en Squad Multisig
T-2 Días:     ✅ Obtener 4-of-6 signatures
T-1 Día:      ✅ Deploy del programa a mainnet
T-6 Horas:    ✅ Cargar liquidez inicial
T-1 Hora:     ✅ Equipo en standby
T-0:00:       ✅ Pool abierto con protecciones ACTIVAS
```

---

## 💡 PUNTOS CLAVE PARA PRESENTAR

```
1. "No es para siempre - es TEMPORAL y TRANSPARENTE"
   └─ Desactivación automática en cronograma

2. "Protege a la comunidad, no nos protege a nosotros"
   └─ Nosotros también estamos limitados

3. "Comparable a pre-sales / whitelist de otros proyectos"
   └─ Pero hecho a nivel de contrato

4. "Si algo sale mal, multisig puede desactivar en 1 tx"
   └─ Opción de reversión

5. "Aumenta confianza de inversor institucional"
   └─ Demuestra governance profesional
```

---

## 🚀 COMPARATIVA: CON vs SIN PROTECCIONES

### SIN PROTECCIONES (Riesgoso)

```
T+0:01  → Bots compran 80% de liquidez
T+0:30  → Whales hacen dump
T+1h    → Precio -90%
T+2h    → Comunidad molesta
T+1d    → Token muere
```

### CON PROTECCIONES (Seguro)

```
T+0:01  → Solo whitelist compra, distribución
T+0:30  → Abre público, tax muy alta
T+4h    → Tax baja, más adopción
T+24h   → Precio +50-300%, distribución sana
T+7d    → Todo free, precio estable, comunidad happy
T+30d   → Proyecto creciendo orgánicamente
```

---

## 🎯 VOTACIÓN FINAL

**PROPUESTA: Activar Protecciones Anti-Bot para Lanzamiento de LXR**

```
✅ APROBACIÓN REQUIERE: 4 de 6 signatures de Squad

BENEFICIADOS:
├─ Comunidad (protegida de bots)
├─ Token (precio protegido)
├─ Proyecto (reputación)
└─ Mercado (precedente profesional)

RIESGOS:
├─ BAJO (código auditado, reversible)
└─ MITIGABLE (multisig puede desactivar si problema)

SIGUIENTE PASO: Firmar propuesta
```

---

## 📞 CONTACTO Y PREGUNTAS

Documento técnico completo: `PLAN_LANZAMIENTO_ANTIBOT_LXR.md`

Preguntas frecuentes:

**¿Por qué 5 capas?**
- Redundancia contra bots nuevos

**¿Qué si un bot encuentra loophole?**
- Monitoreo 24/7 y desactivación rápida

**¿Los usuarios reales se afectarán?**
- NO (limites están diseñados para usuarios normales)

**¿Cuándo se quita todo?**
- 1 semana, automáticamente

---

**Documento Ejecutivo Listo para Squad Multisig**  
**Versión:** 1.0  
**Fecha:** 2026-04-29
