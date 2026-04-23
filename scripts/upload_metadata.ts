import Irys from "@irys/sdk";
import * as fs from "fs";
import * as path from "path";
import bs58 from "bs58";

const RPC_URL = process.env.RPC_URL || "https://api.mainnet-beta.solana.com";

const secretKeyArray = JSON.parse(fs.readFileSync(path.join(__dirname, "../wallets/admin.json"), "utf8"));
const adminSecretBase58 = bs58.encode(Buffer.from(secretKeyArray));

async function uploadToArweave(filePath: string, tags: { name: string, value: string }[]) {
    const irys = new Irys({
        network: "mainnet",
        token: "solana",
        key: adminSecretBase58,
        config: { providerUrl: RPC_URL }
    });

    console.log(`Uploading ${filePath}...`);
    try {
        const receipt = await irys.uploadFile(filePath, { tags });
        const url = `https://gateway.irys.xyz/${receipt.id}`;
        console.log(`Uploaded! URL: ${url}`);
        return url;
    } catch (e) {
        console.error("Error uploading file:", e);
        throw e;
    }
}

async function uploadJson(jsonData: any) {
    const irys = new Irys({
        network: "mainnet",
        token: "solana",
        key: adminSecretBase58,
        config: { providerUrl: RPC_URL }
    });

    console.log(`Uploading JSON Metadata...`);
    const tags = [{ name: "Content-Type", value: "application/json" }];
    const receipt = await irys.upload(JSON.stringify(jsonData), { tags });
    const url = `https://gateway.irys.xyz/${receipt.id}`;
    console.log(`Uploaded JSON URL: ${url}`);
    return url;
}

async function main() {
    console.log("Funding Irys node with 0.01 SOL...");
    const irys = new Irys({
        network: "mainnet",
        token: "solana",
        key: adminSecretBase58,
        config: { providerUrl: RPC_URL }
    });

    try {
        await irys.fund(irys.utils.toAtomic(0.01));
        console.log("Funding successful! Proceeding with uploads.");
    } catch {
        // If it fails, maybe it already has enough funds, we will proceed anyway
        console.log("Funding attempt returned an error or skipped. Proceeding.");
    }

    const lxrImagePath = path.join(__dirname, "../logos/lxr_logo.png");
    const xlsImagePath = path.join(__dirname, "../logos/xls_logo.png");

    console.log("Uploading LXR Logo to Arweave...");
    const lxrImageUrl = await uploadToArweave(lxrImagePath, [{ name: "Content-Type", value: "image/png" }]);

    console.log("Uploading XLS Logo to Arweave...");
    const xlsImageUrl = await uploadToArweave(xlsImagePath, [{ name: "Content-Type", value: "image/png" }]);

    console.log("Creating Metadata JSONs...");

    const lxrMetadata = {
        name: "Luxor",
        symbol: "LXR",
        description: "LXR (Luxor): The high-velocity hype engine of the Excelsior Ecosystem. Built on a rock-solid foundation, LXR is fueled entirely by community momentum. No expectations, just pure collective growth.",
        image: lxrImageUrl,
        attributes: [
            { trait_type: "Type", value: "Ecosystem Utility" },
            { trait_type: "Fee", value: "1% Transfer Fee" }
        ]
    };

    const xlsMetadata = {
        name: "Excelsior",
        symbol: "XLS",
        description: "XLS (Excelsior): The utility and governance cornerstone of the Excelsior protocol. Built as a solid foundation to empower participants and drive the collective evolution of our digital landscape.",
        image: xlsImageUrl,
        attributes: [
            { trait_type: "Type", value: "Governance & Core Utility" }
        ]
    };

    const lxrJsonUrl = await uploadJson(lxrMetadata);
    const xlsJsonUrl = await uploadJson(xlsMetadata);

    console.log("\n=========================");
    console.log("METADATA UPLOAD SUCCESSFUL!");
    console.log("LXR Metadata JSON:", lxrJsonUrl);
    console.log("XLS Metadata JSON:", xlsJsonUrl);
    console.log("=========================\n");
}

main().catch(console.error);
