import { Connection, PublicKey, SystemProgram } from "@solana/web3.js";
import { createUpdateMetadataAccountV2Instruction } from "@metaplex-foundation/mpl-token-metadata";
import Irys from "@irys/sdk";
import bs58 from "bs58";
import * as fs from "fs";
import * as path from "path";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";

const getIrysUploader = async () => {
    const secretKeyArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../wallets/admin.json"), "utf8"));
    const adminSecretBase58 = bs58.encode(Buffer.from(secretKeyArray));

    const irys = new Irys({
        network: "mainnet",
        token: "solana",
        key: adminSecretBase58,
        config: { providerUrl: RPC_URL }
    });
    return irys;
};

const uploadToArweave = async (filePath: string, tags: { name: string, value: string }[]) => {
    try {
        const irys = await getIrysUploader();
        const fileToUpload = fs.readFileSync(filePath);

        console.log(`Checking balance for upload size ${fileToUpload.length} bytes...`);
        const price = await irys.getPrice(fileToUpload.length);
        const atomicBalance = await irys.getLoadedBalance();

        if (atomicBalance.isLessThan(price)) {
            console.log(`Funding Irys node for ${irys.utils.fromAtomic(price)} SOL...`);
            await irys.fund(price);
        }

        console.log(`Uploading ${path.basename(filePath)}...`);
        const receipt = await irys.uploadFile(filePath, { tags });

        const url = `https://gateway.irys.xyz/${receipt.id}`;
        console.log(`Successfully uploaded: ${url}`);
        return url;
    } catch (error) {
        console.error("Error uploading to Arweave:", error);
        throw error;
    }
};

async function main() {
    const SQUADS_VAULT = new PublicKey("HQ8eEKM88MWZ45sKaXoD3jf3fHUYQqYCgYeogRrejRe");
    const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
    const mint = new PublicKey("GM4vKHRrqg84mKRixpVr5FuLUNL45b5dFLqcYQQpwoki"); // XLS

    // 1. Upload new image
    const imagePath = path.join(__dirname, "../../logos/xls_logo.png");
    const imageUrl = await uploadToArweave(imagePath, [{ name: "Content-Type", value: "image/png" }]);

    // 2. Upload new metadata JSON
    const metadataObject = {
        name: "Excelsior",
        symbol: "XLS",
        description: "El Ecosistema Financiero del Futuro en Solana",
        image: imageUrl,
        external_url: "https://excelsior.lat"
    };

    const metadataTempPath = path.join(__dirname, "xls_metadata_temp.json");
    fs.writeFileSync(metadataTempPath, JSON.stringify(metadataObject, null, 2));

    const metadataUrl = await uploadToArweave(metadataTempPath, [{ name: "Content-Type", value: "application/json" }]);
    fs.unlinkSync(metadataTempPath);

    // 3. Generate Update Instruction
    const [metadataPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("metadata"), TOKEN_METADATA_PROGRAM_ID.toBuffer(), mint.toBuffer()],
        TOKEN_METADATA_PROGRAM_ID
    );

    const ix = createUpdateMetadataAccountV2Instruction({
        metadata: metadataPda,
        updateAuthority: SQUADS_VAULT,
    }, {
        updateMetadataAccountArgsV2: {
            data: {
                name: "Excelsior",
                symbol: "XLS",
                uri: metadataUrl,
                sellerFeeBasisPoints: 0,
                creators: null,
                collection: null,
                uses: null
            },
            updateAuthority: SQUADS_VAULT,
            primarySaleHappened: null,
            isMutable: true,
        }
    });

    const txDataBytes = ix.data;
    const txDataBase58 = bs58.encode(txDataBytes);

    console.log(`\n\n=== XLS METADATA UPDATE PARAMETERS ===`);
    console.log(`Program ID: ${ix.programId.toBase58()}`);
    console.log(`Instruction Data (Base58):\n${txDataBase58}\n`);
    console.log(`Accounts in Order:`);
    ix.keys.forEach((k, i) => {
        console.log(`${i + 1}. Pubkey: ${k.pubkey.toBase58()} | isSigner: ${k.isSigner} | isWritable: ${k.isWritable}`);
    });
}

main().catch(console.error);
