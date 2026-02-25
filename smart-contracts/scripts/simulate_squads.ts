import { Connection, PublicKey, Transaction, TransactionInstruction, Keypair } from "@solana/web3.js";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";
const connection = new Connection(RPC_URL, "confirmed");

// The base64 data generated previously
const lxrData = Buffer.from("KgAFAAAATHV4b3IDAAAATFhSRAAAAGh0dHBzOi8vZ2F0ZXdheS5pcnlzLnh5ei9Bc0FEMGY3Ml9xVDE0YlZWUXFCSFJUOEpHdWZubUV6YnFXMXpLTmVUb3BFAAAAAAECAAAAAAEJAA==", "base64");

const metadataPda = new PublicKey("2v8YSYwkRdgbe284KKrWAqrAHjsy3gPpzjmpWnGmtvwF");
const programIdPlaceHolder = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const lxrMint = new PublicKey("7Qm6qUCXGZfGBYYFzq2kTbwTDah5r3d9DcPJHRT8Wdth");
const squadsVault = new PublicKey("HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe");
const sysProgram = new PublicKey("11111111111111111111111111111111");
const sysvarInstructions = new PublicKey("Sysvar1nstructions1111111111111111111111111");
const token2022 = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");

const ix = new TransactionInstruction({
    programId: programIdPlaceHolder,
    data: lxrData,
    keys: [
        { pubkey: metadataPda, isSigner: false, isWritable: true },
        { pubkey: programIdPlaceHolder, isSigner: false, isWritable: false }, // masterEdition
        { pubkey: lxrMint, isSigner: false, isWritable: true },
        { pubkey: squadsVault, isSigner: true, isWritable: false }, // auth
        { pubkey: squadsVault, isSigner: true, isWritable: true }, // payer
        { pubkey: squadsVault, isSigner: false, isWritable: false }, // update auth
        { pubkey: sysProgram, isSigner: false, isWritable: false },
        { pubkey: sysvarInstructions, isSigner: false, isWritable: false },
        { pubkey: token2022, isSigner: false, isWritable: false },
    ]
});

async function simulate() {
    const tx = new Transaction();
    tx.add(ix);
    tx.feePayer = squadsVault; // pretending to be the vault
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    console.log("Simulating transaction...");
    const res = await connection.simulateTransaction(tx);
    console.log(JSON.stringify(res.value, null, 2));
}

simulate().catch(console.error);
