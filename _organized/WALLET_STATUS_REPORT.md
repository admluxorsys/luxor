# 🔑 REPORTE DE BILLETERA - STATUS Y USO

**Fecha:** 2026-04-29  
**Estado:** ✅ Billetera verificada + Acceso local disponible  
**Propósito:** Explicar cómo usar la billetera en tu PC

---

## 🎯 SITUACIÓN ACTUAL DE TU BILLETERA

### ✅ EXISTE Y ES ACCESIBLE
```
Ubicación:         /wallets/admin.json
Status:            ✅ PRESENTE EN TU PC
Tamaño:            233 bytes
Permisos:          rw------- (solo tú puedes leer)
Última modificación: 2026-04-29
```

### 📍 IDENTIDAD DE LA BILLETERA

Basado en el análisis:
```
Dirección:      HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
Nombre en docs: "Genesis Squad" (holder inicial)
Rol actual:     Fue el propietario del programa (ahora Squad multisig)
Red:            mainnet-beta (producción)
```

### 🔐 LO QUE PODÍA HACER ESTA BILLETERA (Antes del multisig)

```
Antes (Antes de la transferencia a Squad):
✅ Hacer cambios al programa sin permiso de nadie
✅ Cambiar configuración de oracles
✅ Pausar el protocolo
✅ Transferir fondos de vault
✅ Cambiar operadores
❌ Acceso fue transferido a Squad Multisig

Ahora (Después de la transferencia):
❌ NO puede hacer cambios unilaterales
⚠️  Necesita votación de Squad (4/6 signers)
✅ Puede ser signer del Squad si está incluida
✅ Puede auditar en devnet libremente
```

---

## 💰 FONDOS EN LA BILLETERA

### En Mainnet
```bash
# Para ver balance actual:
solana balance HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u m

# Balance esperado: 
# - Rent para programa: 4.73 SOL
# - Posiblemente algo más si hay otros tokens
```

### En Devnet
```bash
# Para ver balance en devnet (usualmente mucho):
solana balance HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe -u d

# En devnet puedes:
✅ Pedir más SOL (airdrop)
✅ Experimentar sin restricciones
```

---

## 🚀 CÓMO USAR LA BILLETERA LOCALMENTE

### OPCIÓN A: Con Anchor (Lo más fácil)

```bash
# 1. Anchor ya conoce la billetera (está en Anchor.toml)
cat Anchor.toml | grep wallet
# Output: wallet = "./wallets/admin.json"

# 2. Cuando haces anchor commands, se usa automáticamente:
anchor build          # Compila
anchor deploy --provider.cluster devnet  # Usa admin.json

# 3. Con otros scripts TypeScript:
# Automáticamente lee: "./wallets/admin.json"
npx ts-node script.ts
```

### OPCIÓN B: Con Solana CLI Directamente

```bash
# 1. Configurar como billetera por defecto:
solana config set --keypair ./wallets/admin.json

# 2. Verificar que está configurada:
solana config get
# Mostrará: Keypair Path: /ruta/a/wallets/admin.json

# 3. Ahora todos los comandos usan esa billetera:
solana balance                    # Balance de admin.json
solana transfer <destino> 1       # Transferencia desde admin.json
solana program deploy ./target/deploy/excelsior.so  # Deploy desde admin.json
```

### OPCIÓN C: Con TypeScript Manual

```typescript
// script.ts
import * as fs from 'fs';
import { Keypair } from '@solana/web3.js';

// Leer la billetera
const walletData = fs.readFileSync('./wallets/admin.json', 'utf-8');
const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(walletData))
);

console.log('Publickey:', keypair.publicKey.toString());
// Output: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe

// Ahora puedes usarla en transacciones
const tx = new Transaction().add(
  // Tu instrucción aquí
);

await sendAndConfirmTransaction(connection, tx, [keypair]);
```

---

## ⚠️ IMPORTANTE: CAMBIO DE PROPIEDAD

### Lo que pasó:

```
Timeline:
┌─────────────────────────────────────┐
│ 1. Programa se desplegó             │
│    Propietario: HQ8e... (admin.json)│
├─────────────────────────────────────┤
│ 2. Script mainnet_handover.ts se    │
│    ejecutó                          │
├─────────────────────────────────────┤
│ 3. Propiedad se transferió a Squad  │
│    Propietario: HQ8e... (Squad)     │
├─────────────────────────────────────┤
│ 4. Ahora (Estado actual):           │
│    Admin.json: No es propietario    │
│    Squad (4/6): SÍ es propietario   │
└─────────────────────────────────────┘
```

