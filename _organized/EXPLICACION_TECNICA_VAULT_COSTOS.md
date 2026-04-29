# 🏗️ EXPLICACIÓN TÉCNICA - CÓMO FUNCIONA EL VAULT Y COSTOS

**¿Cómo se crea el Vault? ¿Quién paga? ¿Cómo lo firma el multisig?**

Versión: 1.0  
Fecha: 2026-04-29

---

## 🔴 PRIMERO: ACLARACIÓN CRÍTICA

Tu token **LXR ya está en mainnet**. Eso significa:

```
❌ NO PUEDES:
├─ Cambiar el mint del token (es FIJO)
├─ Cambiar el supply (es INMUTABLE)
├─ Crear más tokens (mint authority es renunciada)
└─ Modificar el token en sí

✅ PUEDES:
├─ Crear un programa NUEVO que intermedie
├─ Upgrading el programa original excelsior (si es upgradeable)
├─ Cambiar configuraciones dentro del programa
└─ Crear nuevas instrucciones que validen reglas
```

---

## 🎯 DOS OPCIONES TÉCNICAS

### OPCIÓN A: Upgrading el Programa Original (RECOMENDADO)

**Situación:**
```
Tu programa excelsior está en mainnet:
├─ Program ID: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
├─ Authority (dueño): HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe (Squad Multisig)
└─ Es UPGRADEABLE (porque el Squad tiene la authority)

¿Qué significa?
├─ Pueden actualizar el código del programa
├─ Sin cambiar el program ID
├─ Sin tocar el token LXR
└─ Las nuevas reglas se aplican inmediatamente
```

**Flujo:**

```
ANTES del upgrade:
  Usuario → Raydium Pool LXR/SOL → Recibe LXR

DESPUÉS del upgrade:
  Usuario → Nuevo código del programa 
         → Valida reglas anti-bot
         → CPI a Raydium Pool
         → Recibe LXR protegido
         
EL PROGRAM ID ES EXACTAMENTE IGUAL: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
```

**Ventajas:**
- ✅ No creas programa nuevo
- ✅ No cuesta deploy adicional
- ✅ Usuarios no notan cambio
- ✅ Más simple técnicamente

**Desventajas:**
- ⚠️ Las instrucciones originales se modifican
- ⚠️ Si algo falla, más complejo de revertir

---

### OPCIÓN B: Crear Programa Nuevo (ALTERNATIVA)

**Situación:**
```
Creas un SEGUNDO programa:
├─ Nuevo Program ID: [Será asignado en deploy]
├─ Autoridad: Squad Multisig
├─ Propósito: Intermediar para protecciones

El programa original SIGUE IGUAL:
├─ Sigue en 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
├─ Sin cambios
├─ Sin riesgo de romper existente
```

**Flujo:**

```
NUEVO VAULT PROGRAM:
  Usuario → Vault (nuevas reglas) 
         → CPI a ORIGINAL programa (9d7SeR8...)
         → O CPI a Raydium directamente
         → Recibe LXR

EL PROGRAMA ORIGINAL NO SE TOCA
```

**Ventajas:**
- ✅ Programa original está 100% seguro
- ✅ Si vault falla, lo desactivas y listo
- ✅ Más modular y reversible

**Desventajas:**
- ⚠️ Costo inicial de deploy (pequeño)
- ⚠️ Los usuarios deben saber ir al Vault (no al programa original)

---

## 💰 COSTOS EXACTOS

### Opción A: Upgrading Programa Original

```
COSTO TOTAL: ~0.5-2 SOL (~$100-400 en valor actual)

Desglose:
├─ Compilación (local, sin costo): cargo build
├─ Upload de buffer (5 SOL típico, pero reutilizable)
│  └─ Se paga UNA sola vez
│  └─ Se guarda en blockchain
│  └─ Squad Multisig puede reutilizarlo
├─ Actualización del programa (0.02 SOL)
│  └─ Instrucción de upgrade
│  └─ Requiere 4-of-6 signatures
├─ Transacciones de firma (0.005 SOL cada una)
│  └─ 4 firmas = 0.02 SOL total
└─ Margen de seguridad: ~0.5 SOL

TOTAL: 5.5-6 SOL máximo (PRIMERA VEZ)
En upgrades futuros: 0.02-0.5 SOL (mucho más barato)

¿QUIÉN PAGA?
└─ El Squad Multisig paga al firmar la instrucción de upgrade
   (De facto, sale de fondos del multisig o admin)
```

**En la práctica:**

```
1. Compilas el nuevo código localmente (SIN COSTO)
2. Squad firma propuesta de upgrade en Squads.so
3. Alguien ejecuta la transacción de actualización
   └─ Costo: ~5 SOL (primera vez)
4. El programa se actualiza automáticamente
5. Usuarios ven nuevas reglas inmediatamente
```

