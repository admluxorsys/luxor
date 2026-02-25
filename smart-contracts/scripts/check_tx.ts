import { Connection } from '@solana/web3.js';
const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL, 'confirmed');

async function checkTx() {
    const sig = '2ZjVHLx7wNkTx8FPGYxcupxALJLQTguVmydm2SjkXQXLeCqC8Ej1D6g9LWAtoZG518utCTLZL8M1tQKbv6khmccu';
    console.log(`Checking tx: ${sig}`);
    const tx = await connection.getTransaction(sig, { maxSupportedTransactionVersion: 0 });
    if (!tx) {
        console.log('Transaction not found yet or dropped.');
        return;
    }

    if (tx.meta && tx.meta.err) {
        console.log('Transaction Failed:', JSON.stringify(tx.meta.err, null, 2));
        console.log('Logs:');
        if (tx.meta.logMessages) {
            tx.meta.logMessages.forEach(l => console.log(l));
        }
    } else {
        console.log('Transaction Succeeded.');
    }
}
checkTx().catch(console.error);
