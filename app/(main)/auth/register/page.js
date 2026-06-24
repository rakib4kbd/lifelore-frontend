import { redirect } from "next/navigation";

const RegisterPage = async ({ searchParams }) => {
  const { callbackUrl } = await searchParams;
  const dest = callbackUrl
    ? `/auth/login?mode=register&callbackUrl=${encodeURIComponent(callbackUrl)}`
    : "/auth/login?mode=register";
  redirect(dest);
};

export default RegisterPage;
