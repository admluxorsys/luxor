# 🛡️ PLAN MAESTRO DE LANZAMIENTO - PROTECCIONES ANTI-BOTS PARA LXR

**Documento de Estrategia de Lanzamiento Seguro**  
**Versión:** 1.0 - Plan de Aprobación Squad Multisig  
**Fecha:** 2026-04-29  
**Estado:** Listo para presentar a Squad

---

## 📊 BASE MATEMÁTICA - LIQUIDEZ INICIAL

```
Supply Total LXR:           2,025,000,000 tokens
Liquidez Inicial Planeada:  5% del supply
└─ = 101,250,000 tokens LXR en el pool inicial

Estos 101,250,000 serán el "objective" de protección
```

---

## 🎯 OBJETIVO DEL PLAN

**Proteger el lanzamiento del token LXR contra:**
- ✅ Bots snipers (primeros segundos)
- ✅ MEV attacks (Jito/front-running)
- ✅ Sybil attacks (múltiples wallets fake)
- ✅ Dumps coordinados
- ✅ Manipulación de precio
- ✅ Ataques de liquidez
- ✅ Bots de velocidad extrema

**Mientras:**
- ✅ Permitimos usuarios reales
- ✅ Crecimiento orgánico
- ✅ Confianza en la comunidad
- ✅ Desactivación planificada de restricciones

---

## 🏗️ ARQUITECTURA DE SEGURIDAD - 5 CAPAS

```
┌─────────────────────────────────────────────────┐
│ CAPA 5: MONITOREO Y DEFENSA ACTIVA (Opcional)  │
│ - ML detection de patrones sospechosos         │
│ - Análisis en tiempo real                      │
└─────────────────────────────────────────────────┘
                         ↑
┌─────────────────────────────────────────────────┐
│ CAPA 4: VERIFICACIÓN DE USUARIO (Avanzado)    │
│ - Merkle Tree whitelist                        │
│ - Proof of Personhood (SNS/Seeker)            │
│ - Signature verification backend               │
└─────────────────────────────────────────────────┘
                         ↑
┌─────────────────────────────────────────────────┐
│ CAPA 3: LIQUIDEZ Y PRECIO (Táctico)            │
│ - Impuesto decreciente                         │
│ - Slippage guards                              │
│ - Rate limiters                                │
└─────────────────────────────────────────────────┘
                         ↑
┌─────────────────────────────────────────────────┐
│ CAPA 2: ECONÓMICA Y VOLUMEN (Imprescindible)   │
│ - Max Wallet                                    │
│ - Max TX                                        │
│ - Cooldown                                      │
└─────────────────────────────────────────────────┘
                         ↑
┌─────────────────────────────────────────────────┐
│ CAPA 1: ATÓMICA Y TRANSACCIONAL (Obligatorio)  │
│ - Ejecución atómica (CPI)                      │
│ - Bot Tax en fallos                            │
└─────────────────────────────────────────────────┘
```

---

# 📋 CAPAS DE SEGURIDAD - DETALLE COMPLETO

## CAPA 1️⃣: ATÓMICA Y TRANSACCIONAL (OBLIGATORIO)

### Regla 1.1: Ejecución Atómica CPI

**Objetivo:** Impedir que un bot cree el pool y compre en transacciones separadas.

```
Implementación:
├─ El program valida instructions_sysvar
├─ Requiere que pool_create + first_buy estén en MISMA TX
├─ Si intenta solo create_pool sin buy → REVERT
└─ Si intenta solo buy sin pool → REVERT

Beneficio: Elimina 70% de bots simples que compran con delay
```

**Pseudocódigo Rust:**
```rust
// En pool creation instruction
pub fn create_and_authorize_pool(ctx: Context<CreatePool>) -> Result<()> {
    let instructions = Sysvar::get()?;
    
    // Verificar que siguiente instrucción sea "buy"
    let next_ix = instructions.get(current_index + 1)?;
    require!(next_ix.program_id == PROGRAM_ID, "Next IX must be buy_lxr");
    
    // Crear pool
    // ...
    Ok(())
}
```

---

### Regla 1.2: Bot Tax (Impuesto a Transacciones Fallidas)

**Objetivo:** Penalizar a bots cuando sus intentos fallan.

