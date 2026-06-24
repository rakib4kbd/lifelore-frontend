import { betterAuth } from "better-auth";
import { MongoClient, ObjectId } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);
export const db = client.db();

export const checkEmail = async (email) => {
  return db.collection("user").findOne({ email });
};

export const upgradeUserToPremium = async (userId) => {
  await db.collection("user").updateOne(
    { _id: new ObjectId(userId) },
    { $set: { isPremium: true } },
  );
  // Revoke active sessions so the next sign-in returns fresh premium status
  await db.collection("session").deleteMany({ userId });
};

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      isPremium: { type: "boolean", defaultValue: false, input: false },
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
    // 60 s cache ensures subscription/role changes surface within one minute
    // without requiring re-authentication on normal requests.
    cookieCache: { enabled: true, strategy: "jwt", maxAge: 60 },
  },
  plugins: [jwt()],
});
