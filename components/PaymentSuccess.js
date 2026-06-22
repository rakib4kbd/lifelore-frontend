"use client";

import React from "react";
import { authClient } from "../lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PaymentSuccess = () => {
  const router = useRouter();
  authClient.signOut();
  router.refresh();

  return (
    <div className="my-10 px-4 sm:px-0">
      <div className="py-16 sm:py-24 text-center max-w-xl mx-auto space-y-6 border-2 border-black dark:border-white p-8 sm:p-12 bg-editorial-card dark:bg-editorial-dark-card">
        <h2 className="text-5xl font-serif italic text-black dark:text-white">
          Access Granted
        </h2>

        <p className="text-sm text-neutral-600 dark:text-neutral-300 font-sans leading-relaxed">
          Your payment has been recorded and your account has been elevated to
          Premium status. The complete lesson archive is now available within
          your library.
        </p>

        <Link
          href="/auth/login"
          className="inline-block px-8 py-3 border-2 border-black dark:border-white bg-black text-white dark:bg-white dark:text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-transparent hover:text-black dark:hover:bg-transparent dark:hover:text-white transition-colors"
        >
          Enter Premium Library
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
