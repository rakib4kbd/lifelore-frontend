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

export const fetchLessonById = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/lessons/${id}`,
  );
  const data = await res.json();
  return data;
};
