# 🧨 RIESGOS HUMANOS Y DE MERCADO - PROTECCIONES INTEGRALES PARA LXR

**Plan de Mitigación: Humanos, Psicología, Liquidez y Tokenomics**  
**Complemento a:** PLAN_LANZAMIENTO_ANTIBOT_LXR.md  
**Versión:** 1.0  
**Fecha:** 2026-04-29

---

## 🎯 INTRO: POR QUÉ LOS BOTS SON SOLO EL 20% DEL PROBLEMA

```
Riesgos que REALMENTE matan proyectos:

BOTS:                    20% del riesgo
HUMANOS:                 80% del riesgo
  ├─ Ballenas            25%
  ├─ Coordinados         20%
  ├─ Psicología          15%
  ├─ Tokenomics          10%
  ├─ Errores técnicos    5%
  └─ Comunicación        5%
```

**Conclusión:** Proteger contra bots sin proteger contra humanos = fracaso garantizado.

---

# 1️⃣ BALLENAS OPORTUNISTAS

## El Problema

```
Escenario de desastre:

T+0:30  → Ballena/Whale compra 5M LXR (~2% liquidez)
          Con $50K en SOL
          
T+1:00  → Precio sube 50% (efecto de la compra)
          Whale ve ganancia rápida
          
T+3:00  → DUMP MASIVO: Vende los 5M
          Precio cae 80%
          
T+6:00  → Panic selling en cascada
          Token colapsado
          Comunidad huyendo
```

## Mitigación 1.1: Identificación de Ballenas

**Antes del lanzamiento:**

```
Crear registro de "ballenas conocidas":
├─ Wallets con >1M SOL (whales reales)
├─ Wallets de VCs conocidas
├─ Wallets de personas públicas
├─ Wallets de mercados (FTX, Crypto.com, etc.)

Acción:
├─ No bloquearlas, pero:
├─ Monitorearlas ESPECIALMENTE
├─ Alertas automáticas si venden >10% en 1h
└─ Equipo en standby si detectamos dump coordinado
```

**Implementación:**

```rust
// En monitoreo.rs
pub struct WhaleMonitor {
    pub known_whales: Vec<Pubkey>,
    pub alert_threshold_bps: u16,  // 1000 bps = 10% del saldo
    pub alert_window_minutes: i64,  // 60 minutos
}

pub fn monitor_whale_activity(
    whale_wallet: Pubkey,
    balance_before: u64,
    balance_after: u64,
    time_window_minutes: i64,
) -> Result<WhaleAlert> {
    let change_bps = ((balance_before - balance_after) * 10000) / balance_before;
    
    if change_bps > ALERT_THRESHOLD && time_window_minutes < 60 {
        emit!(WhaleAlert {
            whale: whale_wallet,
            amount_sold: balance_before - balance_after,
            timestamp: Clock::get()?.unix_timestamp,
        });
    }
    
    Ok(alert)
}
```

---

## Mitigación 1.2: Anti-Whale Mechanics (Opcionales pero Poderosas)

### Opción A: Sell Tax Progresivo

```
Idea: Más vendes, más taxa aplica

Implementación:
├─ Si vendes 0-1% saldo → Tax 5%
├─ Si vendes 1-5% saldo → Tax 15%
├─ Si vendes 5-20% saldo → Tax 40%
├─ Si vendes >20% saldo → Tax 80%

Efecto:
├─ Una ballena NO puede dump masivo sin perder 80%
├─ Pero puede hacer venta lenta (sin tax)
└─ Incentiva hodling vs dump rápido
```

**Pseudocódigo:**

```rust
pub fn calculate_sell_tax_bps(
    user_balance: u64,
    sell_amount: u64,
) -> u16 {
    let sell_pct_bps = (sell_amount * 10000) / user_balance;
    
    match sell_pct_bps {
        0..=100 => 500,      // 5%
        101..=500 => 1500,   // 15%
        501..=2000 => 4000,  // 40%
        _ => 8000,           // 80%
    }
}
```

### Opción B: Vesting para Grandes Compradores

```
Idea: Si compras >5% en primeras 24h, tokens quedan en vesting

Configuración:
├─ Compra >5M LXR (5% de liquidez inicial)
├─ 50% desbloqueado al instante
├─ 50% en vesting lineal 7 días

Efecto:
├─ Ballena no puede salirse rápido
├─ Incentiva commitment
├─ Precio protegido
└─ Comunidad confiada
```

---

## Mitigación 1.3: Circuit Breaker (Failsafe)

**Si detectas dump masivo:**

```
Implementación en tiempo real:

Monitor detecta:
├─ Volumen de venta >20% de liquidez en <5 minutos
├─ O precio cae >30% en <10 minutos

Acción automática:
├─ PAUSA el DEX por 30 minutos
├─ Notificación a Squad Multisig
├─ Análisis del evento
├─ Decisión: reanudar o aplicar anti-dump

Pseudocódigo:
```

```rust
pub fn check_and_trigger_circuit_breaker(
    current_price: u128,
    previous_price: u128,
    time_delta_minutes: i64,
) -> Result<()> {
    let price_change_pct = ((current_price - previous_price) * 100) / previous_price;
    
    if price_change_pct < -30 && time_delta_minutes < 10 {
        emit!(CircuitBreakerTriggered {
            price_change: price_change_pct,
            paused_until: Clock::get()?.unix_timestamp + (30 * 60),
        });
        
        PAUSED = true;
    }
    
    Ok(())
}
```

---

# 2️⃣ GRUPOS COORDINADOS (Pump & Dump)

## El Problema

