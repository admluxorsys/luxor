# 🚀 QUICK START - Economy Triple Token

## 📌 Para Acceder a Información por Tema

### 🔥 Quiero...

**...entender el proyecto en 5 minutos**
```bash
cat _organized/docs/README.md
```

**...configurar y levantar el proyecto**
```bash
cat _organized/docs/CLAUDE.md
# Sección: "Commands" para todos los comandos
```

**...auditar balances en DEVNET**
```bash
cd _organized/scripts/devnet/
node audit_unique.js
```

**...saber qué está en MAINNET**
```bash
cat _organized/MAINNET_DEPLOYMENT_STATUS.md
```

**...entender la diferencia devnet vs mainnet**
```bash
cat _organized/NETWORK_ARCHITECTURE.md
```

**...ver toda la estructura organizada**
```bash
cat _organized/README_STRUCTURE.md
```

---

## 📊 RESUMEN EJECUTIVO

| Aspecto | Estado |
|--------|--------|
| **Programa Principal** | ✅ Compilado y desplegado |
| **Red Activa** | Devnet (default) + Mainnet (configurado) |
| **Propiedad** | 🔐 Multisig (4-of-6) |
| **Tokens Activos** | LXR (✅), XLS (🔒), USDX (🔒) |
| **Suite de Pruebas** | ✅ 17,706 líneas |
| **Documentación** | ✅ Completa (Whitepaper + Técnica) |
| **Auditoría** | ✅ Scripts automáticos para devnet |

---

## 🗂️ ARCHIVOS MÁS IMPORTANTES

1. **CLAUDE.md** — Todo lo técnico  
2. **NETWORK_ARCHITECTURE.md** — Devnet vs Mainnet  
3. **MAINNET_DEPLOYMENT_STATUS.md** — Qué subimos a mainnet  
4. **Whitepaper.md** — Tokenomics y gobernanza  

---

## ⚡ COMANDOS COMUNES

```bash
# Build
anchor build

# Test
anchor test

# Deploy devnet
anchor deploy --provider.cluster devnet

# Deploy mainnet (⚠️ cuidado)
anchor deploy --provider.cluster mainnet

# Ver programa
solana program show 9d7SeR8Njzh32piG1HBxNR33VJJYVroubsQKKjkBjmfv -u m

# Auditar devnet
cd _organized/scripts/devnet && node audit_unique.js
```

---

## 🎯 PRÓXIMOS PASOS

- [ ] Leer: `_organized/docs/CLAUDE.md`
- [ ] Leer: `_organized/NETWORK_ARCHITECTURE.md`
- [ ] Ejecutar: `anchor build` para verificar compilación
- [ ] Auditar: Devnet con `audit_unique.js`
- [ ] Confirmar: Estado real en mainnet con comandos

---

**Última actualización:** 2026-04-29