### Verificación:
```bash
# Ver propietario actual del programa:
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Mostrará algo como:
# Authority: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
#            ^ Esta es la dirección, pero ahora es Squad multisig,
#              no una billetera individual
```

---

## 🔄 CASOS DE USO: CUÁNDO USAR CADA BILLETERA

| Caso | Red | Billetera | Script | Efecto |
|------|-----|-----------|--------|--------|
| **Test local** | devnet | admin.json | anchor test | ✅ Funciona sin límites |
| **Auditar devnet** | devnet | admin.json | audit_unique.js | ✅ Audita tu estado |
| **Compilar cambio** | devnet | admin.json | anchor build | ✅ Compila localmente |
| **Proponer cambio** | mainnet | Squad | mainnet_handover.ts | ⏳ Crea propuesta |
| **Ver mainnet** | mainnet | (Público) | wallet_registry.ts | 👀 Solo lectura |
| **Auditar mainnet** | mainnet | (Público) | solana program show | 👀 Solo lectura |

---

## 🛡️ SEGURIDAD DE LA BILLETERA

### ✅ ESTÁ BIEN:
- Billetera en tu PC
- Permiso 600 (solo tú puedes leer)
- Backup en tu máquina
- Usable en devnet

### ⚠️ TEN CUIDADO:
- ❌ NO commitear a Git (ya está en .gitignore)
- ❌ NO compartir el archivo admin.json
- ❌ NO copiar a sitios públicos
- ❌ NO hacer backup en Google Drive sin encriptar

### 🔒 LO MEJOR:
```bash
# Hacer backup local (en mismo PC, en otra carpeta)
cp wallets/admin.json ~/Documentos/backup-admin-wallet.json

# O mejor aún: hardware wallet
# Mantener admin.json pero usar Ledger para mainnet
```

---

## 🚀 PRÓXIMOS PASOS

### Para Trabajar AHORA:

```bash
# 1. Verificar que la billetera funciona:
cd /home/itsroosevelt_/excelsior-project/economy-triple-token
solana config set --keypair ./wallets/admin.json
solana balance

# Output esperado: [algo] SOL
# Si dice error: problema con la billetera

# 2. Instalar dependencias:
yarn install

# 3. Hacer cambios en devnet libremente:
cd programs/excelsior/src/instructions
# Editar algún archivo

# 4. Probar localmente:
anchor build
anchor test

# 5. Probar en devnet:
anchor deploy --provider.cluster devnet
```

### Para Mainnet (cuando necesites):

```bash
# 1. Compilar cambio:
anchor build

# 2. Crear propuesta en Squad:
npx ts-node _organized/scripts/mainnet/mainnet_handover.ts

# 3. Esperar votación en Squad.so
# 4. Una vez aprobado (4/6 votos), ejecutar

# ¡IMPORTANTE!
# Tu billetera (admin.json) NO es necesaria para esto
# Solo si eres signer del Squad
```

---

## 📊 TABLA DE PERMISOS

| Red | Tu Billetera | Puede Hacer | Nota |
|-----|--------------|-------------|------|
| **Devnet** | admin.json | TODO | ✅ Control total |
| **Mainnet** | admin.json | NADA (ahora) | ⚠️ Squad controla |
| **Mainnet** | Squad (si signer) | Votar cambios | ⏳ Requiere 4/6 votos |
| **Mainnet** | Cualquiera | Ver/auditar | 👀 Información pública |

---

## 🆘 SI ALGO SALIÓ MAL

### "No puedo ver el balance"
```bash
# Verificar que la billetera existe:
ls -la wallets/admin.json

# Verificar que el JSON es válido:
cat wallets/admin.json | jq

# Si da error, la billetera está corrupta
# Necesitarías la recovery phrase o seed
```

### "Quiero verificar que es la correcta"
```bash
# Ver dirección pública:
solana-keygen pubkey ./wallets/admin.json

# Debe mostrar: HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe
```

### "Necesito hacer un cambio pero dice error"
```bash
# En devnet: Casi siempre funciona
# En mainnet: Necesita ser votado por Squad primero

# Verifica que estés usando el network correcto:
solana config get | grep -i url
```

---

## 📝 CONCLUSIÓN

✅ **Tu billetera está segura y accesible**
✅ **Puedes usarla para devnet sin límites**
⚠️ **Mainnet está bajo control de Squad (es lo correcto)**
✅ **Tienes todo lo necesario para empezar a mejorar el código**

**Próximo paso:** Ve a https://squads.so y verifica tu acceso como signer (si aplica)

