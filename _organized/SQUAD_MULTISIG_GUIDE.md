# 🔐 GUÍA SQUAD MULTISIG - CÓMO CONECTAR Y CONTROLAR

**Fecha:** 2026-04-29  
**Audiencia:** Desarrolladores que necesitan hacer cambios en mainnet  
**Estado:** ✅ Squad es el propietario del programa en mainnet

---

## 🎯 SITUACIÓN ACTUAL

### Antes (Cuando se subió a mainnet)
```
Propietario:  billetera admin.json (control unitario)
Control:      Una persona podía hacer cambios
Risk:         ALTO (sin descentralización)
```

### Ahora (Estado actual)
```
Propietario:  Squad Multisig HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
Control:      4 de 6 signers deben aprobar cambios
Risk:         BAJO (descentralizado + auditable)
```

**Programa Mainnet:** `9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv`

---

## 🌐 ACCESO A SQUAD MULTISIG

### Opción 1: Interfaz Web (RECOMENDADO)
```bash
# En tu navegador:
1. Abre: https://squads.so
2. Conecta tu wallet (click "Connect")
3. Busca el Squad: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
4. Si eres signer, verás:
   - Transacciones pendientes
   - Propuestas de upgrade
   - Historial de cambios
   - Votaciones
```

### Opción 2: Verificar si Eres Signer
```bash
# En tu terminal:
solana account HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m

# Output contendrá algo como:
# Members: [wallet1, wallet2, ..., tu_wallet]
# Threshold: 4
```

---

## 📋 LOS 6 SIGNERS DEL MULTISIG

Basado en Whitepaper.md:

```
1. Core Dev Team ............. [wallet no pública]
2. Community Lead ............ [wallet no pública]
3. Finance Manager ........... [wallet no pública]
4. Security Lead ............. [wallet no pública]
5. External Advisor 1 ........ [wallet no pública]
6. External Advisor 2 ........ [wallet no pública]

Threshold: 4 de 6
Quorum:    4 aprobaciones requeridas para cualquier cambio
```

---

## 🔄 FLUJO DE CAMBIOS EN MAINNET

### Paso 1: Preparar el Cambio (Local en tu PC)
```bash
cd /home/itsroosevelt_/excelsior-project/economy-triple-token

# Editar el código del contrato
# Ejemplo: programs/excelsior/src/instructions/swap.rs
nano programs/excelsior/src/instructions/swap.rs

# Compilar el nuevo código
anchor build

# Verificar que compila sin errores
```

### Paso 2: Crear Propuesta en Squad
```bash
# Usar el script de handover que prepara la transacción
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts

# Este script:
# 1. Lee tu código compilado
# 2. Crea una transacción de upgrade
# 3. La envía a Squad para votación
# 4. Aparece como "Pending Transaction" en Squad
```

### Paso 3: Los Signers Reciben Notificación
```
Squad Multisig notifica a los 6 signers:
- Email
- Dashboard de Squad
- Notificación en Discord (si está configurado)

Detalles visibles:
✅ Qué cambios se incluyen (diff del código)
✅ Quién propuso el cambio (firma del compilador)
✅ Cuándo se propuso
✅ Instrucciones para votar
```

### Paso 4: Votación (4 de 6 deben aprobar)
```
Signer 1: [aprueba] ✅
Signer 2: [aprueba] ✅
Signer 3: [pendiente]
Signer 4: [aprueba] ✅
Signer 5: [rechaza] ❌
Signer 6: [pendiente]

Resultado: 3/6 aprobados (necesita 1 más)
        → Esperando más votos
           O
Resultado: 4/6 aprobados ✅
        → AUTORIZADO PARA EJECUTAR
```

### Paso 5: Ejecución Automática
```bash
# Una vez que hay 4 aprobaciones, cualquiera puede ejecutar:
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts --execute

# El programa se actualiza en mainnet
# Versión anterior + cambios = nuevo bytecode

# Confirmación en blockchain:
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m
# Mostrará nuevo slot/versión
```

---

## 🔍 VERIFICAR ESTADO EN SQUAD

### En la Web (https://squads.so):
```
1. Conecta wallet
2. Click en tu Squad
3. Tabs disponibles:
   ├── Pending Transactions (lo que falta votar)
   ├── Executed Transactions (historial)
   ├── Members (quiénes son signers)
   ├── Settings (configuración del multisig)
   └── Vault (tokens controlados)
```

### Por Terminal:
```bash
# Ver propietario del programa
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m | grep Authority

# Debe mostrar:
# Upgrade Authority: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe

# Ver datos del Squad (si tienes acceso)
solana account HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m
```

---

## ⚠️ CASOS ESPECIALES

### ¿Qué pasa si no eres signer?
```
Problema:  Quieres hacer un cambio pero no eres signers del multisig
Solución:  Contacta a uno de los signers para que:
  1. Proponga el cambio
  2. O te agregue como signer (requiere votación)
```

