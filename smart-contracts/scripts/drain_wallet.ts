import { Connection, Keypair, PublicKey, SystemProgram, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';

const RPC_URL = process.env.RPC_URL || 'https://api.mainnet-beta.solana.com';
const connection = new Connection(RPC_URL, 'confirmed');

async function drainWallet() {
    const adminPath = '/home/itsroosevelt_/excelsior-project/smart-contracts/wallets/admin.json';
    const secret = JSON.parse(fs.readFileSync(adminPath, 'utf8'));
    const adminKp = Keypair.fromSecretKey(new Uint8Array(secret));

    const targetAddress = new PublicKey('HSVNZpogeqKejdWrpm3uVxjopYUj63MCfMKd1rRPVe4X');

    const balance = await connection.getBalance(adminKp.publicKey);
    console.log(`Current admin.json balance: ${balance / 1e9} SOL`);

    if (balance === 0) {
        console.log('Wallet is already empty.');
        return;
    }

    const recentBlockhash = await connection.getLatestBlockhash();

    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: adminKp.publicKey,
            toPubkey: targetAddress,
            lamports: balance,
        })
    );
    tx.recentBlockhash = recentBlockhash.blockhash;
    tx.feePayer = adminKp.publicKey;

    const feeMessage = tx.compileMessage();
    const feeResponse = await connection.getFeeForMessage(feeMessage, 'confirmed');

    const fee = feeResponse.value || 5000;
    const transferAmount = balance - fee;

    if (transferAmount <= 0) {
        console.log('Balance too low to cover transaction fees.');
        return;
    }

    console.log(`Transferring ${transferAmount / 1e9} SOL to ${targetAddress.toBase58()}...`);

    const finalTx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: adminKp.publicKey,
            toPubkey: targetAddress,
            lamports: transferAmount,
        })
    );

    const signature = await sendAndConfirmTransaction(connection, finalTx, [adminKp]);
    console.log(`Successfully transferred! Signature: ${signature}`);

    const newBal = await connection.getBalance(adminKp.publicKey);
    console.log(`Remaining balance: ${newBal / 1e9} SOL`);
}

drainWallet().catch(console.error);
