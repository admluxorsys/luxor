import { Connection, PublicKey, SystemProgram, SYSVAR_RENT_PUBKEY, Keypair } from "@solana/web3.js";
import { createCreateInstruction } from "@metaplex-foundation/mpl-token-metadata";
import bs58 from "bs58";
import * as fs from "fs";
import * as path from "path";

// 1. Read the mints (these are the same files used in handover)
const lxrSecretArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../wallets/lxr_mint.json"), "utf8"));
const xlsSecretArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../wallets/xls_mint.json"), "utf8"));

const lxrMint = Keypair.fromSecretKey(new Uint8Array(lxrSecretArray)).publicKey;
const xlsMint = Keypair.fromSecretKey(new Uint8Array(xlsSecretArray)).publicKey;

const SQUADS_VAULT = new PublicKey("HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe");
const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
const TOKEN_2022_PROGRAM_ID = new PublicKey("TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb");
const SYSVAR_INSTRUCTIONS_PUBKEY = new PublicKey("Sysvar1nstructions1111111111111111111111111");

console.log("=== SQUADS TRANSACTION BUILDER PARAMETERS ===");
console.log("Program ID for BOTH:");
console.log(TOKEN_METADATA_PROGRAM_ID.toBase58());

function generateInstruction(name: string, symbol: string, uri: string, mint: PublicKey) {
    const [metadataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID
    );

    const ix = createCreateInstruction({
        metadata: metadataPda,
        mint: mint,
        authority: SQUADS_VAULT,
        payer: SQUADS_VAULT,
        updateAuthority: SQUADS_VAULT,
        systemProgram: SystemProgram.programId,
        sysvarInstructions: SYSVAR_INSTRUCTIONS_PUBKEY,
        splTokenProgram: TOKEN_2022_PROGRAM_ID
    }, {
        createArgs: {
            __kind: "V1",
            assetData: {
                name: name,
                symbol: symbol,
                uri: uri,
                sellerFeeBasisPoints: 0,
                creators: null,
                primarySaleHappened: false,
                isMutable: true,
                tokenStandard: 2, // Fungible
                collection: null,
                uses: null,
                collectionDetails: null,
                ruleSet: null
            },
            decimals: 9,
            printSupply: null
        }
    });

    console.log(`\n--- INSTRUCTION: ${symbol} METADATA ---`);
    console.log("Instruction DATA (Base64):");
    console.log(ix.data.toString("base64"));
    console.log("\nAccounts in Order:");
    ix.keys.forEach((k, idx) => {
        console.log(`${idx + 1}. Pubkey: ${k.pubkey.toBase58()} | isSigner: ${k.isSigner} | isWritable: ${k.isWritable}`);
    });
}

generateInstruction(
    "Luxor",
    "LXR",
    "https://gateway.irys.xyz/AsAD0f72_qT14bVVQqBHRT8JGufnmEzbqW1zKNeTopE",
    lxrMint
);

generateInstruction(
    "Excelsior",
    "XLS",
    "https://gateway.irys.xyz/k8B0-0fkqyXr922lgSr1SkSkYZ6X7nFGPi0P8qyOcrk",
    xlsMint
);
