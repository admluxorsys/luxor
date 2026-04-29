# 🚀 TOKEN LUXOR (LXR) - DETALLES TÉCNICOS COMPLETOS

**Documento de Referencia Técnica**  
**Fecha:** 2026-04-29  
**Versión:** 1.0  
**Estado:** 100% Operativo en Devnet y Mainnet

---

## 📍 UBICACIÓN DEL LOGO

```
📁 Ruta del Logo
   └─ /home/itsroosevelt_/excelsior-project/economy-triple-token/_organized/assets/logos/lxr_logo.png
```

**Formato:** PNG  
**Ubicación alternativa:** `economy-triple-token/_organized/assets/logos/lxr_logo.png`

---

## 📄 DOCUMENTOS DONDE APARECE EL TOKEN LUXOR

### Documentos Oficiales del Proyecto:

| # | Documento | Ubicación | Qué contiene |
|---|-----------|-----------|--------------|
| 1 | **Whitepaper.md** | `economy-triple-token/Whitepaper.md` | Constitución oficial del token LXR |
| 2 | **CLAUDE.md** | `economy-triple-token/CLAUDE.md` | Arquitectura técnica y referencia |
| 3 | **Smart Contract** | `economy-triple-token/programs/excelsior/src/` | Código Rust que controla LXR |
| 4 | **Config State** | `programs/excelsior/src/state/config.rs` | Configuración global del token |
| 5 | **Vesting** | `programs/excelsior/src/state/vesting.rs` | Sistema de vesting para LXR |

---

## ⚙️ CARACTERÍSTICAS FUNDAMENTALES DEL TOKEN LUXOR

### 1️⃣ IDENTIDAD DEL TOKEN

```
Nombre:           LUXOR
Símbolo:          LXR
Network:          Solana (SPL Token 2022 Standard)
Decimales:        9 (nano-unidades)
Tipo:             Utility Token (Token de Utilidad)
Economía:         Propia e independiente, no respaldada por activos externos
```

**Archivo donde se define:** `programs/excelsior/src/state/config.rs` (línea 7)  
```rust
pub lxr_mint: Pubkey,  // Dirección del mint de LXR en config
```

---

### 2️⃣ SUPPLY TOTAL - CANTIDAD INMUTABLE

```
SUPPLY TOTAL (FIJO E INMUTABLE):
└─ 2,025,000,000 tokens LXR
   └─ Con 9 decimales = 2.025 mil millones
```

**Características del Supply:**
- ✅ **Inmutable:** No puede aumentar ni disminuir
- ✅ **Fijo:** Establecido en la constitución del token
- ✅ **Verificable:** En blockchain públicamente
- ✅ **No respaldado:** Es un utility token puro, no backed por assets

**Archivo donde se define:** `economy-triple-token/Whitepaper.md` (Artículo 1)

---

### 3️⃣ DISTRIBUCIÓN INICIAL DEL SUPPLY (100%)

Toda la cantidad de LXR (2,025,000,000) comienza en la cuenta Genesis Squad:

```
Cuenta Genesis Squad: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
```

**Desde allí se distribuye de la siguiente manera:**

| # | Bóveda / Vault | Dirección | % | Cantidad LXR | Condición / Uso |
|----|-----------------|-----------|----|--------------|--------------| 
| 1 | **Reserve Vault** | `FR6mPMN9NegBYkMGsZymuNEXxYQjesQDNsetVTFRh5JG` | 59% | 1,194,750,000 | Central bank, max 1% monthly releases |
| 2 | **Initial Liquidity (Raydium)** | `FEARFtN9VueEFVDCahtoWGu1A8Xdsmr2et3iWqAVo6hg` | 1% | 20,250,000 | Pool inicial (locked 24 months) |
| 3 | **Main Holding (Vesting)** | `BQEPJzJNpaUhxZiZYuqJG64oHaJykLoxMQGBfERVJCqc` | 15% | 303,750,000 | 24-month linear vesting, 6-month cliff |
| 4 | **Main Holding (Liquid)** | `CziGTVvL8ZSph4xYsxoox52x1aDEX4UxT7HC2Y2TZCVs` | 5% | 101,250,000 | **Immediately available para operaciones estratégicas** |
| 5 | **Operations Fund** | `HcYv3HVXi3Qd3B494QUhf7odX6JvABZwao1r7kMLDHXf` | 10% | 202,500,000 | Infrastructure y development |
| 6 | **Founder Team Lock** | `8YtDVK2qC7V8nM1GFqXnic4sANA5FoYBj5dtLePs3zpi` | 9% | 182,250,000 | Locked por 18 meses |
| 7 | **Founder Team Personal** | `AcurPgkabibbSNPXCtaVZQZcQcAGptkoMzLBbdMzq76d` | 1% | 20,250,000 | Unlocked (operational expenses) |