---

### Opción B: Nuevo Programa (Vault)

```
COSTO TOTAL: ~6-10 SOL (~$1,200-2,000)

Desglose:
├─ Deploy del programa (2 SOL):
│  └─ Instrucción de deployment
│  └─ Crear Program Data Account (PDA)
├─ Inicialización de estado (0.5-1 SOL):
│  └─ Crear cuentas de estado (GlobalConfig, etc.)
│  └─ Varios PDAs para rastreo
├─ Transacciones de firma (0.02 SOL):
│  └─ 4 signatures de Squad
├─ Buffer de seguridad: ~2 SOL
└─ Gas por transacciones: ~0.5 SOL

TOTAL: 5-10 SOL (PAGO ÚNICO)

¿QUIÉN PAGA?
└─ El Squad Multisig paga al hacer deploy
   (Fondos del multisig o de fundación)
```

**En la práctica:**

```
1. Compilas código del Vault (sin costo)
2. Squad prepara propuesta en Squads.so
3. Squad firma con 4-of-6 autorización
4. Se ejecuta: anchor deploy --provider.cluster mainnet
5. Nuevo Vault está VIVO en mainnet
6. Usuarios deben usar nuevo Vault address (comunicación)
```

---

## 📊 COMPARACIÓN DE COSTOS

| Aspecto | Opción A: Upgrade | Opción B: Nuevo Vault |
|---------|------------------|----------------------|
| **Costo Initial** | 5-6 SOL | 6-10 SOL |
| **Costo Futuros** | 0.02-0.5 SOL | No aplica (es único) |
| **Riesgo** | Modificar existente | Programan nuevo |
| **Complejidad** | Moderada | Moderada-Alta |
| **Reversibilidad** | Upgrade nuevamente | Desactivar |
| **User UX** | Transparente | Requiere comunicación |
| **Recomendación** | ⭐ MEJOR | Alternativa |

---

## 🔒 ¿QUIÉN FIRMA Y PAGA?

### El Multisig Squad

```
HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe

Threshold: 4-of-6 signers

¿Cuándo se usa?
├─ Cualquier cambio al programa (upgrade)
├─ Cualquier cambio a configuración crítica
├─ Pausa de emergencia
└─ Desactivación de reglas

¿Quién paga?
├─ El que ejecuta la transacción (paga la tx fee)
├─ PERO: 4 signers deben autorizar primero
├─ La autorización se hace en squads.so
└─ Sin autorización: transacción REVIERTE

PROCESO:
1. Alguien prepara la propuesta
2. Se publica en Squads.so
3. 4 signers ven la propuesta
4. 4 signers VOTAN "SÍ"
5. Después de 4 "SÍ", anyone puede EJECUTAR
6. Quien ejecuta paga la fee (~0.5-5 SOL)
```

---

## ✅ PROCESO PASO-A-PASO: OPCIÓN A (RECOMENDADA)

### Paso 1: Preparación Local (SIN COSTO)

```bash
# En tu PC

# 1. Obtener el código actual del programa
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m
# ✅ Verifica que el programa existe

# 2. Clonar o editar código
git clone https://github.com/turepository/excelsior.git
cd excelsior

# 3. Agregar nuevas instrucciones y state
# (Editar: programs/excelsior/src/lib.rs)
# (Editar: programs/excelsior/src/instructions/buy_lxr_protected.rs)

# 4. Compilar localmente
anchor build
# ✅ Sin errores de compilación

# 5. Revisar el build output
ls -la target/deploy/excelsior.so
# ✅ Debe existir el .so file
```

---

### Paso 2: Crear Propuesta en Squad Multisig

```
Ir a: https://squads.so

1. Conectar billetera del Squad
2. Seleccionar el multisig: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
3. Click "Create Proposal" → "Upgrade Program"
4. Seleccionar programa: 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv
5. Seleccionar el archivo .so compilado
6. Agregar descripción:
   "Implementar protecciones anti-bot para lanzamiento de LXR"
7. Click "Create Proposal"
8. Multisig genera un Proposal ID (ej: proposal_123)
```

**En Squads.so se ve:**
```
┌─────────────────────────────────┐
│ PROPOSAL: Upgrade Excelsior     │
├─────────────────────────────────┤
│ Type: Program Upgrade           │
│ Program: 9d7SeR8N...jmfv        │
│ New Code: [hash del .so]        │
│                                 │
│ Votes:                          │
│ ☐ Signer 1 (Pending)           │
│ ☐ Signer 2 (Pending)           │
│ ☐ Signer 3 (Pending)           │
│ ☐ Signer 4 (Pending)           │
│ ☐ Signer 5 (Pending)           │
│ ☐ Signer 6 (Pending)           │
│                                 │
│ Needed: 4 signatures            │
└─────────────────────────────────┘
```

