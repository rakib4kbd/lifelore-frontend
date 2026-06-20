import { headers } from "next/headers";
import { auth } from "./auth";

const fetchUserSession = async () => {
  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};
  return user;
};

export default fetchUserSession;