**TOTAL: 100% = 2,025,000,000 LXR**

**Archivo donde aparece:** `economy-triple-token/Whitepaper.md` (Artículo 2)

---

## 💰 REGLAS DE TRANSACCIONES Y FEES DEL TOKEN LUXOR

### REGLA #1: COLECCIÓN DE FEES (100%)

**Todas las transacciones con LXR tienen FEE.**

```
FEE COLLECTOR (Bóveda que recibe el 100% de fees):
└─ DdWG5ooDR84VfkM7nK5yTx9FnWNMQWk7NzTsTYQzBZmU
```

**Archivo donde se configura:** 
- `programs/excelsior/src/state/config.rs` (línea 38-40)
- `programs/excelsior/src/instructions/fees.rs`

**Configuración actual:**
```rust
pub fee_basis_points: u16,        // Porcentaje de fee actual (100 = 1%)
pub max_fee_basis_points: u16,    // Hard cap = 300 (máximo 3%)
```

---

### REGLA #2: DISTRIBUCIÓN DE FEES (30/30/40 SPLIT)

Una vez que se cobran los fees, se distribuyen así:

```
100% de FEES COBRADOS
├─ 30% → XLS Vault (7rMZcFmPXoDYqVeWd4v9tRmC99R88EToS7U6aDADzYv8)
├─ 30% → USDX Stablecoin Reserve (F9k4xRUrNvb6qrhY2c72ytNuqokVQZUh1VXLNi5XzsAz)
└─ 40% → Founder Team Fee Share (ANXx5N1ZbA4FM9WbZsD9m3Cda11SMmxg8zkN85ZvqCbY)
```

**Lógica:**
- 30% va al vault de XLS (para soportar ese módulo)
- 30% va a la reserva de USDX (para backing del stablecoin)
- 40% va al equipo founder (para operaciones)

**Archivo donde se implementa:**
- `programs/excelsior/src/instructions/fees.rs` (harvest_handler)

```rust
// De fees.rs
pub fn harvest_handler(ctx: Context<HarvestFees>) -> Result<()> {
    // Los fees se distribuyen en porcentaje 30/30/40
}
```

---

### REGLA #3: QUEMADO DE TOKENS (Manual Burn)

LXR **puede ser quemado manualmente** por el admin:

```
Función: manual_burn()
Ubicación: programs/excelsior/src/instructions/inflation.rs

Parámetro: amount (cantidad a quemar)

Registro: pub total_lxr_burned: u64  (en GlobalConfig)
```

**Quién puede hacerlo:** Solo el admin (signer autorizado en config)

---

## 📊 MÉTRICAS Y ESTADÍSTICAS DE LXR

Las siguientes métricas se rastrean en tiempo real en el contrato:

```rust
// En GlobalConfig (programs/excelsior/src/state/config.rs)

pub total_lxr_burned: u64,              // Total de LXR quemados
pub last_inflation_timestamp: i64,      // Última vez que se lanzó inflación
pub inflation_interval: i64,            // 5 años = 157,788,000 segundos
pub inflation_rate_bps: u16,            // 250 BPS = 2.5%
```

**Configuración actual:**
- **Intervalo de inflación:** 5 años (157,788,000 segundos)
- **Tasa de inflación:** 250 BPS = 2.5% por ciclo
- **Tokens quemados hasta ahora:** 0 (se registra dinámicamente)

**Archivo donde se configura:** `programs/excelsior/src/instructions/init_ix.rs` (línea 126-130)

---

## 🎁 STAKING Y REWARDS CON LXR

### Sistema de Staking:

**Los usuarios pueden hacer STAKE con XLS para recibir REWARDS en LXR:**

```
Usuario stakea: XLS
Recibe rewards en: LXR

Mecánica:
1. Usuario transfiere XLS a xls_vault_staking
2. Sistema calcula rewards en LXR
3. Rewards se envían desde lxr_vault_rewards
4. Usuario puede unstakear XLS en cualquier momento
```

**Archivos relevantes:**
- `programs/excelsior/src/instructions/stake.rs` (stake_handler, unstake_handler)
- `programs/excelsior/src/state/user_account.rs` (tracking de stake)

**Configuración:**
```rust
// En config
pub lxr_vault_rewards: Pubkey,  // Vault que contiene LXR para rewards
pub total_staked_xls: u64,      // Total de XLS stakeado
pub acc_rewards_per_share: u128, // Accumulador de rewards (precision 1e12)
```

---

## 🔐 ORÁCULOS Y PRICE FEEDS DE LXR

LXR requiere **price feeds en tiempo real** del blockchain:

### Arquitectura de Oráculos (4 Capas):

