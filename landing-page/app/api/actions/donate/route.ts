import { ActionGetResponse, ActionPostRequest, ActionPostResponse, createPostResponse, ACTIONS_CORS_HEADERS } from "@solana/actions";
import { Connection, PublicKey, SystemProgram, Transaction, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { NextResponse } from 'next/server';

const TARGET_WALLET = "FEARFtN9VueEFVDCahtoWGu1A8Xdsmr2et3iWqAVo6hg";

export const GET = async (req: Request) => {
    try {
        const url = new URL(req.url);

        const payload: ActionGetResponse = {
            title: "Support Luxor Development",
            icon: new URL("/assets/icons/lxr_logo.png", url.origin).toString(),
            description: "Contributions to the Luxor Systems Treasury via Squads Multisig.",
            label: "Contribute",
            links: {
                actions: [
                    {
                        type: "transaction",
                        label: "0.1 SOL",
                        href: new URL(`/api/actions/donate?amount=0.1`, url.origin).toString()
                    },
                    {
                        type: "transaction",
                        label: "1 SOL",
                        href: new URL(`/api/actions/donate?amount=1`, url.origin).toString()
                    },
                    {
                        type: "transaction",
                        label: "Custom",
                        href: new URL(`/api/actions/donate?amount={amount}`, url.origin).toString(),
                        parameters: [
                            {
                                name: "amount",
                                label: "Enter custom SOL amount",
                                required: true,
                            }
                        ]
                    }
                ]
            }
        };

        return NextResponse.json(payload, {
            headers: ACTIONS_CORS_HEADERS
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json("An error occurred", { status: 500, headers: ACTIONS_CORS_HEADERS });
    }
}

export const OPTIONS = async () => new Response(null, { headers: ACTIONS_CORS_HEADERS });

export const POST = async (req: Request) => {
    try {
        const body: ActionPostRequest = await req.json();

        const url = new URL(req.url);
        const amountParam = url.searchParams.get("amount");
        const amount = parseFloat(amountParam || "0.1");

        let account: PublicKey;
        try {
            account = new PublicKey(body.account);
        } catch (err) {
            return NextResponse.json({ error: "Invalid account provided" }, { status: 400, headers: ACTIONS_CORS_HEADERS });
        }

        const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "https://api.mainnet-beta.solana.com");

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: account,
                toPubkey: new PublicKey(TARGET_WALLET),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );

        transaction.feePayer = account;
        transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

        const payload: ActionPostResponse = await createPostResponse({
            fields: {
                type: "transaction",
                transaction,
                message: `Thank you for supporting Luxor ecosystem with ${amount} SOL!`,
            }
        });

        return NextResponse.json(payload, { headers: ACTIONS_CORS_HEADERS });
    } catch (err) {
        console.error(err);
        return NextResponse.json("An error occurred", { status: 500, headers: ACTIONS_CORS_HEADERS });
    }
}
