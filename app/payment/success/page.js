import { auth } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
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

  console.log(status, customerEmail, userId);
  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/api/users/${userId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isPremium: true }),
      },
    );

    console.log(await res.status);

    if (res.status !== 200) {
      return (
        <section id="error" className="max-w-7xl mx-auto my-10">
          <p>
            An error occurred while upgrading your account. Please try again.
            <br />
            {error.message}
          </p>
        </section>
      );
    }
  }

  await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section id="success" className="max-w-7xl mx-auto my-10">
      <p>Upgrade successful! Your account has been upgraded to Premium.</p>
    </section>
  );
};

export default CheckoutSuccess;