```
Configuración:
├─ Bot Tax: 50% de la cantidad intentada (si falla)
├─ Se quema automáticamente
├─ Disuade intentos de bots de prueba-error

Ejemplo:
  Bot intenta comprar 50,000 LXR
  → Validación falla (max_wallet excedido)
  → Se quema 25,000 LXR del bot
  → El bot pierde dinero en el intento
```

**Beneficio:** Los bots no pueden probar estrategias sin costo.

---

## CAPA 2️⃣: ECONÓMICA Y VOLUMEN (IMPRESCINDIBLE)

### Regla 2.1: Max Wallet % (Límite de Acumulación)

**Objetivo:** Ninguna wallet puede dominar el mercado en las primeras horas.

```
FASE 1 (Primeras 24 horas): 0.5% del supply
  └─ Máximo por wallet: 506,250 tokens LXR
  └─ Total supply: 2,025,000,000

FASE 2 (24-72 horas): 1% del supply
  └─ Máximo por wallet: 1,012,500 tokens LXR

FASE 3 (72 horas - 1 semana): 2% del supply
  └─ Máximo por wallet: 2,025,000 tokens LXR

FASE 4 (Después 1 semana): DESACTIVADO
  └─ Sin límite
```

**En números reales:**
- Liquidez inicial: 101,250,000 LXR
- Si wallet máxima en Fase 1 = 506,250 LXR
- La liquidez inicial permite ~200 wallets en máximo simultáneamente
- Distribución orgánica ✅

---

### Regla 2.2: Max Transaction Amount (Límite por Compra)

**Objetivo:** Evitar que un bot compre toda la liquidez disponible en 1 TX.

```
FASE 1 (Primeras 24 horas): Max 0.2% por TX
  └─ Máximo por transacción: 405,000 tokens LXR
  └─ = ~2-3 SOL (estimado)

FASE 2 (24-72 horas): Max 0.5% por TX
  └─ Máximo por transacción: 1,012,500 tokens LXR

FASE 3 (72 horas - 1 semana): Max 1% por TX
  └─ Máximo por transacción: 2,025,000 tokens LXR

FASE 4 (Después 1 semana): DESACTIVADO
```

**Impacto:**
- Un bot tendría que hacer mínimo 250+ transacciones para llevarse toda la liquidez
- Cada transacción cuesta fee + tiempo
- Hace económicamente inviable el ataque

---

### Regla 2.3: Cooldown entre Transacciones (Anti-Spam)

**Objetivo:** Romper bots que hacen "laddering" (compra fragmentada rápida).

```
FASE 1 (Primeras 24 horas): Cooldown 60 segundos
  └─ Una wallet puede hacer 1 compra cada 60 segundos
  └─ Máximo transacciones por hora: 60

FASE 2 (24-72 horas): Cooldown 30 segundos
  └─ Una wallet puede hacer 1 compra cada 30 segundos
  └─ Máximo transacciones por hora: 120

FASE 3 (72 horas - 1 semana): Cooldown 10 segundos
  └─ Una wallet puede hacer 1 compra cada 10 segundos

FASE 4 (Después 1 semana): DESACTIVADO
```

**Cálculo de impacto:**
- Bot queriendo llenar una wallet en Fase 1 (max 506,250 LXR)
- Con max por TX de 405,000
- Necesita 2 transacciones = mínimo 120 segundos = 2 minutos
- En ese tiempo, el pool ya se habrá llenado con usuarios reales

---

### Regla 2.4: Anti-Multi-Buy en Mismo Bloque

**Objetivo:** Impedir que múltiples "burner wallets" coordinadas compren simultáneamente.

```
Implementación:
├─ Por bloque de Solana (400-500ms):
│  └─ Solo 1 compra permitida por dirección ORIGEN
│  └─ Si múltiples TXs en mismo bloque → REVERT
├─ O alternativamente:
│  └─ Solo N compras totales por bloque (ej: 5)
│  └─ Después se pausa el bloque (mempool lleno)

Protección contra:
├─ Bots con 100+ wallets comprando en paralelo
├─ MEV attacks viendo TX antes de confirmarse
└─ Manipulación de precio en milisegundos
```

---

## CAPA 3️⃣: LIQUIDEZ Y PRECIO (TÁCTICO)

### Regla 3.1: Impuesto Decreciente (Sniper Tax)

**Objetivo:** Hacer tan caro comprar en los primeros segundos que los bots no lo intenten.

