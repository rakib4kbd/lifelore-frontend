import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db();

export const checkEmail = async (email) => {
  const userCollection = await db.collection("user");
  const result = await userCollection.findOne({ email: email });
  return result;
};

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      plan: { type: "string", defaultValue: "free", input: false },
      role: { type: "string", defaultValue: "user", input: false },
    },
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: { enabled: true, strategy: "jwt", maxAge: 7 * 24 * 60 * 60 },
  },
  plugins: [jwt()],
});