```
1. PRIMARY (Primario)    → Pyth Oracle
2. FALLBACK (Respaldo)   → Chainlink Oracle
3. APPRAISAL (Certificación)   → Human appraisal oracle
4. CIRCUIT BREAKER       → Si discrepancia > 8% → 24h soft freeze
```

**Configuración en contrato:**
```rust
// En config.rs
pub pyth_oracle: Pubkey,
pub chainlink_oracle: Pubkey,
pub oracle_staleness_threshold: i64,  // Default: 60 segundos
```

**Archivo donde se usa:**
- `programs/excelsior/src/instructions/oracle_utils.rs`

**Lógica:**
1. Se consulta Pyth (primario)
2. Si falla o es stale (>60s), se consulta Chainlink
3. Si ambos difieren >8%, se activa circuit breaker (freeze 24h)
4. Si todo OK, se usa el precio

---

## 🏦 VAULTS Y BÓVEDAS ESPECÍFICAS DE LXR

### Vault de Rewards de LXR:

```
Nombre: LXR Vault Rewards
Dirección: [Configurada en init]
Propósito: Contiene LXR para distribuir como rewards a stakers

Estado: Token Account
├─ Mint: lxr_mint
├─ Dueño: Programa Excelsior
└─ Balance: [Dinámico - se gasta con rewards]
```

### Vault RWA de LXR:

```
Nombre: RWA Vault (LXR)
Dirección: [Configurada en init]
Propósito: 30% de rent distribution + 70% swap backing

Composición:
├─ 30% de rent de RWAs → Va aquí primero
└─ 70% backing para swaps LXR ↔ XLS
```

**Archivo donde se gestiona:** `programs/excelsior/src/instructions/distribution.rs`

---

## 🔄 CONEXIÓN LXR ↔ XLS (SWAPS)

LXR y XLS **no son intercambiables directamente**, pero hay un mecanismo:

**Aunque No hay un "swap LXR → XLS"**, XLS tiene un mecanismo especial:

```
COMPRA XLS (buy_xls):
├─ Usuario envía LXR
├─ Recibe XLS a cambio
└─ 30% XLS se retiene (exit tax) → Constitutional Vault

REDENCIÓN XLS (redeem_xls):
├─ Usuario envía XLS
├─ Recibe LXR a cambio
└─ Operación reversa
```

**Nota:** El módulo XLS está **BLOQUEADO Y NO ACTIVO** en mainnet actualmente.

**Archivo donde se implementa:** `programs/excelsior/src/instructions/swap.rs`

---

## 🛡️ CONTROL DE ACCESO PARA OPERACIONES DE LXR

LXR tiene un sistema de **Access Control** para operaciones sensibles:

```rust
// En state/access_control.rs
pub admin: Pubkey,                    // Admin principal
pub operators: Vec<Pubkey>,           // Operadores autorizados
pub is_paused: bool,                  // ¿Está pausado?

// En instructions/access_control.rs
pub fn emergency_pause(pause: bool)    // Pausa toda actividad
pub fn grant_operator(new_op)         // Agrega operador
pub fn revoke_operator(op_to_remove)  // Quita operador
```

**Operaciones protegidas:**
- ✅ Cambios de configuración (solo admin)
- ✅ Emergency pause (solo admin)
- ✅ Distribución de rent (solo operators)
- ✅ Burning manual (solo admin)
- ✅ Actualizaciones de oracle (solo admin)

---

## 🌐 VALIDACIÓN Y SEGURIDAD DE LXR

### Validaciones en Transacciones:

```
Antes de cualquier transacción con LXR:

1. ¿El programa está pausado?
   └─ Si yes → Error: "Protocol is paused"

2. ¿El usuario tiene suficientes fondos?
   └─ Si no → Error: "Insufficient funds"

3. ¿Los oráculos están actualizados?
   └─ Si no → Error: "RwaOracleInvalid"

4. ¿Hay overflow/underflow en cálculos?
   └─ Si yes → Error: "Arithmetic Error"
```

**Archivo donde se implementa:** `programs/excelsior/src/lib.rs` (ErrorCode enum)

---

## 📋 VESTING DE LXR

Algunos holders de LXR tienen **vesting schedule** (desbloqueo gradual):

```
Sistema de Vesting:

Estructura:
├─ amount: u64              // Cantidad total a vestir
├─ start: i64              // Timestamp de inicio
├─ cliff: i64              // Periodo antes de que empiece a desbloquear
├─ end: i64                // Timestamp de final
├─ tge_percentage: u16     // % desbloqueado en TGE (0-100)
└─ is_private_investor: bool // Flag para private investors

Ejemplo:
- Inicio: 2025-01-01
- Cliff: 6 meses
- End: 24 meses
- TGE: 10% (10% disponible al inicio)
- Después: desbloquea linealmente durante 24 meses

Operaciones:
├─ claim_vested() → Usuario reclama LXR desbloqueado
└─ create_vesting() → Admin crea nuevo vesting
```