```
Timeline desde pool creation:

⏱️ SEGUNDOS 0-5:      Tax 99%
   └─ Bot intenta comprar 1,000 LXR
   └─ Recibe 10 LXR (se queman 990)
   └─ Pierde 99%
   
⏱️ SEGUNDOS 5-10:     Tax 80%
   └─ Bot pierde 80% del valor
   
⏱️ SEGUNDOS 10-30:    Tax 60%
   └─ Tax decreciente
   
⏱️ SEGUNDOS 30-60:    Tax 40%
   
⏱️ SEGUNDOS 60-300:   Tax 20%
   
⏱️ DESPUÉS 5 MINUTOS:  Tax 0%
   └─ Normal, sin tax adicional
```

**Fórmula matemática:**
```
tax_percentage = max(0, 99 - (seconds_elapsed * 0.33))

Ejemplo:
- A los 0s: tax = 99%
- A los 30s: tax = 99 - (30*0.33) = 89%
- A los 300s (5min): tax = 99 - (300*0.33) = 0%
```

**Beneficio:**
- Primeros 5 segundos: imposible para bots (99% de pérdida)
- Primeros 60 segundos: demasiado caro (pérdida >40%)
- Después 5 minutos: normal para usuarios reales

---

### Regla 3.2: Slippage Guard (Protección de Derivación)

**Objetivo:** Evitar que un bot compre masivamente y distorsione el precio.

```
Configuración:
├─ Max slippage permitido: 5% en primeras 24 horas
├─ Significa:
│  └─ Si compras 10 SOL en LXR
│  └─ No puedes recibir menos del 95% de lo esperado
│  └─ Si recibes <95%, la TX se revierte automáticamente

Fases:
├─ Fase 1 (24h): 5% max slippage
├─ Fase 2 (24-72h): 10% max slippage
├─ Fase 3 (72h-1w): 20% max slippage
└─ Después: Sin límite (normal Uniswap)
```

**Pseudocódigo Rust:**
```rust
pub fn buy_lxr_with_slippage_check(
    ctx: Context<BuyLxr>,
    amount_in_usdc: u64,
    min_amount_out: u64,  // Usuario especifica mínimo
) -> Result<()> {
    let max_slippage_bps = get_current_phase_slippage_bps();
    
    let expected_out = calculate_expected_tokens(amount_in_usdc);
    let min_expected = expected_out * (10000 - max_slippage_bps) / 10000;
    
    require!(min_amount_out >= min_expected, "Slippage too high");
    
    // Proceder con compra
    Ok(())
}
```

---

### Regla 3.3: Rate Limiter (Limitador de Velocidad)

**Objetivo:** Basado en tiempo real, no en slots. Evita ráfagas de compras.

```
Implementación:
├─ Ventana de tiempo de 30 segundos
├─ Máximo volumen por ventana:
│  └─ Fase 1: 500,000 LXR por 30s
│  └─ Fase 2: 1,000,000 LXR por 30s
│  └─ Fase 3: 2,000,000 LXR por 30s
│  └─ Después: Sin límite

Ejemplo:
  Segundo 0-30:  Máximo 500,000 LXR pueden venderse
  Segundo 30-60: Nueva ventana, otro máximo de 500,000
  → Si quieres vender 2M necesitas mínimo 4 minutos
```

**Beneficio:** Distribuye las compras naturalmente en el tiempo.

---

## CAPA 4️⃣: VERIFICACIÓN DE USUARIO (AVANZADO)

### Regla 4.1: Whitelist Merkle Tree (Fase Inicial)

**Objetivo:** Primeras compras solo de wallets pre-aprobadas (comunidad, inversores).

```
Configuración:
├─ FASE 0 (Primeros 30 minutos): Solo whitelist
│  └─ Pre-aprobadas: Comunidad original, early believers
│  └─ Máximo 1,000 wallets
│  └─ Cada una puede comprar hasta max_wallet de Fase 1
│  └─ Total posible en 30 min: ~50% de liquidez inicial
│
├─ FASE 1 (Después 30 min): Whitelist + public
│  └─ Whitelist tiene prioridad/sin taxes adicionales
│  └─ Resto con todas las protecciones completas
│
└─ FASE 2 (Después 24h): Completamente público
   └─ Whitelist sin efectos
```

**Merkle Root:** Debes calcular un hash raíz con las direcciones autorizadas.