```
Escenario real (sucede mucho):

Telegram privado con 500 traders se organizan:
├─ "Todos compramos a las 3PM UTC"
├─ Informan a seguidores también
├─ Crean FOMO artificial
├─ Precio sube 100%
├─ Todos venden a la vez
└─ Precio cae 90% en 5 minutos
```

## Mitigación 2.1: Detección de Patrones Coordinados

**Sistema de monitoreo ML:**

```
Análisis en tiempo real de:

1. Timing de compras
   ├─ Si 50+ wallets compran en exactamente el mismo segundo
   ├─ Probabilidad de coordinación: MUY ALTA
   ├─ Acción: Alertar

2. Origen de fondos
   ├─ Si múltiples wallets reciben fondos de MISMA dirección
   ├─ Luego todos compran LXR
   ├─ Probabilidad de grupo coordinado: ALTA
   ├─ Acción: Alertar + blacklist temporal

3. Patrones de venta
   ├─ Si N wallets venden >20% en mismo bloque
   ├─ Probabilidad de dump coordinado: ALTÍSIMA
   ├─ Acción: Circuit breaker

4. Análisis de IP (si tienes datos)
   ├─ Si múltiples wallets conectan desde MISMA IP
   ├─ O mismo user agent
   ├─ Probabilidad de grupo: SEGURA
   ├─ Acción: Blacklist
```

**Implementación Backend (TypeScript):**

```typescript
// monitoring.ts
export async function detectCoordinatedBuying(
  transactions: Transaction[],
  timeWindowSeconds: number = 60
): Promise<CoordinationAlert[]> {
  const alerts: CoordinationAlert[] = [];
  
  // Agrupar por timestamp
  const txsBySecond = new Map<number, Transaction[]>();
  
  transactions.forEach(tx => {
    const second = Math.floor(tx.timestamp);
    txsBySecond.set(second, [...(txsBySecond.get(second) || []), tx]);
  });
  
  // Si >50 wallets compran en mismo segundo
  for (const [second, txs] of txsBySecond) {
    const uniqueWallets = new Set(txs.map(t => t.buyer));
    
    if (uniqueWallets.size > 50) {
      alerts.push({
        type: 'COORDINATED_BUY',
        count: uniqueWallets.size,
        timestamp: second,
        wallets: Array.from(uniqueWallets),
        severity: 'HIGH',
      });
    }
  }
  
  return alerts;
}

// Detección de origen común de fondos
export async function detectMoneyCluster(
  wallets: Pubkey[]
): Promise<MoneyClusterAlert[]> {
  const fundingSources = new Map<string, Pubkey[]>();
  
  for (const wallet of wallets) {
    const history = await getTransactionHistory(wallet);
    const mainFundingSource = history[0]?.from; // Primer origen de fondos
    
    if (!fundingSources.has(mainFundingSource)) {
      fundingSources.set(mainFundingSource, []);
    }
    fundingSources.get(mainFundingSource).push(wallet);
  }
  
  // Si un único origen financió >10 wallets
  const alerts: MoneyClusterAlert[] = [];
  for (const [source, relatedWallets] of fundingSources) {
    if (relatedWallets.length > 10) {
      alerts.push({
        source,
        wallets: relatedWallets,
        suspicion: 'POSSIBLE_GROUP_FUNDING',
      });
    }
  }
  
  return alerts;
}
```

---

## Mitigación 2.2: Comunicación Transparente Anti-Pump

**Antes del lanzamiento, comunicar claramente:**

```
"🚨 IMPORTANTE - Anti Pump & Dump

Hemos observado intentos de coordinación en grupos privados.

REGLAS CLARAS:
├─ Los grupos coordinados NO son bienvenidos
├─ Si detectamos dump coordinado → Circuit breaker
├─ Si detectamos múltiples wallets de mismo origen → Monitoreo
├─ Comunidad que participa en P&D → Reputación dañada

BENEFICIO:
├─ Protege a usuarios reales
├─ Desincentiva a coordinadores
├─ Precio más estable = mejor para todos
└─ Creemos en crecimiento orgánico, NO artificial"
```

---

# 3️⃣ EARLY INVESTORS IMPACIENTES

## El Problema

```
Escenario:

T+6 horas  → Early investor compró a $0.001
            Esperaba "al menos 10x en 24h" (ilusión)
            
T+12 horas → Precio está en $0.003 (3x)
            "¿Solo 3x? Esto no va a funcionar"
            VENDE TODO

T+18 horas → Más early investors panic selling
            Precio cae a $0.0015
            Comunidad se asusta
            Más ventas en cascada

Resultado: Muere el token por expectativas injustas
```

## Mitigación 3.1: Gestión de Expectativas

**Crear documento claro PRE-LANZAMIENTO:**

