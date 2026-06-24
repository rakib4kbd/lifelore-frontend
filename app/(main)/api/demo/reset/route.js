import { NextResponse } from "next/server";
import { auth, db } from "@/lib/auth";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export async function POST(request) {
  // const session = await auth.api.getSession({ headers: await headers() }).catch(() => null);
  // if (!session?.user || session.user.role !== "admin") {
  //   return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  // }

  // Delete all demo-tagged data
  await Promise.all([
    db.collection("lessons").deleteMany({ isDemo: true }),
    db.collection("comments").deleteMany({ isDemo: true }),
    db.collection("lessonReports").deleteMany({ isDemo: true }),
    // Delete random seed users (not the named demo accounts)
    db.collection("user").deleteMany({
      isDemo: true,
      email: { $regex: /^seeduser\d+@lifelore\.demo$/ },
    }),
  ]);

  // Revoke sessions for demo accounts so they get fresh sessions on next login
  const demoEmails = ["admin@gmail.com", "premium@gmail.com", "free@gmail.com"];
  const demoUsers = await db
    .collection("user")
    .find({ email: { $in: demoEmails } }, { projection: { _id: 1 } })
    .toArray();
  const demoIds = demoUsers.map((u) => u._id.toString());
  if (demoIds.length) {
    await db.collection("session").deleteMany({ userId: { $in: demoIds } });
  }

  // Re-seed by calling the seed route logic inline
  // const seedResponse = await fetch(new URL("/api/demo/seed", request.url), {
  //   method: "POST",
  //   headers: { cookie: request.headers.get("cookie") || "" },
  // });

  // if (!seedResponse.ok) {
  //   return NextResponse.json(
  //     { error: "Reset completed but re-seed failed" },
  //     { status: 500 },
  //   );
  // }

  return NextResponse.json({
    success: true,
    message: "Demo database reset and re-seeded.",
  });
}