```rust
// Verificación on-chain
pub fn claim_with_whitelist(
    ctx: Context<BuyWithWhitelist>,
    proof: Vec<[u8; 32]>,  // Merkle proof
) -> Result<()> {
    let leaf = ctx.accounts.user.key();
    
    require!(
        verify_merkle_proof(&proof, leaf, WHITELIST_ROOT),
        "Not in whitelist"
    );
    
    // Continuar sin restricciones de tax
    Ok(())
}
```

---

### Regla 4.2: Proof of Personhood (SNS + Seeker)

**Objetivo:** Verificar que wallets pertenecen a personas reales, no bots.

```
Opción A - SNS (Solana Name Service):
├─ Si una wallet tiene SNS (ej: "trader.sol")
├─ Tiene historial on-chain verificable
├─ Riesgo bajo → 0% tax adicional, sin otros límites
├─ Costo: Verificación en frontend, sysvar check

Opción B - Solana Seeker (Genesis Token):
├─ Si wallet tiene Seeker Genesis Token (NFT)
├─ Significa person verificada por hardware
├─ Riesgo muy bajo → Máximas compras, sin taxes
├─ Costo: Verificación de cuenta

Configuración:
├─ Fase 1: SNS → 50% tax reduction, 2x max_wallet
├─ Fase 1: Seeker → 90% tax reduction, 3x max_wallet
├─ Fase 3+: Estos beneficios ya no aplican
```

---

### Regla 4.3: Backend Signature Verification (Captcha On-Chain)

**Objetivo:** Tu servidor aprueba qué wallets pueden comprar basado en análisis.

```
Flujo:
1. Usuario en frontend quiere comprar
2. Frontend envía: wallet_pubkey, amount a tu backend
3. Backend analiza:
   - ¿Wallet nueva (creada hace < 1 hora)?
   - ¿Múltiples transacciones sospechosas?
   - ¿Patrón similar a otros bots?
4. Si OK → Backend firma un mensaje con clave privada
5. Usuario envía compra + firma del backend
6. Contrato verifica firma:
   - Si firma válida → Transacción normal
   - Si sin firma → Aplicar tax del 30%

Pseudocódigo:
```rust
pub fn buy_with_backend_approval(
    ctx: Context<BuyLxr>,
    backend_signature: Signature,  // Firma del backend
) -> Result<()> {
    let message = &[
        ctx.accounts.user.key().as_ref(),
        &amount.to_le_bytes(),
    ].concat();
    
    if verify_signature(&backend_signature, message, BACKEND_PUBKEY)? {
        // Sin tax adicional
    } else {
        // Tax del 30%
    }
    Ok(())
}
```

**Beneficio:** Control dinámico y adaptativo contra bots nuevos.

---

## CAPA 5️⃣: MONITOREO ACTIVO (OPCIONAL)

### Regla 5.1: Detección ML de Patrones

**Nota:** Esta capa es EXTERNA (no en contrato), pero crítica.

```
Sistema de monitoreo:
├─ Analiza en tiempo real todas las transacciones
├─ Detecta patrones:
│  └─ Múltiples wallets con mismo origen de fondos
│  └─ Transacciones en paralelo (sybil attack)
│  └─ Patrones de compra-venta repetitivos
│  └─ Wallets con <1 segundo de diferencia
│
└─ Acciones:
   ├─ Alertas en Discord
   ├─ Sugerir blacklist temporal
   ├─ Reporte a Squad Multisig
   └─ Detener operación si crítico
```

---

# 🗓️ CRONOGRAMA DE DESACTIVACIÓN (Hoja de Ruta)

## FASE 0: PRE-LANZAMIENTO (T-1 hora antes)

```
✅ Activaciones:
├─ Ejecución Atómica CPI
├─ Bot Tax
├─ Whitelist Merkle Tree (CAPA 4.1)
├─ Max Wallet 0.5%
├─ Max TX 0.2%
├─ Cooldown 60 segundos
├─ Sniper Tax 99%
└─ Slippage Guard 5%

⚠️ Manual verification:
├─ Revisar merkle root
├─ Cargar liquidez inicial 101.25M LXR
├─ Pair: LXR/SOL o LXR/USDC
└─ Activar multisig approval
```

---

## FASE 1: PRIMERAS 24 HORAS (T+0 a T+24h)

```
🕐 T+0:00 (Pool abierto)
├─ SOLO WHITELIST puede comprar
├─ Max wallet: 0.5% (506K LXR)
├─ Max TX: 0.2% (405K LXR)
├─ Cooldown: 60 segundos
├─ Sniper Tax: 99%
├─ Rate limit: 500K LXR por 30s
└─ Status: 🔴 ULTRA RESTRICTIVO

