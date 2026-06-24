import { NextResponse } from "next/server";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

const DEMO_ACCOUNTS = [
  {
    email: "admin@gmail.com",
    password: "Admin123!",
    name: "Global Admin",
    role: "admin",
    isPremium: true,
  },
  {
    email: "premium@gmail.com",
    password: "Premium123!",
    name: "Premium Member",
    role: "user",
    isPremium: true,
  },
  {
    email: "free@gmail.com",
    password: "Free123!",
    name: "Free Tier Blogger",
    role: "user",
    isPremium: false,
  },
];

const CATEGORIES = [
  "Career",
  "Relationships",
  "Health",
  "Finance",
  "Personal Growth",
  "Technology",
  "Mindfulness",
  "Philosophy",
  "Leadership",
  "Creativity",
];
const TONES = [
  "Reflective",
  "Optimistic",
  "Cautionary",
  "Inspirational",
  "Nostalgic",
  "Grateful",
  "Determined",
  "Vulnerable",
  "Humorous",
  "Melancholic",
];
const COMMENT_TEXTS = [
  "This completely changed how I approach this topic.",
  "I needed to hear this today. Thank you for sharing.",
  "Profound insight. Sharing this with my team.",
  "This resonates deeply with my own experience.",
  "A timeless piece of wisdom.",
  "I've read this three times already.",
  "Simple yet incredibly powerful.",
  "Beautifully written and deeply moving.",
  "This helped me get through a difficult period.",
  "Exactly what I was searching for.",
];
const REPORT_REASONS = [
  "Misinformation",
  "Inappropriate content",
  "Spam",
  "Copyright violation",
  "Off-topic content",
];

export async function POST(request) {
  // const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  // if (!session?.user || session.user.role !== "admin") {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  // --- Demo accounts ---
  const accountResults = { created: [], updated: [] };
  for (const acc of DEMO_ACCOUNTS) {
    const existing = await db.collection("user").findOne({ email: acc.email });
    if (existing) {
      await db
        .collection("user")
        .updateOne(
          { email: acc.email },
          { $set: { role: acc.role, isPremium: acc.isPremium, isDemo: true } },
        );
      accountResults.updated.push(acc.email);
    } else {
      try {
        await auth.api.signUpEmail({
          body: { email: acc.email, password: acc.password, name: acc.name },
        });
        await db
          .collection("user")
          .updateOne(
            { email: acc.email },
            {
              $set: { role: acc.role, isPremium: acc.isPremium, isDemo: true },
            },
          );
        accountResults.created.push(acc.email);
      } catch {
        accountResults.updated.push(acc.email);
      }
    }
  }

  // --- Random users ---
  const existingSeedUser = await db
    .collection("user")
    .findOne({ email: "seeduser1@lifelore.demo" });
  let randomUsers = [];
  if (!existingSeedUser) {
    randomUsers = Array.from({ length: 10 }, (_, i) => ({
      _id: new ObjectId(),
      email: `seeduser${i + 1}@lifelore.demo`,
      name: `Wisdom Writer ${i + 1}`,
      emailVerified: true,
      image: `https://ui-avatars.com/api/?name=W${i + 1}&background=1a1a1a&color=fafaf6&bold=true`,
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      updatedAt: new Date(),
      isPremium: i % 3 === 0,
      role: "user",
      isDemo: true,
    }));
    await db.collection("user").insertMany(randomUsers);
  }

  // --- Lessons ---
  const existingLessons = await db
    .collection("lessons")
    .countDocuments({ isDemo: true });
  if (existingLessons < 100) {
    const allDemoUsers = await db
      .collection("user")
      .find({ isDemo: true })
      .toArray();
    const lessons = Array.from({ length: 100 }, (_, i) => {
      const creator = allDemoUsers[i % allDemoUsers.length];
      return {
        _id: new ObjectId(),
        title: `${CATEGORIES[i % CATEGORIES.length]}: Lesson ${i + 1}`,
        description: `A ${TONES[i % TONES.length].toLowerCase()} reflection on ${CATEGORIES[i % CATEGORIES.length].toLowerCase()}. This lesson explores the deeper meaning behind everyday experiences and offers actionable insight for personal growth.`,
        category: CATEGORIES[i % CATEGORIES.length],
        emotionalTone: TONES[i % TONES.length],
        visibility: i % 4 === 0 ? "Private" : "Public",
        accessLevel: i % 3 === 0 ? "Premium" : "Free",
        likes: [],
        likesCount: Math.floor(Math.random() * 50),
        favourites: [],
        favouritesCount: Math.floor(Math.random() * 30),
        isFeatured: i % 7 === 0,
        isReviewed: i % 2 === 0,
        creatorId: creator._id.toString(),
        creatorName: creator.name,
        creatorPhoto: creator.image,
        createdAt: new Date(
          Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000,
        ),
        updatedAt: new Date(),
        isDemo: true,
      };
    });
    await db.collection("lessons").insertMany(lessons);
  }

  // --- Comments ---
  const existingComments = await db
    .collection("comments")
    .countDocuments({ isDemo: true });
  if (existingComments < 500) {
    const [demoLessons, demoUsers] = await Promise.all([
      db.collection("lessons").find({ isDemo: true }).toArray(),
      db.collection("user").find({ isDemo: true }).toArray(),
    ]);
    const comments = Array.from({ length: 500 }, (_, i) => ({
      _id: new ObjectId(),
      lessonId: demoLessons[i % demoLessons.length]._id.toString(),
      userId: demoUsers[i % demoUsers.length]._id.toString(),
      text: COMMENT_TEXTS[i % COMMENT_TEXTS.length],
      createdAt: new Date(
        Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000,
      ),
      isDemo: true,
    }));
    await db.collection("comments").insertMany(comments);
  }

  // --- Reports ---
  const existingReports = await db
    .collection("lessonReports")
    .countDocuments({ isDemo: true });
  if (existingReports < 50) {
    const [demoLessons, demoUsers] = await Promise.all([
      db.collection("lessons").find({ isDemo: true }).toArray(),
      db.collection("user").find({ isDemo: true }).toArray(),
    ]);
    const reports = Array.from({ length: 50 }, (_, i) => ({
      _id: new ObjectId(),
      lessonId: demoLessons[i % demoLessons.length]._id.toString(),
      userId: demoUsers[i % demoUsers.length]._id.toString(),
      reason: REPORT_REASONS[i % REPORT_REASONS.length],
      createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000),
      isDemo: true,
    }));
    await db.collection("lessonReports").insertMany(reports);
  }

  return NextResponse.json({ success: true, accounts: accountResults });
}