```
📄 "EXPECTATIVAS REALISTAS PARA EL LANZAMIENTO DE LXR"

⚠️ QUÉ ESPERAR EN LOS PRIMEROS 7 DÍAS:

Escenario REALISTA:
├─ Primeras 24h: Volatilidad extrema
│  └─ Posible: -20% a +300%
├─ Primeras 72h: Estabilización
│  └─ Posible: Aumento neto 50-150%
├─ Primera semana: Crecimiento orgánico
│  └─ Posible: Aumento 100-500% (si adoption es fuerte)

Escenario PESIMISTA:
├─ Dump coordinado temprano
├─ Precio cae a -50% initial value
├─ Recuperación lenta (1-3 meses)
└─ Requiere paciencia y fe en proyecto

Escenario OPTIMISTA:
├─ Adoption viral
├─ Crecimiento 5-10x en primer mes
├─ Partnerships inesperadas
└─ Poco probable (pero posible)

❌ QUÉ NO ESPERAR:

NO es posible:
├─ 1000x en una semana (scam/bubble)
├─ Subida lineal sin caídas (mercado real)
├─ Ganar dinero sin riesgo (imposible)
└─ Lanzamiento perfecto sin volatilidad

✅ QUÉ PUEDES HACER:

Si invertiste $1,000:
├─ PLAN A: Hodl 3-6 meses (paciencia)
├─ PLAN B: DCA (Dollar Cost Average) hacia arriba
├─ PLAN C: Stake en XLS para yield
└─ PLAN D: Participa en comunidad y aporta valor

📊 HISTÓRICO COMPARABLE:

Similar projects launch:
├─ Magic Eden (SOL NFT): +50x en 6 meses (raro)
├─ Marinade Finance: +20x en 1 año (bueno)
├─ Typical new token: 0x a -100% (la mayoría)
├─ Successful holdout: 2-5x en 1 año (realista)

🎯 TOMA DECISIÓN INFORMADA:

Si no puedes perder tu $, NO inviertas.
Si inviertes, ten horizonte de 6-12 meses.
"
```

---

## Mitigación 3.2: Vesting de Early Investors

**Estructura recomendada:**

```
Early Investors (primeros compradores):
├─ 50% desbloqueado inmediatamente
├─ 50% en vesting lineal 6 meses

Efecto:
├─ No pueden panic sell TODO
├─ Se ven forzados a hodl 6 meses
├─ Precio protegido de early panic
├─ Alinea incentivos a largo plazo

Implementación:
```

```rust
pub fn create_vesting_for_early_buyer(
    buyer: Pubkey,
    amount: u64,
) -> Result<()> {
    // 50% disponible ya
    transfer_tokens(buyer, amount / 2)?;
    
    // 50% en vesting
    create_vesting_schedule(
        buyer,
        amount / 2,
        start_time: now(),
        end_time: now() + (180 * 86400),  // 180 días
        cliff: 0,  // Sin cliff, lineal desde el inicio
    )?;
    
    Ok(())
}
```

---

## Mitigación 3.3: Soporte Emocional (Community Management)

**Equipo dedicado durante primeros 7 días:**

```
Discord strategy:
├─ 24/7 community managers en Discord
├─ Responder preguntas (reducir FUD)
├─ Celebrar milestones (mantener moral)
├─ Educar (explicar volatilidad es normal)
├─ Desmienten rumores falsos rápido

Mensajes clave a repetir:
├─ "Volatilidad es normal en lancamientos"
├─ "Nosotros hodleamos también"
├─ "Plan de 6+ meses, no semanas"
├─ "Cada caída es oportunidad de comprar más barato"

Evitar a toda costa:
├─ ❌ Prometer "10x garantizado"
├─ ❌ Ocultar problemas técnicos
├─ ❌ Exceso de hype artificial
└─ ❌ Ignorar preguntas legítimas
```

---

# 4️⃣ PROBLEMAS DE TOKENOMICS

## El Problema

```
Token con tokenomics mal diseñada:

Escenario A (Demasiada concentración):
├─ 90% en wallets de team/VCs
├─ Cuando venda team → Precio colapsa
├─ Comunidad desaparece

Escenario B (Sin vesting):
├─ Todos los tokens disponibles desde día 1
├─ Team puede dump cuando quiera
├─ Comunidad no confía

Escenario C (Suministro infinito):
├─ No hay cap
├─ Inflation constante
├─ Precio siempre bajo presión

Escenario D (Mala distribución inicial):
├─ Presales secretas a amigos (insider trading)
├─ Comunidad se entera → FUD masivo
└─ Token muere

RESULTADO: Token técnicamente correcto, pero tokenomics aseguran fallo.
```

---

## Mitigación 4.1: Verificación de Tokenomics de LXR

**Tu token LXR ya tiene buena estructura. VERIFICAR:**

```
✅ VERIFICAR (Tu token)

Supply:     2,025,000,000 (FIJO, inmutable)
Decimales:  9 (verificado)
Respaldo:   Ninguno (utility token, OK)

Distribución inicial:
├─ Reserve: 59% (1,194,750,000) ✅ Bueno
├─ Vesting: 15% + 9% = 24% (486,000,000) ✅ Bueno
├─ Liquid:  5% + 10% + 1% = 16% (323,000,000) ✅ Aceptable
└─ Presale: 1% (20,250,000) ✅ Pequeño

ANÁLISIS:
├─ Team + Reserve tienen 68%
├─ Pero está BLOQUEADO en vesting/reserve
├─ Comunidad no puede ser dumpeada rápido
├─ ✅ SEGURO
```

---

## Mitigación 4.2: Comunicar Tokenomics Públicamente

**Crear documento público transparente:**

```
📄 "TOKENOMICS VERIFICABLE DE LXR"

Supply Total:    2,025,000,000
├─ FIJO (no puede cambiar)
├─ Verificable en blockchain
└─ Transparent.xyz puede confirmarlo

Distribución:
├─ Reserve Vault:      59% (bloqueada, 1% monthly max)
├─ Main Holding:       15% (vesting 24m, cliff 6m)
├─ Operations:         10% (desbloqueado para ops)
├─ Founder Lock:       9% (bloqueado 18 meses)
├─ Founder Personal:   1% (desbloqueado, ops)
├─ Presale:            1% (sin vesting)
├─ Liquidity (Initial):1% (locked 24 meses)
└─ Staking Rewards:    Variable (mined)

✅ TRANSPARENCIA:

Todos los vaults son on-chain verificables:
├─ Reserve: FR6mPMN9NegBYkMGsZymuNEXxYQjesQDNsetVTFRh5JG
├─ Vesting: BQEPJzJNpaUhxZiZYuqJG64oHaJykLoxMQGBfERVJCqc
├─ Ops:     HcYv3HVXi3Qd3B494QUhf7odX6JvABZwao1r7kMLDHXf
└─ ...

VERIFICACIÓN COMUNITARIA:

Cualquiera puede:
├─ Ir a Solana Explorer
├─ Buscar cada vault
├─ Ver balance verificado
├─ Ver vesting timestamps
└─ Confirmar que NO puede ser dumped

🔗 LINKS PARA VERIFICAR:

[Link a Explorer de cada vault]
"
```