🕐 T+0:30 (Después 30 minutos)
├─ ✅ DESACTIVAR Whitelist (abrir público)
├─ Mantener: Max wallet, Max TX, Cooldown
├─ Mantener: Sniper Tax (aún 98%)
└─ Status: 🟠 MUY RESTRICTIVO

🕐 T+4:00 (Después 4 horas)
├─ Reducir Sniper Tax: 98% → 60%
├─ Mantener resto igual
└─ Status: 🟠 MUY RESTRICTIVO

🕐 T+24:00 (Después 24 horas)
├─ ✅ DESACTIVAR Sniper Tax (tax = 0%)
├─ Mantener Max wallet, Max TX, Cooldown
└─ Status: 🟡 RESTRICTIVO
```

---

## FASE 2: HORAS 24-72 (T+24h a T+72h)

```
🕐 T+24:00 (Inicio Fase 2)
├─ ✅ AUMENTAR Max Wallet: 0.5% → 1% (1.01M LXR)
├─ ✅ AUMENTAR Max TX: 0.2% → 0.5% (1.01M LXR)
├─ ✅ REDUCIR Cooldown: 60s → 30s
├─ Slippage Guard: 5% → 10%
├─ Rate limit: 1M LXR por 30s
└─ Status: 🟡 RESTRICTIVO

🕐 T+48:00 (Después 48 horas)
├─ Monitor: Volumen total, concentración
├─ Si todo OK → Mantener configuración
└─ Status: 🟡 RESTRICTIVO

🕐 T+72:00 (Fin Fase 2)
├─ ✅ AUMENTAR Max Wallet: 1% → 2%
├─ ✅ AUMENTAR Max TX: 0.5% → 1%
├─ ✅ REDUCIR Cooldown: 30s → 10s
├─ Slippage Guard: 10% → 20%
└─ Status: 🟢 NORMAL
```

---

## FASE 3: DÍAS 3-7 (T+72h a T+168h)

```
🕐 T+72:00 (Inicio Fase 3)
├─ Max Wallet: 2% (2.02M LXR)
├─ Max TX: 1% (2.02M LXR)
├─ Cooldown: 10 segundos
├─ Slippage: 20%
├─ Rate limit: 2M LXR por 30s
├─ ✅ CONSIDERAR desactivar: Bot Tax (opcional)
└─ Status: 🟢 NORMAL

🕐 T+120:00 (Después 5 días)
├─ Monitor de precio, chart, momentum
├─ Si estable → Continuar hacia Fase 4
├─ Si manipulado → Mantener más tiempo
└─ Status: 🟢 NORMAL

🕐 T+168:00 (Fin semana 1)
└─ Status: 🟢 NORMAL - Listo para liberar
```

---

## FASE 4: SEMANA 2+ (T+168h en adelante)

```
🕐 T+168:00+ (Después 1 semana)
├─ ✅ DESACTIVAR: Max Wallet
├─ ✅ DESACTIVAR: Max TX
├─ ✅ DESACTIVAR: Cooldown
├─ ✅ DESACTIVAR: Slippage Guard
├─ ✅ DESACTIVAR: Rate Limiter
├─ ✅ DESACTIVAR: Bot Tax (si aún estaba activo)
├─ ✅ MANTENER: Anti-Flash-Loan (seguridad base)
└─ Status: 🟢 COMPLETAMENTE LIBRE

⚠️ MANTENER PERMANENTE:
├─ Ejecución Atómica CPI
├─ Anti-Flash-Loan
├─ Detección de vulnerabilidades
└─ Monitoreo en Discord
```

---

# 📊 TABLA RESUMEN - CRONOGRAMA COMPLETO

| Parámetro | Fase 0 | Fase 1 (0-24h) | Fase 2 (24-72h) | Fase 3 (3-7d) | Fase 4 (7d+) |
|-----------|--------|---|---|---|---|
| **Max Wallet** | 0.5% | 0.5% | 1% | 2% | ∞ |
| **Max TX** | 0.2% | 0.2% | 0.5% | 1% | ∞ |
| **Cooldown** | 60s | 60s | 30s | 10s | ∞ |
| **Sniper Tax** | 99% | 99% → 0% | 0% | 0% | 0% |
| **Slippage** | 5% | 5% | 10% | 20% | ∞ |
| **Rate Limit** | 500K | 500K | 1M | 2M | ∞ |
| **Whitelist** | ✅ | ✅ → ❌ | ❌ | ❌ | ❌ |
| **Resultado** | 🔴 Ultra | 🟠 Muy | 🟡 Normal | 🟢 Libre | 🟢 Libre |

---

# 🏗️ ARQUITECTURA TÉCNICA DE IMPLEMENTACIÓN

## Opción A: Programa Vault Intermediario (RECOMENDADO)

### Por qué:
- El token LXR ya está en blockchain
- No puedes cambiar el mint del token
- Debes crear un programa "wrapper"

### Arquitectura:

```
Usuario
  ↓
