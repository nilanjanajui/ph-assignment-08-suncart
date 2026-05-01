import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const uri = process.env.MONGODB_URI;

if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
}

const clientPromise = global._mongoClientPromise;
const connectedClient = await clientPromise;
const db = connectedClient.db("suncart");

export const auth = betterAuth({
    database: mongodbAdapter(db, { client: connectedClient }),
    trustedOrigins: [
        "https://ph-assignment-08-suncart-83dg.vercel.app",
        "http://localhost:3000",
    ],
    emailAndPassword: {
        enabled: true,
    },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    user: {
        additionalFields: {
            image: {
                type: "string",
                required: false,
            },
        },
    },
});