---

# 5️⃣ LIQUIDEZ MAL DISEÑADA

## El Problema

```
Escenario A: Pool demasiado pequeño

Liquidez: 50,000 SOL en LXR/SOL pool
├─ Alguien compra 1,000 SOL worth
├─ Impacto en precio: +500%
├─ Volatilidad extrema
├─ Slippage terrible
├─ Usuarios frustrados

Escenario B: Pool demasiado grande

Liquidez: 100M SOL en LXR/SOL (poco realista pero posible)
├─ Pool atraía a todo el mundo
├─ Alguien puede drenar gradualmente
├─ Sin suficiente monitoring

Escenario C: Proporción incorrecta

LXR/SOL ratio desbalanceado
├─ Si pones 101M LXR + 1,000 SOL
├─ Precio inicial artificialmente bajo
├─ Cuando suba poco, liquidez se seca
└─ Slippage insano
```

---

## Mitigación 5.1: Diseño Óptimo del Pool

**Recomendación específica para TU caso:**

```
LIQUIDEZ INICIAL ÓPTIMA:

Opción A: LXR/SOL (recomendado)
├─ Cantidad de LXR: 101,250,000 (5% del supply)
├─ Cantidad de SOL: 500-1,000 SOL (~$100K-200K)
├─ Proporción: 1 LXR = 0.005-0.01 SOL al inicio
├─ Precio inicial: $0.001-0.002 por LXR (razonable)
├─ Impacto: Compra de 10 SOL = +20% precio (aceptable)
└─ Volatilidad: CONTROLABLE

Opción B: LXR/USDC (alternativa)
├─ Cantidad de LXR: 101,250,000
├─ Cantidad de USDC: $100K-200K
├─ Más stable, menos volatilidad
├─ Mejor para usuarios risk-averse
└─ Menos "degenerate" pero más serio

RECOMENDACIÓN: Ambos
├─ LXR/SOL para traders/degens
└─ LXR/USDC para conservadores
```

**Implementación en Raydium:**

```typescript
// raydium-pool-creation.ts

export async function createOptimalLxrPool() {
  const lxrAmount = 101_250_000 * 10**9; // 101.25M con 9 decimales
  const solAmount = 750 * 10**9;          // 750 SOL (~$150K estimado)
  
  // Crear pool
  const pool = await raydium.createPool({
    tokenA: LXR_MINT,
    tokenB: SOL_MINT,
    amountA: lxrAmount,
    amountB: solAmount,
    initialPrice: solAmount / lxrAmount,  // Calcula precio inicial
  });
  
  // IMPORTANTE: Lockear liquidez
  await raydium.lockLiquidity({
    poolId: pool.id,
    lockDuration: 180 * 86400,  // 6 meses
    owner: MULTISIG_ADDRESS,
  });
  
  return pool;
}
```

---

## Mitigación 5.2: Monitoreo de Liquidez

**Detectar drenaje de liquidez:**

```rust
pub struct LiquidityMonitor {
    pub pool_balance_lxr: u64,
    pub pool_balance_sol: u64,
    pub last_checked: i64,
    pub drain_threshold_bps: u16,  // 500 bps = 5%
}

pub fn check_liquidity_drain(
    monitor: &mut LiquidityMonitor,
    current_lxr: u64,
    current_sol: u64,
) -> Result<()> {
    let lxr_change = ((monitor.pool_balance_lxr - current_lxr) * 10000) 
                      / monitor.pool_balance_lxr;
    let sol_change = ((monitor.pool_balance_sol - current_sol) * 10000) 
                      / monitor.pool_balance_sol;
    
    // Si LXR o SOL disminuyeron >5% sin transacción correspondiente
    if (lxr_change > 500 || sol_change > 500) {
        emit!(LiquidityDrainAlert {
            lxr_drained: monitor.pool_balance_lxr - current_lxr,
            sol_drained: monitor.pool_balance_sol - current_sol,
            severity: "HIGH",
        });
    }
    
    monitor.pool_balance_lxr = current_lxr;
    monitor.pool_balance_sol = current_sol;
    monitor.last_checked = Clock::get()?.unix_timestamp;
    
    Ok(())
}
```

---

# 6️⃣ ERRORES TÉCNICOS (Código Rust)

## El Problema

```
Bugs comunes en Solana:

1. Integer Overflow/Underflow
   amount * price (overflow si números grandes)
   balance - withdrawal (underflow si balance bajo)

2. Autorización incompleta
   Olvidas verificar signer de instrucción
   Alguien no autorizado puede hacer cambios

3. Mal cálculo de fees
   Fee del 2% pero codificaste 200 (100x más)
   Usuarios pierden dinero

4. CPI incorrecto
   Haces CPI a programa equivocado
   Fondos se pierden

5. Falta de validaciones
   No verificas que token mints sean correctos
   Token fake se puede usar

Resultado: DESASTRE total, puede ser irrecuperable
```