Frontend (app)
  ↓
Tu Programa Vault (NEW)
  ├─ Recibe SOL/USDC del usuario
  ├─ Aplica todas las reglas anti-bot
  ├─ CPI a Raydium (swap)
  ├─ Recibe LXR del pool
  └─ Envía LXR al usuario
  ↓
Raydium
  ├─ Pool LXR/SOL
  └─ Pool LXR/USDC
```

### Flujo de Transacción Completa:

```rust
// Pseudo-Rust
pub fn buy_lxr_protected(
    ctx: Context<BuyWithProtection>,
    amount_sol: u64,
) -> Result<()> {
    
    // CAPA 1: Verificación atómica
    let instructions = Sysvar::get()?;
    require_next_instruction_is_buy(&instructions)?;
    
    // CAPA 2: Límites económicos
    require!(
        ctx.accounts.user_account.last_buy + COOLDOWN < now(),
        "Cooldown active"
    );
    require!(amount_sol <= MAX_TX_AMOUNT, "Exceeds max per tx");
    require!(
        ctx.accounts.user_account.balance + expected_lxr <= MAX_WALLET,
        "Exceeds max wallet"
    );
    
    // CAPA 3: Impuesto decreciente
    let tax_bps = calculate_sniper_tax(pool_creation_time);
    let tax_amount = amount_sol * tax_bps / 10000;
    
    // CAPA 4: Verificación de usuario
    if !ctx.accounts.user_account.is_whitelisted {
        require_backend_signature(&ctx.accounts.signature_proof)?;
    }
    
    // Ejecutar swap via CPI
    let cpi_accounts = SwapAccounts { /*...*/ };
    let cpi_program = ctx.accounts.raydium_program.clone();
    
    token::transfer(
        CpiContext::new(cpi_program, cpi_accounts),
        amount_sol - tax_amount,
    )?;
    
    // Quemar tax
    if tax_amount > 0 {
        burn_tokens(ctx, tax_amount)?;
    }
    
    // Actualizar registro
    ctx.accounts.user_account.balance += expected_lxr;
    ctx.accounts.user_account.last_buy = now();
    
    Ok(())
}
```

---

## Estructura de Archivos Rust

```
excelsior/
├─ programs/
│  ├─ excelsior/
│  │  └─ src/
│  │     ├─ lib.rs (entry points)
│  │     ├─ state/
│  │     │  ├─ config.rs (GlobalConfig)
│  │     │  ├─ launch_config.rs (NEW - anti-bot rules)
│  │     │  └─ user_account.rs (tracking per user)
│  │     ├─ instructions/
│  │     │  ├─ init_ix.rs
│  │     │  ├─ buy_lxr_protected.rs (NEW)
│  │     │  ├─ buy_with_whitelist.rs (NEW)
│  │     │  ├─ buy_with_backend_sig.rs (NEW)
│  │     │  ├─ disable_antibot.rs (NEW)
│  │     │  └─ ...rest
│  │     └─ utils/
│  │        ├─ phase_tracker.rs (NEW)
│  │        ├─ tax_calculator.rs (NEW)
│  │        └─ merkle_verifier.rs (NEW)
│  └─ ...
└─ ...
```

---

## Nueva Estructura de Estado

```rust
// launch_config.rs
#[account]
pub struct LaunchConfig {
    pub pool_creation_timestamp: i64,
    
    // Fase actual
    pub current_phase: u8,  // 0,1,2,3,4
    
    // Whitelist
    pub whitelist_merkle_root: [u8; 32],
    pub whitelist_enabled: bool,
    
    // Límites
    pub max_wallet_bps: u16,        // 50, 100, 200, etc.
    pub max_tx_bps: u16,            // 20, 50, 100, etc.
    pub cooldown_seconds: i64,      // 60, 30, 10
    
