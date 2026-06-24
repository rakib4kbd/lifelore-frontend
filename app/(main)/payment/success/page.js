import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import { upgradeUserToPremium } from "@/lib/auth";
import PaymentSuccess from "@/components/PaymentSuccess";

const CheckoutSuccess = async ({ searchParams }) => {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id (`cs_test_...`)");
  }

  const { status, metadata } = await stripe.checkout.sessions.retrieve(
    session_id,
    { expand: ["line_items", "payment_intent"] },
  );

  if (status === "open") redirect("/");

  let upgradeFailed = false;

  if (status === "complete") {
    try {
      await upgradeUserToPremium(metadata.userId);
    } catch {
      upgradeFailed = true;
    }
  }

  if (upgradeFailed) {
    return (
      <div className="my-10 px-4 sm:px-0">
        <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 border-2 border-black dark:border-white p-8 sm:p-12 bg-editorial-card dark:bg-editorial-dark-card">
          <h2 className="text-5xl font-serif italic text-black dark:text-white">
            Upgrade Pending
          </h2>
          <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
            Your payment was received, but we could not update your account
            automatically. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return <PaymentSuccess />;
};

export default CheckoutSuccess;
