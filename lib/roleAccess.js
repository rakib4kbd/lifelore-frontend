import { headers } from "next/headers";
import { auth } from "./auth";
import { redirect } from "next/navigation";

export const roleAccess = async (role) => {
  const { user } = await auth.api.getSession({ headers: await headers() });

  if (user.role !== role) {
    redirect("/forbidden");
  }
};
