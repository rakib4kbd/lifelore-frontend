import MyLessons from "@/components/Dashboard/MyLessons/MyLessons";
import MyLessonsTableRow from "@/components/Dashboard/MyLessons/MyLessonsTableRow";
import { auth } from "@/lib/auth";
import { fetchLessonsByCreatorId } from "@/lib/fetchData";
import {
  Layers,
  ThumbsUp,
  Star,
  Globe,
  Edit,
  Trash2,
  Lock,
  Filter,
} from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const MyLessonsPage = async () => {
  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};

  if (!user) {
    redirect("/auth/login");
  }

  const lessons = await fetchLessonsByCreatorId(user.id);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h2 className="flex items-center gap-2 text-xl font-black uppercase tracking-widest text-black dark:text-white">
          <Layers className="h-5 w-5" />
          My Wisdom Ledger
        </h2>

        <p className="mt-1 text-sm text-zinc-500">
          Review, edit and manage your published wisdom lessons.
        </p>
      </div>
      <MyLessons lessons={lessons} user={user} />
    </div>
  );
};

export default MyLessonsPage;