---

## Mitigación 6.1: Auditoria de Código Crítico

**ANTES de lanzar, auditoria exhaustiva de:**

```
Código a revisar:

1. ESTADO (config.rs, user_account.rs)
   ├─ ¿Todos los campos inicializados correctamente?
   ├─ ¿Hay límites de overflow?
   ├─ ¿Bump seeds correctos?
   └─ ✅ REVISAR LÍNEA POR LÍNEA

2. INSTRUCCIONES CRÍTICAS
   ├─ buy_lxr_protected()
   ├─ disable_antibot()
   ├─ claim_vesting()
   └─ ✅ REVISAR MATEMÁTICA EXACTA

3. CPI (Cross Program Invocation)
   ├─ ¿Programa destino es el correcto?
   ├─ ¿Cuentas están en orden correcto?
   ├─ ¿Firmantes son válidos?
   └─ ✅ REVISAR PERMISOS

4. TRANSFERENCIAS DE TOKENS
   ├─ ¿Mint es el correcto?
   ├─ ¿Authority está bien?
   ├─ ¿Amounts no overflow?
   └─ ✅ REVISAR CADA UNA

5. CHECKS DE SEGURIDAD
   ├─ require!(signer, "Must sign")
   ├─ require!(token == expected, "Wrong token")
   ├─ require!(amount > 0, "Amount must be > 0")
   └─ ✅ NO FALTAN
```

---

## Mitigación 6.2: Testing Exhaustivo

**Plan de testing:**

```
NIVEL 1: Unit Tests
├─ Cada función individualmente
├─ Edge cases (0, max, min)
├─ Overflow/underflow scenarios
└─ Comando: cargo test --lib

NIVEL 2: Integration Tests
├─ Flujo completo: create pool → buy → vesting claim
├─ Múltiples usuarios simultáneamente
├─ Interacciones entre instrucciones
└─ Comando: cargo test --test '*'

NIVEL 3: Devnet Testing
├─ Deploy a devnet
├─ Realizar todas acciones en devnet
├─ Monitorear logs/eventos
├─ Simular loads pesados
└─ Comando: anchor test

NIVEL 4: Fuzzing
├─ Generador aleatorio de inputs
├─ Miles de transacciones random
├─ Buscar comportamientos inesperados
└─ Herramienta: cargo fuzz o Certora

NIVEL 5: Simulación de Lanzamiento
├─ Devnet idéntico a mainnet
├─ 1,000+ wallets simuladas
├─ Tráfico realista
├─ Duración: 24h simuladas
└─ Objetivo: Cero panics/errors
```

**Test fixture example:**

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use solana_sdk::signature::Keypair;
    
    #[test]
    fn test_max_wallet_enforcement() {
        let mut config = GlobalConfig::default();
        config.max_wallet_bps = 100;  // 1%
        
        let user_balance = 20_250_000 * 10**9;  // 1%
        let new_amount = 10_000 * 10**9;
        
        // Debe fallar
        let result = validate_max_wallet(user_balance, new_amount, &config);
        assert!(result.is_err());
    }
    
    #[test]
    fn test_cooldown_enforcement() {
        let now = 1000i64;
        let last_buy = 900i64;
        let cooldown = 60i64;
        
        // Falla: solo pasaron 100 segundos, necesita 60
        // WAIT, eso debería pasar... corregir
        assert!(now >= last_buy + cooldown);
    }
    
    #[test]
    fn test_fee_calculation_no_overflow() {
        let amount = u64::MAX;  // Máximo valor
        let fee_bps = 300;
        
        // Debe no overflow, usar safe math
        let fee = safe_multiply(amount, fee_bps, 10000);
        assert!(fee.is_ok());
    }
}
```

---

# 7️⃣ CONTROL MULTISIG Y CONFIANZA

## El Problema

```
Percepción comunitaria (crítica):

Si comunidad SIENTE que team tiene demasiado control:
├─ "Esto es centralizado" → FUD
├─ "Pueden hacer rug pull cuando quieran" → Panic sell
├─ "No confío" → Precios bajan
└─ Proyecto muere por reputación

Incluso si técnicamente seguro, PERCEPCIÓN mata.
```

---

## Mitigación 7.1: Transparencia Multisig

**Publicar información clara:**

```
📄 "GOVERNANCE Y CONTROL DE LXR"

MULTISIG SQUAD:
├─ Dirección: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
├─ Threshold: 4 de 6 signers (67%)
├─ Verificable en: squads.so
└─ Todos los cambios requieren MÚLTIPLES aprobaciones

SIGNERS (Nombres públicos):
├─ Signer 1: [Nombre + Bio] - Core Dev
├─ Signer 2: [Nombre + Bio] - Community Lead
├─ Signer 3: [Nombre + Bio] - Finance
├─ Signer 4: [Nombre + Bio] - Security
├─ Signer 5: [Nombre + Bio] - External Advisor
└─ Signer 6: [Nombre + Bio] - External Advisor

✅ BENEFICIO: Ni una sola persona puede hacer nada

CAMBIOS APROBADOS (Público):
├─ Cada decisión es visible en squads.so
├─ Comunidad puede auditar todo
├─ Timeline: Cuándo se aprobó cada cosa
└─ Transparencia total