---

### Paso 3: Votación Squad (24-48 horas típico)

```
Cada uno de los 6 signers recibe notificación:
├─ Correo de Squads
├─ O ven en squads.so dashboard
└─ Click en "Vote Yes" o "Vote No"

Proceso:
1. Signer 1 vota → 1/4
2. Signer 2 vota → 2/4
3. Signer 3 vota → 3/4
4. Signer 4 vota → 4/4 ✅ APROBADO

Después de 4 "Yes":
├─ La propuesta se aprueba automáticamente
├─ Cualquiera (incluyéndote) puede EJECUTAR
└─ Ejecución cuesta ~0.5-2 SOL
```

---

### Paso 4: Ejecución (Última transacción)

```bash
# Alguien ejecuta (puede ser admin, un bot, o tú mismo)

# Opción A: Desde CLI
squads-cli execute proposal_123 \
  --keypair ~/.config/solana/id.json \
  --rpc-url https://api.mainnet-beta.solana.com

# Opción B: Desde Squads.so UI
1. Ir a https://squads.so
2. Ver propuesta aprobada
3. Click "Execute"
4. Confirmar transacción
5. Pagar ~0.5-2 SOL

RESULTADO:
✅ Programa actualizado en mainnet
✅ Nuevas instrucciones activas
✅ Usuarios ven nuevas reglas inmediatamente
```

---

## 🎯 ESCENARIO PRÁCTICO COMPLETO

### Timeline Realista: Implementar Protecciones Anti-Bot

```
LUNES (T-7 días antes del lanzamiento)
├─ Tu equipo: Termina código de protecciones
├─ Costo: $0
└─ Tiempo: 8-16 horas

MARTES (T-6 días)
├─ Tu equipo: Testing exhaustivo en devnet
├─ Costo: $0 (devnet es gratis)
└─ Tiempo: 4-8 horas

MIÉRCOLES (T-5 días)
├─ Tu equipo: Final audit y review
├─ Costo: $0
└─ Tiempo: 2-4 horas

JUEVES (T-4 días) - CREACIÓN DE PROPUESTA
├─ Tu equipo: Compila código final
├─ Tu equipo: Crea propuesta en Squads.so
├─ Comunicación: Avisa a los 6 signers
├─ Costo: $0
└─ Tiempo: 1 hora

VIERNES-DOMINGO (T-3 a T-1 días) - VOTACIÓN
├─ Los 6 signers VOTAN
│  ├─ Signer 1: Vota "Sí"
│  ├─ Signer 2: Vota "Sí"
│  ├─ Signer 3: Vota "Sí"
│  ├─ Signer 4: Vota "Sí" → ✅ APROBADO
│  ├─ Signer 5: No necesita votar (ya tenemos 4)
│  └─ Signer 6: No necesita votar
├─ Costo: $0 (solo votos, no ejecución)
└─ Tiempo: Automático

LUNES (T-1 día) - EJECUCIÓN
├─ Alguien ejecuta la propuesta aprobada
├─ Transacción de upgrade se procesa
├─ Programa se actualiza en mainnet
├─ Costo: ~1-2 SOL (~$200-400)
└─ Tiempo: 5 minutos transacción

MARTES (T-0) - LANZAMIENTO
├─ Pool abierto
├─ Nuevas reglas anti-bot ACTIVAS
├─ Usuarios ven protecciones
└─ ✅ ÉXITO

TOTAL COSTO: 1-2 SOL ($200-400)
TOTAL TIEMPO: 16-32 horas trabajo + 7 días espera
```

---

## ⚠️ CASOS ESPECIALES Y PREGUNTAS

### P1: "¿El Squad tiene que pagar todo?"

**R:** El Squad paga la TRANSACCIÓN de ejecución (~1-2 SOL).
- Fondos del multisig (técnicamente del proyecto)
- Es un gasto operacional mínimo
- Costo total: menos que una pizza 🍕

---

### P2: "¿Y si el upgrade falla?"

**R:** Tienes opciones:

```
Si en ejecución hay error:
├─ Error se revierte automáticamente
├─ Fondos del multisig NO se pierden
├─ Puedes intentar de nuevo
└─ Costo: ~0.5-1 SOL por intento

Si después del upgrade hay bug:
├─ OPCIÓN A: Hacer nuevo upgrade (revertir)
├─ OPCIÓN B: Usar circuit breaker (pausa)
├─ OPCIÓN C: Comunicar a comunidad
└─ Costo: ~1-2 SOL para revertir

Si necesitas cambios frecuentes:
└─ Considera Opción B (Vault nuevo)
   ├─ Es más fácil de desactivar
   ├─ No toca el programa original
   └─ Costo inicial mayor (~6-10 SOL)
```