### ¿Qué pasa si un signer desaparece?
```
Problema:  Uno de los 6 signers no responde
Solución:  Los otros pueden votación remover + agregar nuevo signer
  (Requiere 4 votos como siempre)
```

### ¿Qué pasa si hay cambios contradictorios?
```
Problema:  Alguien propone cambio A, otro propone cambio B
Solución:  Squad las vota por separado, la primera en obtener 4
           se ejecuta primero. La segunda verá el nuevo código
           y puede ser rechazada si conflictúa.
```

### ¿Puedo revertir un cambio?
```
Sí:  Proponer un nuevo upgrade que revierta los cambios
     (El código anterior sigue existiendo, se puede recuperar)
```

---

## 🛠️ SCRIPTS LISTOS PARA MAINNET

Todos están en `_organized/scripts/mainnet/`:

```typescript
// mainnet_handover.ts
// Propósito: Crear propuesta de upgrade
// Uso:      npx ts-node mainnet_handover.ts
// Efecto:   Propuesta aparece en Squad para votación

// wallet_registry.ts
// Propósito: Verificar wallets registradas en mainnet
// Uso:      npx ts-node wallet_registry.ts
// Efecto:   Auditoría de qué wallets existen

// upload_metadata.ts
// Propósito: Subir metadata de tokens a IPFS
// Uso:      npx ts-node upload_metadata.ts
// Efecto:   Metadata disponible en IPFS para tokens

// update_xls_metadata.ts
// Propósito: Actualizar metadata del token XLS
// Uso:      npx ts-node update_xls_metadata.ts
// Efecto:   Metadata de XLS actualizada en IPFS

// generate_metadata_base64.ts
// Propósito: Generar metadata en formato base64
// Uso:      npx ts-node generate_metadata_base64.ts
// Efecto:   Output: metadata en base64
```

---

## 📊 TABLA DE REFERENCIA

| Acción | Red | Quién | Script | Efecto |
|--------|-----|-------|--------|--------|
| **Test cambios** | devnet | Cualquiera | _organized/scripts/devnet/* | ✅ Cambios inmediatos |
| **Proponer cambio** | mainnet | Signer | mainnet_handover.ts | ⏳ Propuesta en Squad |
| **Votar propuesta** | mainnet | Signers (6) | Squad.so web | ⏱️ Votación (4/6) |
| **Ejecutar cambio** | mainnet | Cualquiera | mainnet_handover.ts --execute | ✅ Upgrade en vivo |
| **Ver historial** | mainnet | Público | Squad.so o Solscan | 📊 Historial completo |

---

## 🚀 WORKFLOW TÍPICO PARA DESARROLLO

```bash
# SEMANA 1: IDEA + DESARROLLO
1. Diseñar mejora
2. Implementar en programs/excelsior/src/
3. Escribir tests en _organized/tests/
4. Probar en devnet: anchor build && npx ts-node _organized/scripts/devnet/test.js

# SEMANA 2: AUDITORÍA + PROPUESTA
5. Pedir review (otros devs + security team)
6. Pasar auditoría interna
7. Compilar para mainnet: anchor build
8. Crear propuesta: npx ts-node _organized/scripts/mainnet/mainnet_handover.ts

# SEMANA 3: VOTACIÓN + EJECUCIÓN
9. Signers ven propuesta en Squad
10. Discuten en Squad chat/Discord
11. Votan (necesita 4/6)
12. Una vez aprobado: ejecutar upgrade
13. Verificar en mainnet: solana program show 9d7Se... -u m

# SEMANA 4: MONITOREO
14. Vigilar con auditoría: _organized/scripts/mainnet/wallet_registry.ts
15. Confirmar que no hay bugs
```

---

## 🔒 SEGURIDAD

### ✅ Lo que Squad protege:
- ✅ Un solo signer NO puede hacer cambios
- ✅ Cambios son públicos y auditables
- ✅ Historial completo en blockchain
- ✅ Puede revertirse si hay problema
- ✅ Votación requiere consenso (4/6)

### ⚠️ Lo que DEBES proteger:
- 🔐 Nunca compartir las private keys de signers
- 🔐 Usar hardware wallets si es posible
- 🔐 Verificar propuestas antes de votar
- 🔐 Tener backup de recovery phrases

---

## 📞 CONTATOS Y RECURSOS

### Squad Documentation
- Web: https://squads.so
- Docs: https://docs.squads.so
- Discord: https://discord.gg/squads

### Solana Documentation
- Web: https://solana.com
- Docs: https://docs.solana.com
- CLI Reference: https://docs.solana.com/cli

### Tu Proyecto
- Program ID: `9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv`
- Squad: `HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe`
- Devnet RPC: `https://api.devnet.solana.com`
- Mainnet RPC: `https://api.mainnet-beta.solana.com`

---

**Próximo paso:** Accede a https://squads.so y verifica que eres signer (si aplica)

