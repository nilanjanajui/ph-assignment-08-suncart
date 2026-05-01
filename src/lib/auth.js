import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

function getDb() {
    if (!global._mongoClient) {
        global._mongoClient = new MongoClient(process.env.MONGODB_URI);
    }
    return global._mongoClient;
}

export const auth = betterAuth({
    database: mongodbAdapter(getDb().db("suncart"), { client: getDb() }),
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



// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "better-auth/adapters/mongodb";

// function getClient() {
//     if (!global._mongoClient) {
//         global._mongoClient = new MongoClient(process.env.MONGODB_URI, {
//             tls: true,
//             tlsAllowInvalidCertificates: false,
//             serverSelectionTimeoutMS: 10000,
//             socketTimeoutMS: 10000,
//         });
//     }
//     return global._mongoClient;
// }

// export const auth = betterAuth({
//     database: mongodbAdapter(getClient().db("suncart"), { client: getClient() }),
//     trustedOrigins: [
//         "https://ph-assignment-08-suncart-83dg.vercel.app",
//         "http://localhost:3000",
//     ],
//     emailAndPassword: { enabled: true },
//     socialProviders: {
//         google: {
//             clientId: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         },
//     },
//     user: {
//         additionalFields: {
//             image: { type: "string", required: false },
//         },
//     },
// });