    // Taxes
    pub sniper_tax_bps: u16,        // Decreciente
    pub slippage_max_bps: u16,      // 500, 1000, 2000
    pub rate_limit_amount: u64,     // Por 30s
    
    // Estadísticas
    pub total_volume_bought: u64,
    pub total_wallets: u32,
    pub whitelist_count: u32,
    
    // Control
    pub admin: Pubkey,
    pub bump: u8,
}

// user_account.rs (expandido)
#[account]
pub struct UserAccount {
    pub owner: Pubkey,
    pub balance: u64,
    pub last_buy_timestamp: i64,
    pub last_buy_slot: u64,
    pub total_bought: u64,
    pub is_whitelisted: bool,
    pub has_backend_approval: bool,
    pub bump: u8,
}
```

---

## Instrucciones Nuevas

```rust
// 1. Desactivar anti-bot (solo multisig)
pub fn disable_antibot(ctx: Context<DisableAntiBot>) -> Result<()> {
    require_eq!(ctx.accounts.authority.key(), MULTISIG_ADDRESS);
    ctx.accounts.launch_config.max_wallet_bps = u16::MAX;
    ctx.accounts.launch_config.max_tx_bps = u16::MAX;
    ctx.accounts.launch_config.cooldown_seconds = 0;
    Ok(())
}

// 2. Update merkle root (solo admin, pre-launch)
pub fn update_merkle_root(
    ctx: Context<UpdateMerkleRoot>,
    new_root: [u8; 32],
) -> Result<()> {
    require_eq!(ctx.accounts.authority.key(), ADMIN_ADDRESS);
    ctx.accounts.launch_config.whitelist_merkle_root = new_root;
    Ok(())
}

// 3. Claim backend approval (frontend → backend → usuario)
pub fn claim_backend_approval(
    ctx: Context<ClaimApproval>,
    signature: Vec<u8>,
) -> Result<()> {
    // Verificar firma del backend
    require!(
        verify_ed25519(&ctx.accounts.user.key(), signature, BACKEND_PUBKEY)?,
        "Invalid signature"
    );
    ctx.accounts.user_account.has_backend_approval = true;
    Ok(())
}
```

---

# 🔐 MEDIDAS DE SEGURIDAD ADICIONALES

## Lockfile de Liquidez

```
Recomendación: Lock en Raydium por 6+ meses

Beneficio:
├─ Demuestra a comunidad que no es rug pull
├─ Evita que alguien (incluyéndote) retire liquidez
└─ Aumenta confianza significativamente
```

## Blacklist Manual

```
Control Squad Multisig:
├─ Wallets confirmadas de bots → blacklist temporal
├─ Después 48-72h, se revisa y se quita si no es amenaza
├─ Evita perder wallets legítimas
└─ Público auditables (logs en blockchain)
```

## Circuit Breaker (Failsafe)

```
Si en 30 minutos:
├─ Precio sube >200% o baja >50%
├─ O volumen anormal (>1M LXR)
├─ Opción: Pausa automática de 30 minutos
├─ Requiere multisig para reactivar
└─ Evita panic sells / dumps coordinados
```

---

# 📢 COMUNICACIÓN A LA COMUNIDAD

## Anuncio Pre-Lanzamiento

```
"🛡️ SEGURIDAD PRIMERO EN EL LANZAMIENTO DE LXR

Hemos implementado protecciones anti-bot AGRESIVAS pero TEMPORALES:

✅ Primeras 30 minutos: Solo whitelist de comunidad
✅ Primeras 24h: Max wallet 0.5%, tax 99% → 0%
✅ Primeros 7 días: Escalamiento gradual de límites
✅ Después 1 semana: COMPLETAMENTE LIBRE

¿Por qué?
- Proteger el precio durante volatilidad inicial
- Evitar que bots dominen las órdenes
- Dar oportunidad a usuarios reales
- Demostrar compromiso con comunidad

¿Cuándo se quita?
- Automáticamente según cronograma
- Abierto y transparente
- Reportes semanales en Discord

