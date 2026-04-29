# 🚀 Guía Completa: Proyecto Excelsior (Luxor) - Economía de Triple Token

Bienvenido al núcleo del **Protocolo de Soberanía Modular (Luxor)**. Este repositorio contiene la infraestructura de contratos inteligentes (Solana/Anchor), scripts de despliegue, auditoría y herramientas de integración para un ecosistema financiero descentralizado de tres tokens.

---

## 🏛️ ¿Qué es este proyecto?

Luxor es un protocolo diseñado para la **Soberanía Modular**. A diferencia de los ecosistemas monolíticos, Luxor se divide en tres módulos independientes con propósitos específicos, asegurando que el fallo o éxito de uno no comprometa la integridad de los demás.

### 1. 💎 LXR (Utility Token) - El Motor Económico
*   **Naturaleza:** Token de utilidad volátil.
*   **Propósito:** Pago de servicios dentro del ecosistema, incentivos de red y gobernanza operativa.
*   **Suministro:** Fijo e inmutable de **2,025,000,000 LXR**.
*   **Estado:** Activo desde el bloque génesis.

### 2. 🧱 XLS (Real World Asset - RWA) - El Respaldo Tangible
*   **Naturaleza:** Token de gobernanza respaldado por activos del mundo real (RWA).
*   **Propósito:** Tokenización de rentas, propiedades, infraestructura de IA y centros de datos.
*   **Suministro:** Limitado a **20,250,000 XLS**.
*   **Estado:** Bloqueado e inactivo hasta que se cumplan las condiciones constitucionales de reserva y auditoría.

### 3. 💵 USDX (Stablecoin) - La Estabilidad
*   **Naturaleza:** Stablecoin respaldada por activos.
*   **Propósito:** Proporcionar un medio de intercambio estable sin dependencia de la volatilidad de LXR o XLS.
*   **Estado:** Emisión prohibida hasta que la reserva demuestre el colateral necesario y pase auditorías externas.

---

## 📂 Estructura del Repositorio

*   **`programs/`**: Contratos inteligentes en Rust utilizando el framework Anchor.
*   **`scripts/`**: Scripts de TypeScript para inicialización de tokens, distribución y configuración de la red.
*   **`tests/`**: Suite de pruebas para validar la lógica de los contratos inteligentes.
*   **`app/`**: Posible interfaz o lógica cliente (integrada).
*   **`audit_*.js`**: Scripts especializados para auditoría de balances, integridad de datos y seguridad.
*   **`Whitepaper.md` / `Whitepaper_ES.md`**: La "constitución" del proyecto, detallando la distribución de tokens (tokenomics) y las reglas de gobernanza.

---

## ⚙️ Configuración y Dependencias

El entorno ha sido preparado con las siguientes herramientas:

*   **Node.js & Yarn:** Instaladas todas las dependencias de `package.json`.
*   **Solana CLI (3.0.10):** Para interacción directa con la blockchain.
*   **Anchor CLI (0.32.1):** Para compilar, testear y desplegar los contratos inteligentes.
*   **Rust:** Para el desarrollo de programas on-chain.

### Comandos Principales

| Acción | Comando |
| :--- | :--- |
| **Instalar Dependencias** | `yarn install` |
| **Compilar Contratos** | `anchor build` |
| **Ejecutar Pruebas** | `anchor test` |
| **Crear Tokens** | `yarn create-tokens` |
| **Inicializar Distribución** | `yarn init-dist` |

---

## 🔐 Gobernanza y Seguridad

El proyecto utiliza un sistema de **Multi-Sig (Multifirma)** para operaciones críticas:
*   **Consejo:** 6 miembros.
*   **Umbral (Threshold):** 4 de 6 firmas requeridas para ejecutar cambios.
*   **Transparencia:** El 90% de los recursos pertenecen a la comunidad, y cualquier movimiento de fondos (fuera de wallets operativas personales) debe anunciarse públicamente con 48 horas de antelación.

---

## 🚀 Próximos Pasos Recomendados

1.  **Revisar los Contratos:** Explora `programs/excelsior/src/lib.rs` para entender la lógica on-chain.
2.  **Configurar Wallets:** Asegúrate de que `./wallets/admin.json` sea la wallet correcta para tus operaciones en Devnet/Mainnet.
3.  **Probar el Entorno:** Ejecuta `anchor build` para verificar que el compilador de Rust esté funcionando correctamente.

---
*Este documento es una guía técnica. Para detalles económicos profundos, consulte el [Whitepaper.md](./Whitepaper.md).*
