import { headers } from "next/headers";
import { auth } from "./auth";

const getToken = async () => {
  const result = await auth.api.getToken({ headers: await headers() });
  return result?.token ?? null;
};

export default getToken;