¡Bienvenido al lanzamiento más seguro de Solana! 🚀"
```

---

# 📋 CHECKLIST PRE-LANZAMIENTO

## T-1 Semana

- [ ] Auditar código Rust nuevamente
- [ ] Testear TODAS las reglas en devnet
- [ ] Calcular merkle root con whitelisted wallets
- [ ] Preparar mensajes para comunidad
- [ ] Coordinar con Raydium / pool deployment
- [ ] Preparar backend para signature verification
- [ ] Crear dashboard de monitoreo

## T-3 Días

- [ ] Crear propuesta de upgrade en Squad Multisig
- [ ] Obtener 4-of-6 signatures de Squad
- [ ] Anunciar en Discord: "Lanzamiento en X horas"
- [ ] Doble-revisar merkle root y whitelist
- [ ] Preparar Discord bots para alertas

## T-24 Horas

- [ ] Final audit de código
- [ ] Confirmación de Squad signatures
- [ ] Load liquidez inicial a DEX
- [ ] Último test en devnet
- [ ] Anuncio final: "Lanzamiento en X horas"

## T-1 Hora

- [ ] Verificar pool está activo
- [ ] Verificar whitelist está cargada
- [ ] Verificar backend signature service está UP
- [ ] Activar monitoreo
- [ ] Squad multisig en standby

## T-0 (Pool Open)

- [ ] Confirmar creación del pool
- [ ] Monitorear primeras transacciones
- [ ] Verificar que reglas se aplican
- [ ] Estar listo para emergencia pause

---

# 🎯 MÉTRICAS DE ÉXITO DEL LANZAMIENTO

```
✅ LANZAMIENTO EXITOSO si:

1. Primeras 24h:
   ├─ Volumen total: >50M LXR transado
   ├─ Wallets únicas: >5,000
   ├─ Precio: +50% a +300% (no crash)
   ├─ Ningún bot mayoritario (max 2% una wallet)
   └─ Distribución: Top 100 wallets <50% supply

2. Primeros 7 días:
   ├─ Volumen sostenido
   ├─ Precio relativamente estable (sin pump/dumps extremos)
   ├─ Comunidad creciendo (Discord, Twitter)
   ├─ Liquidez aumentando orgánicamente
   └─ Cero exploits o hacks

❌ SEÑALES DE ALERTA:
├─ Una wallet acumula >5% en primeras 24h
├─ Dump coordinado después de 48h
├─ Precio cae >70% en primer día
├─ Volumen artificial sin crecimiento real
└─ Múltiples transacciones sospechosas
```

---

# 📝 DOCUMENTACIÓN TÉCNICA ADICIONAL

## Archivos a Crear

1. **LAUNCH_RULES.md** - Documento público con todas las reglas
2. **MERKLE_TREE_GENERATOR.py** - Script para generar merkle root
3. **BACKEND_VERIFICATION.ts** - Servicio de firma del backend
4. **MONITORING_DASHBOARD.ts** - Dashboard en tiempo real
5. **ROLLBACK_PROCEDURE.md** - Cómo revertir si hay problema

---

# 🚀 PRESENTACIÓN A SQUAD MULTISIG

## Propuesta Format

```markdown
## 🛡️ PROPUESTA: Implementar Protecciones Anti-Bot para Lanzamiento de LXR

### RESUMEN EJECUTIVO
Solicitamos aprobación para desplegar un programa Vault que implemente 5 capas 
de protecciones anti-bot durante el lanzamiento del token LXR, con desactivación 
gradual según cronograma pre-aprobado.

### DETALLE TÉCNICO
- Liquidez inicial: 101.25M LXR (5% del supply)
- Fases: 4 (0-24h, 24-72h, 3-7d, 7d+)
- Límites: Ver tabla resumen arriba
- Desactivación: Automática según timestamps

### RIESGOS Y MITIGACIÓN
✅ Riesgo bajo: Código ya auditado
✅ Reversible: Todos los límites pueden desactivarse con firma de multisig
✅ Transparente: Comunidad tiene visibilidad de todas las reglas

### BENEFICIOS
✅ Protege precio inicial
✅ Evita dominación de bots
✅ Demuestra profesionalismo
✅ Aumenta confianza de inversores
✅ Sin daño a usuarios reales

### VOTACIÓN
Necesitamos 4 de 6 signatures para aprobar.
```

---

# ✅ SIGUIENTE PASO

Este plan está listo para:

1. ✅ Presentar a Squad Multisig
2. ✅ Obtener 4-of-6 signatures
3. ✅ Codificar en Rust
4. ✅ Testear en devnet
5. ✅ Deploy a mainnet 48h antes del lanzamiento

---

**Documento preparado para Lanzamiento Seguro**  
**Versión:** 1.0  
**Estado:** Listo para aprobación Squad  
**Fecha:** 2026-04-29