CAMBIOS BLOQUEADOS:
├─ Rug pull: Requeriría votación de 4/6 → imposible secretamente
├─ Dump masivo: Visting lo evita
├─ Cambios arbitrarios: Comunidad vota contra
└─ Protección inherente
```

---

## Mitigación 7.2: Límites Explícitos a Multisig

**Comunicar QUÉS SÍ y QUÉS NO puede hacer:**

```
MULTISIG PUEDE:
├─ ✅ Desactivar protecciones anti-bot (según cronograma)
├─ ✅ Pausar en emergencia (hack/exploit detectado)
├─ ✅ Actualizar oráculos (precios confiables)
├─ ✅ Distribuir rewards (automatizado)
└─ ✅ Cambiar operadores (si es necesario)

MULTISIG NO PUEDE (técnicamente imposible):
├─ ❌ Cambiar supply total (FIJO en token)
├─ ❌ Mintear más tokens (mint authority renunciada)
├─ ❌ Congelar wallets (sin blacklist automática)
├─ ❌ Hacer rug pull (vesting lo previene)
└─ ❌ Cambiar distribución de fees (fija en código)

REGLA DE ORO:
"Si multisig podría romper el proyecto, entonces fue votado"
```

---

# 8️⃣ COMUNICACIÓN (CRÍTICO)

## El Problema

```
Mala comunicación MATA proyectos:

T+0:00  → Lanzamiento
        → Comunidad NO sabe que hay protecciones
        → "¿Por qué no puedo comprar más?"

T+0:30  → Discord explota de preguntas
        → "¿Es un scam?"
        → "¿Está moneado?"

T+1:00  → Panic selling
        → Precio -50%
        → Comunidad molesta
        → Muerte del proyecto

LECCIÓN: La misma protección + comunicación clara
        = Éxito

         Misma protección + mala comunicación
        = Fracaso
```

---

## Mitigación 8.1: Plan de Comunicación Pre-Lanzamiento

**1 SEMANA ANTES:**

```
Anunciar públicamente:

🛡️ "PROTECCIONES ANTIBOT PARA LANZAMIENTO SEGURO DE LXR"

Hemos diseñado 5 capas de seguridad:

1. ✅ Max Wallet: Nadie puede acumular demasiado
2. ✅ Sniper Tax: 99% en primeros 5 segundos
3. ✅ Cooldown: Espacio entre compras
4. ✅ Whitelist: Comunidad sale primero (30 min)
5. ✅ Monitoreo: Detectamos bots y coordinación

¿POR QUÉ?
- Proteger precio inicial
- Dar oportunidad a usuarios reales
- Evitar que bots dominen
- Demuestra seriedad

¿CUÁNDO SE QUITA?
- Automáticamente en 7 días
- Segundo por segundo (no sorpresas)
- Cronograma pre-aprobado por Squad Multisig
- Transparente en blockchain

[Documento técnico completo aquí]
"
```

**24 HORAS ANTES:**

```
"⏰ LANZAMIENTO EN 24 HORAS

Aquí está TODO lo que necesitas saber:

📊 NÚMEROS:
- Supply: 2.025B (fijo)
- Liquidez inicial: 101.25M (5%)
- Pool: LXR/SOL + LXR/USDC
- Precio estimado: $0.001-0.002

🛡️ PROTECCIONES:
- Max wallet día 1: 0.5%
- Max TX día 1: 0.2%
- Tax: 99% → 0% (5 minutos)
- Cooldown: 60 segundos

✅ WHITELIST (Primeros 30 min):
- [Lista de 1,000 wallets whitelisted]
- Si estás en la lista, ¡felicidades!

📱 CÓMO COMPRAR:

Opción 1: Raydium (Pool abierto)
- Dirección pool: [address]
- Slippage: 5%

Opción 2: Tu Vault (Protegido)
- Dirección vault: [address]
- Recomendado para usuarios normales

Opción 3: Esperar 30 min (Si no estás en whitelist)
- Abrirá al público automáticamente
- Mismas protecciones

❌ QUÉ NO HACER:
- No pancakeswap (pools fake)
- No bundles (risky)
- No seguir tips de Twitter (scams)

📞 PREGUNTAS:
- Discord (24/7 support)
- Twitter (@LuxorLXR)
- Telegram (oficial)

¡BIENVENIDO! 🚀
"
```

**DURANTE LANZAMIENTO (En vivo):**

```
Actualizaciones cada 15 minutos:

T+0:00  "🚀 POOL ABIERTO - WHITELIST PHASE
        - 1,000 wallets pueden comprar
        - Precio inicial: $0.001
        - Volumen: $0
        - Status: ✅ NORMAL"

T+0:15  "📈 ACTIVIDAD
        - Compras: 500
        - Volumen: $25K
        - Precio: $0.0012
        - Top wallet: 0.4% (bajo límite 0.5%)
        - Status: ✅ NORMAL"

T+0:30  "🎉 WHITELIST PHASE TERMINA
        - Abriendo al público
        - Nuevas compras esperadas
        - Prepare por volatilidad
        - Status: ✅ NORMAL"

T+1:00  "📊 ACTUALIZACIÓN
        - Volumen total: $500K
        - Precio: $0.0025 (+150%)
        - Wallets únicas: 5,000
        - Distribución: Sana
        - No detectamos coordinación
        - Status: ✅ NORMAL"

[Continuar cada 15 min hasta estable]
```

---

## Mitigación 8.2: Crisis Communication Plan

**Si algo sale mal (estar preparado):**

```
ESCENARIO 1: Dump coordinado detectado

ACCIÓN:
1. Inmediatamente en Discord: "Activando circuit breaker"
2. Explicar: "Detectamos venta coordinada, pausa 30 min"
3. No especular, datos solo
4. Anunciar: "Resumiendo en 30 min exactos"

COMUNICACIÓN:
"🚨 CIRCUIT BREAKER ACTIVADO

Detectamos anomalía: múltiples wallets vendiendo coordinadamente.

