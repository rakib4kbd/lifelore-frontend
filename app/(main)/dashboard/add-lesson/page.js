import AddLessons from "@/components/Dashboard/AddLessons/AddLessons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import React from "react";

const AddLessonPage = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  return <AddLessons user={user} />;
};

export default AddLessonPage;
