import AddLessons from "@/components/Dashboard/AddLessons/AddLessons";
import userSession from "@/lib/userSession";
import React from "react";

const AddLessonPage = async () => {
  const user = await userSession();
  return <AddLessons user={user} />;
};

export default AddLessonPage;