---

### P3: "¿Los usuarios ven el cambio?"

**R:** Depende de la opción:

```
OPCIÓN A (Upgrade original):
├─ Program ID: IGUAL
├─ Usuarios: No notan cambio técnico
├─ Experiencia: Transparente
└─ Usan: Raydium directamente (pero con new reglas)

OPCIÓN B (Nuevo Vault):
├─ Program ID: DIFERENTE
├─ Usuarios: Deben usar nuevo vault address
├─ Comunicación: "Usa este nuevo contrato para protecciones"
└─ Experiencia: Ligeramente más compleja
```

---

### P4: "¿Y si no queremos actualizar mainnet aún?"

**R:** Pruebas completas en devnet:

```
DEVNET (Gratis, sin riesgo):
├─ Deploy a devnet
├─ Testear 7 días completos
├─ Simular el lanzamiento
├─ Zero cost
└─ Cuando estés 100% seguro → mainnet

MAINNET (Con costo, pero probado):
├─ Deploy cuando estés seguro
├─ Siguiendo el proceso Squad
└─ Costo: ~1-2 SOL mínimo
```

---

## 🎯 RECOMENDACIÓN FINAL

```
✅ OPCIÓN RECOMENDADA: OPCIÓN A (Upgrade Original)

Razones:
├─ Costo menor (~1-2 SOL)
├─ Más simple de ejecutar
├─ Transparente para usuarios
├─ Menos comunicación necesaria
├─ Reversible con nuevo upgrade
└─ Es el estándar en Solana

Proceso:
1. Termina código (local, sin costo)
2. Crea propuesta Squad (sin costo)
3. Espera 4 votos (sin costo)
4. Ejecuta actualización (~1-2 SOL)
5. ✅ Listo, protecciones activas
```

---

## 📋 CHECKLIST: IMPLEMENTACIÓN EN MULTISIG

### T-5 Días: Preparación

- [ ] Código de protecciones TERMINADO
- [ ] Compilado sin errores: `anchor build`
- [ ] Testing en devnet COMPLETO
- [ ] Review de seguridad APROBADO
- [ ] Build output (excelsior.so) LISTO

### T-4 Días: Creación de Propuesta

- [ ] Acceder a https://squads.so
- [ ] Conectar multisig wallet
- [ ] Seleccionar: Upgrade Program
- [ ] Subir archivo: excelsior.so
- [ ] Escribir descripción clara
- [ ] Crear propuesta → Obten ID

### T-3 a T-1 Días: Votación

- [ ] 6 signers reciben notificación
- [ ] Cada signer revisa código (opcional)
- [ ] Cada signer vota "Yes"
- [ ] Contador: 4/6 votos = ✅ APROBADO
- [ ] Propuesta queda en estado "Aprobado pero no ejecutado"

### T-0 Horas: Ejecución

- [ ] Alguien prepara transacción de ejecución
- [ ] Verifica que hay 4 votos
- [ ] Ejecuta desde Squads.so o CLI
- [ ] Paga ~1-2 SOL
- [ ] Espera confirmación (5-30 segundos)
- [ ] ✅ Programa actualizado en mainnet

### T+0 Horas: Verificación

- [ ] Verificar program en explorer
- [ ] Ver nueva versión cargada
- [ ] Testear una transacción pequeña
- [ ] Confirmar nuevas reglas funcionan
- [ ] Comunicar a comunidad: "Protecciones ACTIVAS"

---

## 💡 RESPUESTA RESUMIDA

**Tu pregunta:** "¿El Vault se crea en el multisig o cómo funciona? ¿Cuesta dinero?"

**Respuesta:**

```
1. El multisig AUTORIZA el upgrade (vota)
2. La autorización se hace en Squads.so (sin costo)
3. Alguien EJECUTA la actualización (paga ~1-2 SOL)
4. El programa se actualiza en mainnet
5. Nuevas reglas están VIVAS inmediatamente

¿Quién paga?
└─ El que ejecuta (~1-2 SOL)
  Generalmente es fondos del proyecto/multisig
  Costo mínimo comparado con beneficios

¿Ya no pueden modificar mainnet?
└─ PUEDEN modificar (upgradeable program)
  Requiere 4-of-6 del multisig
  Cada upgrade cuesta ~1-2 SOL

¿Cuál es la opción mejor?
└─ OPCIÓN A: Upgrade del programa original
  ✅ Más simple, más barato, transparente
```

---

**Documento de Costos y Proceso Completado**  
**Versión:** 1.0  
**Estado:** Listo para implementar  
**Fecha:** 2026-04-29