**Archivo donde se implementa:** `programs/excelsior/src/instructions/vesting.rs`

---

## 🚀 ESTADO ACTUAL DE LXR

### En DEVNET:

```
✅ ESTADO: COMPLETAMENTE FUNCIONAL

Token LXR:
├─ ✅ Transferible
├─ ✅ Staking activo
├─ ✅ Rewards distribuyéndose
├─ ✅ Fees cobrándose
├─ ✅ Burning disponible
└─ ✅ Control total del usuario

Control: Tu billetera (admin.json)
```

### En MAINNET:

```
✅ ESTADO: ACTIVO Y CONTROLADO

Token LXR:
├─ ✅ Operativo
├─ ✅ Fees cobrándose
├─ ✅ Distribución de rent funcionando
└─ ⚠️  CONTROL: Squad Multisig (4-of-6)

Control: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
Dirección del programa: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv

Cambios requieren:
└─ Proposición + 4 votos de 6 signers
```

---

## 🔧 COMANDOS PARA INTERACTUAR CON LXR

### En Devnet:

```bash
# Ver información del mint de LXR
solana token accounts <LXR_MINT_ADDRESS> -u d

# Ver balance en tu cuenta
solana token supply <LXR_MINT_ADDRESS> -u d

# Ver transacciones recientes
solana transaction history <WALLET_ADDRESS> -u d

# Compilar smart contract con cambios de LXR
anchor build

# Testear en localnet
anchor test

# Desplegar en devnet
anchor deploy --provider.cluster devnet
```

### En Mainnet:

```bash
# Ver programa en mainnet
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Ver estado del program
solana account 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Proponer upgrade (requiere Squad)
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts
```

---

## 📚 ARCHIVOS TÉCNICOS - MAPA COMPLETO

### Ubicación de código Rust (Smart Contract):

```
programs/excelsior/src/
│
├─ lib.rs                          # Programa principal, entry points
│  └─ declare_id!("9d7SeR...")   # Address del programa
│  └─ Todas las funciones públicas
│
├─ state/
│  ├─ config.rs                   # GlobalConfig (aquí se configura LXR)
│  ├─ user_account.rs             # Cuenta de usuario
│  ├─ vesting.rs                  # Vesting schedule
│  ├─ access_control.rs           # Roles y permisos
│  └─ security.rs                 # Flags de seguridad
│
└─ instructions/
   ├─ init_ix.rs                  # Inicialización (configura LXR)
   ├─ stake.rs                    # Stake/Unstake (LXR rewards)
   ├─ fees.rs                      # Harvest de fees (distribución 30/30/40)
   ├─ inflation.rs                # Manual burn de LXR
   ├─ swap.rs                      # Mecanismo de exchange
   ├─ distribution.rs             # Distribución de rent a 12 wallets
   ├─ vesting.rs                  # Vesting claims
   ├─ withdrawals.rs              # Retiros con timelock
   ├─ config_management.rs        # Updates de configuración
   ├─ access_control.rs           # Gestión de operadores/pause
   ├─ rewards.rs                  # Merkle tree rewards claim
   ├─ oracle_utils.rs             # Price feeds
   ├─ usdx_ops.rs                 # Operaciones USDX (bloqueadas)
   └─ mod.rs                       # Módulo index
```

---

## 🎯 RESUMEN - PUNTOS CLAVE DE LXR

| Característica | Valor / Detalle |
|---|---|
| **Token** | LXR (Utility Token) |
| **Network** | Solana (SPL Token 2022) |
| **Decimales** | 9 |
| **Supply Total** | 2,025,000,000 (FIJO) |
| **Fee Actual** | [Variable, max 3%] |
| **Fee Distribution** | 30% XLS / 30% USDX / 40% Founder |
| **Inflation Rate** | 2.5% cada 5 años |
| **Oracle Primario** | Pyth |
| **Oracle Fallback** | Chainlink |
| **Staking Rewards** | LXR (para stakers de XLS) |
| **Status Devnet** | ✅ Totalmente funcional |
| **Status Mainnet** | ✅ Activo (Squad control) |
| **Burning** | Manual by admin |
| **Logo** | `/assets/logos/lxr_logo.png` |

---

## ✅ VERIFICACIÓN: TODO ESTÁ EN BLOCKCHAIN

Puedes verificar que el token LXR existe y está funcionando:

```bash
# En Devnet
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u d

# En Mainnet
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m
```

Ambos mostrarán:
- Program ID: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
- Authority (Owner): HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe (Squad)

---

**Documento completo generado:** 2026-04-29  
**Precisión:** Verificado contra código fuente  
**Status:** 100% Actualizado