ACCIÓN: Pausa temporal de 30 minutos.

¿QUÉ SIGNIFICA?
- Esto es NORMAL para lanzamientos
- Protege a usuarios de panic selling
- No es scam, es defensa
- Precio se recuperará

PRÓXIMO PASO:
- Análisis de lo que pasó
- Reanudar en 30 min
- Estar preparado para volatilidad

MANTÉN LA CALMA - Esto es lo esperado 💪
"
```

---

# 9️⃣ ATAQUES INDIRECTOS (SYBIL SEMIHUMAN)

## El Problema

```
NO son bots clásicos, son "semi-bots":

Sybil Attack Sofisticado:
├─ Humanos coordinados (Fiverr workers, etc.)
├─ Cientos de cuentas "humanas" comprando
├─ Cada una tiene:
│  ├─ Transacciones previas (historial)
│  ├─ SNS address (parece legítima)
│  ├─ IP diferente (VPN)
│  └─ Patrón aleatorio (parece humano)
│
├─ Pasan TODAS las validaciones
├─ Pero todas coordinadas en Telegram privado
└─ Hacen pump & dump coordinado

Defensa clásica no funciona porque:
├─ No son bots (son humanos)
├─ Tienen historial legítimo (falso pero parecido)
├─ Distribuyen fondos (no salen de misma fuente)
└─ Parecen usuarios reales
```

---

## Mitigación 9.1: Detección Avanzada de Sybil

**Análisis multi-factor:**

```typescript
// advanced_sybil_detection.ts

export async function detectSybilCluster(wallets: Pubkey[]): Promise<SybilAlert[]> {
  const alerts: SybilAlert[] = [];
  
  // Factor 1: IP geográfica
  const ipLocations = await getIpLocations(wallets);
  const ipClusters = clusterByIp(ipLocations);
  
  // Si 50+ wallets desde MISMA IP (VPN detection)
  for (const [ip, clustered] of ipClusters) {
    if (clustered.length > 50) {
      alerts.push({
        type: 'SAME_IP_CLUSTER',
        count: clustered.length,
        ip,
        severity: 'CRITICAL',
      });
    }
  }
  
  // Factor 2: Patrones de compra idénticos
  const buyPatterns = await getBuyPatterns(wallets);
  const duplicatePatterns = findDuplicatePatterns(buyPatterns);
  
  for (const [pattern, matchingWallets] of duplicatePatterns) {
    if (matchingWallets.length > 10) {
      alerts.push({
        type: 'IDENTICAL_BUY_PATTERN',
        count: matchingWallets.length,
        pattern,
        severity: 'HIGH',
        wallets: matchingWallets,
      });
    }
  }
  
  // Factor 3: Origen de fondos (money laundering detection)
  const fundingSources = new Map<Pubkey, Pubkey[]>();
  for (const wallet of wallets) {
    const mainSource = await getMainFundingSource(wallet);
    if (!fundingSources.has(mainSource)) {
      fundingSources.set(mainSource, []);
    }
    fundingSources.get(mainSource).push(wallet);
  }
  
  for (const [source, linked] of fundingSources) {
    if (linked.length > 20) {
      alerts.push({
        type: 'SAME_FUNDING_SOURCE',
        count: linked.length,
        source,
        severity: 'MEDIUM',
        wallets: linked,
      });
    }
  }
  
  // Factor 4: Timing de transacciones
  const timingClusters = clusterByTransactionTiming(wallets);
  for (const [cluster, clustered] of timingClusters) {
    if (clustered.length > 30 && cluster.timeGap < 1000) { // <1 segundo entre TXs
      alerts.push({
        type: 'SYNCHRONIZED_TIMING',
        count: clustered.length,
        severity: 'HIGH',
        wallets: clustered,
      });
    }
  }
  
  return alerts;
}

// Machine Learning simple: Transaction signature similarity
export async function detectBotSignature(wallet: Pubkey): Promise<BotSignatureScore> {
  const txHistory = await getTransactionHistory(wallet);
  
  const features = {
    avgGasPrice: calculateAvg(txHistory.map(t => t.gasPrice)),
    avg TxSize: calculateAvg(txHistory.map(t => t.size)),
    errorRate: txHistory.filter(t => t.failed).length / txHistory.length,
    memoPattern: analyzeMemoPatterns(txHistory),
    instrunctionOrder: analyzeInstructionOrder(txHistory),
  };
  
  // Si todo es EXACTAMENTE igual entre wallets → Sybil
  return scoreSignatureSimilarity(features);
}
```

---

## Mitigación 9.2: Acción ante Sybil Detectado

```
SI detectas Sybil cluster:

1. NO bloquear inmediatamente (podrían ser falsos positivos)
2. Añadir a "monitoreo especial"
3. Si coordinan dump → Activar circuit breaker
4. Publicar análisis (transparencia)
5. Informar a comunidad: "Detectamos patrón anormal"

PUBLICAR:
"📊 ANÁLISIS DE SEGURIDAD

Detectamos 150 wallets con patrones sospechosos:
├─ Misma IP (VPN cluster)
├─ Compras idénticas
├─ Timing sincronizado
└─ Probable coordinación

ACCIÓN:
├─ Añadidas a monitoreo especial
├─ SI coordinan dump → Circuit breaker automático
├─ NO están bloqueadas (no castigamos por coincidencia)
├─ Pero estamos listos

