"use client";
import showToast from "@/lib/showAlertToast";
import { CreditCard } from "lucide-react";
import { Award } from "lucide-react";
import React, { useState } from "react";

const UpgradeButton = ({ user }) => {
  return (
    <div className="pt-8 relative z-10">
      {user && user?.isPremium ? (
        <div className="w-full text-center py-3.5 border-2 border-black bg-black text-white text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
          <Award className="w-4 h-4 text-white" />
          VERIFIED LIFETIME PRESTIGE CHARTERED
        </div>
      ) : (
        <form action="/api/checkout" method="POST">
          <section>
            <button
              type="submit"
              role="link"
              className="w-full text-center py-3.5 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[11px] font-black uppercase tracking-widest rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Upgrade to Premium
            </button>
          </section>
        </form>
      )}
      <p className="text-[9px] font-bold uppercase tracking-widest text-neutral-400 text-center mt-3">
        🛡️ Powered by Stripe Checkout secure channel. Perpetual database
        hosting.
      </p>
    </div>
  );
};

export default UpgradeButton;
