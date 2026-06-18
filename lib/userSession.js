import { auth } from "./auth";
import { headers } from "next/headers";

const userSession = async () => {
  const { user } = await auth.api.getSession({ headers: await headers() });
  return user;
};

export default userSession;