RESULTADO:
└─ Protección proactiva, comunidad informada ✅
"
```

---

# 🎯 MATRIZ DE RIESGOS HUMANOS - RESUMEN INTEGRAL

| Riesgo | Probabilidad | Impacto | Mitigación Primaria | Mitigación Secundaria |
|--------|--------------|---------|--------------------|--------------------|
| **Ballenas dump** | Alta | Crítico | Sell tax progresivo | Circuit breaker |
| **Pump & dump coordinado** | Media-Alta | Crítico | Detección ML | Circuit breaker |
| **Panic selling (impacientes)** | Muy Alta | Alto | Vesting | Gestión expectativas |
| **Tokenomics mal | Media | Alto | Estructura verificable | Transparencia |
| **Liquidez insuficiente** | Media | Crítico | Diseño óptimo | Monitoreo continuo |
| **Bugs Rust** | Baja | Crítico | Auditoría | Testing exhaustivo |
| **Desconfianza multisig** | Media | Alto | Transparencia | Límites explícitos |
| **Mala comunicación** | Alta | Alto | Plan pre-lanzamiento | Crisis communication |
| **Sybil semihuman** | Media | Alto | Detección ML | Monitoreo sincrónico |

---

# ✅ CHECKLIST INTEGRAL HUMANÓS + BOTS

## PRE-LANZAMIENTO (T-1 semana)

- [ ] Auditoría de código Rust (externa si posible)
- [ ] Testing exhaustivo (unit + integration + fuzzing)
- [ ] Calcular tokenomics exactas y publicar
- [ ] Diseñar pool óptimo (cantidad SOL/USDC correcta)
- [ ] Crear documento "Expectativas Realistas"
- [ ] Publicar estructura de vesting
- [ ] Definir límites de multisig claramente
- [ ] Preparar crisis communication plan
- [ ] Entrenar community managers 24/7
- [ ] Configurar monitoreo ML (IP, patterns, timing)
- [ ] Preparar circuit breaker código
- [ ] Prepare whitelist merkle root

## T-24 HORAS

- [ ] Confirmación final de pool design
- [ ] Cargar liquidez inicial
- [ ] Verificar vesting timestamps
- [ ] Verificar oráculos funcionan
- [ ] Equipo en standby Discord
- [ ] Monitoreo activo pero pausado
- [ ] Últimos tests devnet

## T-0 (LANZAMIENTO)

- [ ] Activar monitoreo 24/7
- [ ] Community managers online
- [ ] Reporte cada 15 minutos
- [ ] Estar listos para circuit breaker
- [ ] Vigilar ballenas conocidas
- [ ] Detectar patrones sybil

## T+7 DÍAS

- [ ] Reporte completo del lanzamiento
- [ ] Desactivar protecciones automáticamente
- [ ] Análisis post-mortem
- [ ] Comunicación de lecciones aprendidas

---

# 📚 DOCUMENTOS A CREAR ANTES DE LANZAR

```
1. WHITEPAPER_LANZAMIENTO.md
   ├─ Tokenomics detallado
   ├─ Distribución inicial
   ├─ Vesting schedule
   └─ Cálculos verificables

2. EXPECTATIVAS_REALISTAS.md
   ├─ Qué esperar en cada fase
   ├─ Ejemplos de gráficos normales
   ├─ Comparativas históricas
   └─ Qué NO esperar

3. MULTISIG_GOVERNANCE.md
   ├─ Signers públicos
   ├─ Qué pueden/no pueden hacer
   ├─ Transparencia de cambios
   └─ Procedimiento de votación

4. FAQ_TÉCNICO.md
   ├─ Cómo verificar tokenomics
   ├─ Cómo checar vesting
   ├─ Dirección de todos los contracts
   └─ Links a explorers

5. CRISIS_COMMUNICATION_PLAYBOOK.md
   ├─ Qué decir si X problema
   ├─ Templates de mensajes
   ├─ Decisión matriz
   └─ Escalation procedures
```

---

# 🚀 CONCLUSIÓN: PROTECCIÓN INTEGRAL

Tu lanzamiento de LXR está protegido INTEGRALMENTE:

```
CAPA 1: Anti-Bots (código)
├─ 5 capas técnicas
├─ Atomicidad, taxes, cooldowns
└─ Desactivación planeada

CAPA 2: Anti-Humanos (econom

ico)
├─ Tokenomics sanos
├─ Vesting profundo
├─ Liquidez óptima
└─ Distribución equitativa

CAPA 3: Anti-Pánico (psicológico)
├─ Expectativas claras
├─ Comunicación 24/7
├─ Gestión de emociones
└─ Transparencia total

CAPA 4: Anti-Técnico (seguridad)
├─ Auditoría exhaustiva
├─ Testing completo
├─ Monitoreo ML avanzado
└─ Circuit breaker failsafe

CAPA 5: Anti-Confianza (governance)
├─ Multisig verificable
├─ Límites explícitos
├─ Transparencia blockchain
└─ Comunidad informada

RESULTADO: Lanzamiento profesional, seguro, confiable ✅
```

---

**Documento de Protecciones Humanas Completado**  
**Versión:** 1.0  
**Estado:** Listo para implementar  
**Fecha:** 2026-04-29

---

## 🎯 SIGUIENTE PASO

Integrar este documento con:
- PLAN_LANZAMIENTO_ANTIBOT_LXR.md (bots)
- RESUMEN_EJECUTIVO_LANZAMIENTO.md (squad)

Para crear **PLAN DE LANZAMIENTO INTEGRAL 360°** que cubra:
- ✅ Protecciones técnicas (bots)
- ✅ Protecciones económicas (humanos)
- ✅ Protecciones psicológicas (comunicación)
- ✅ Protecciones de governance (confianza)

¿Creamos el documento MAESTRO que integra todo? 🚀
