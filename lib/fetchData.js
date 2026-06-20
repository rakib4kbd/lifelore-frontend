export const fetchLessonsByCreatorId = async (creatorId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/creator/${creatorId}`,
  );
  const data = await res.json();
  return data;
};

export const fetchFreeLessons = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/free`,
  );
  const data = await res.json();
  return data;
};

export const fetchLessons = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons`);
  const data = await res.json();
  return data;
};

export const fetchPublicLessons = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/public`,
  );
  const data = await res.json();
  return data;
};

export const fetchLessonById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${id}`,
  );
  const data = await res.json();
  return data;
};

export const fetchFeaturedLessons = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/featured`,
  );
  const data = await res.json();
  return data;
};

export const fetchLessonCountByCreatorId = async (creatorId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/count/${creatorId}`,
  );
  const data = await res.json();
  return data;
};

export const fetchMostFavouriteLessons = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite`,
  );
  const data = await res.json();
  return data;
};

export const fetchAllUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/api/users`);
  const data = await res.json();
  return data;
};

export const fetchUsersWithLessonCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/usersWithLessonCount`,
  );
  const data = await res.json();
  return data;
};

export const fetchCommentsByLessonId = async (lessonId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/comments/${lessonId}`,
  );
  const data = await res.json();
  return data;
};

export const fetchFavouriteLessonsByUserId = async (userId) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/favourite/${userId}`,
  );
  const data = await res.json();
  return data;
};

export const fetchTotalLessonCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/count`,
  );
  const data = await res.json();
  return data;
};

export const fetchTotalUserCount = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/count`,
  );
  const data = await res.json();
  return data;
};

export const fetchAdminStats = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/admin/overview`,
  );
  const data = await res.json();
  return data;
};
