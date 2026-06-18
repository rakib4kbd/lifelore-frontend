import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { AArrowDown } from "lucide-react";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const CheckoutSuccess = async ({ searchParams }) => {
  const { session_id } = await searchParams;
  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)");

  const {
    status,
    customer_details: { email: customerEmail },
    metadata: { userId },
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ isPremium: true }),
        },
      );
      await auth.api.revokeSession({ headers: await headers() });
    } catch (error) {
      console.error("Error occurred while upgrading user:", error);
    }

    return (
      <section id="success" className="max-w-7xl mx-auto my-10">
        <p>Upgrade successful! Your account has been upgraded to Premium.</p>
      </section>
    );
  }
};

export default CheckoutSuccess;
