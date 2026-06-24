"use client";

import React, { Suspense, useState } from "react";
import { useForm } from "react-hook-form";
import {
  ArrowRight,
  Lock,
  UserIcon,
  Sparkles,
  Mail,
  Camera,
  ShieldCheck,
  RefreshCw,
  Database,
} from "lucide-react";
import { authClient, signIn, signUp } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import showAlertToast from "@/lib/showAlertToast";
import showSuccessToast from "@/lib/showSuccessToast";

const DEMO_ACCOUNTS = [
  {
    name: "Global Admin",
    email: "admin@gmail.com",
    pass: "Admin123!",
    role: "ADMIN CONSOLE",
  },
  {
    name: "Premium Member",
    email: "premium@gmail.com",
    pass: "Premium123!",
    role: "PREMIUM MEMBER",
  },
  {
    name: "Free Tier Blogger",
    email: "free@gmail.com",
    pass: "Free123!",
    role: "FREE BLOGGER",
  },
];

const LoginPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const rawCallback = searchParams?.get("callbackUrl") ?? "";
  const safeCallback =
    rawCallback.startsWith("/") && !rawCallback.startsWith("//")
      ? rawCallback
      : null;

  const mode = searchParams?.get("mode") === "register" ? "register" : "login";
  const [activeMode, setActiveMode] = useState(mode);

  if (user) {
    const dest =
      safeCallback ??
      (user.role === "admin" ? "/admin/overview" : "/dashboard/overview");
    router.push(dest);
  }

  const [loading, setLoading] = useState(false);
  const [seedStatus, setSeedStatus] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { name: "", email: "", password: "", photoURL: "" },
  });

  const password = watch("password", "");

  const onSubmit = async (formData) => {
    setLoading(true);
    const { name, email, password: pw, photoURL } = formData;

    if (activeMode === "login") {
      const { error } = await signIn.email({
        email,
        password: pw,
        callbackURL: safeCallback ?? "/dashboard/overview",
      });
      if (error) showAlertToast(error.message);
      else showSuccessToast("Login successful!");
    } else {
      const { error } = await signUp.email({
        name,
        email,
        password: pw,
        image: photoURL,
        callbackURL: safeCallback ?? "/dashboard/overview",
      });
      if (error) showAlertToast(error.message);
      else showSuccessToast("Registration successful! Please sign in.");
    }
    setLoading(false);
  };

  const handleDemoLogin = async (acc) => {
    setLoading(true);
    try {
      const { data, error } = await signIn.email({
        email: acc.email,
        password: acc.pass,
      });
      if (error) showAlertToast(error.message);
    } catch (e) {
      showAlertToast(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    signIn.social({
      provider: "google",
      callbackURL: safeCallback ?? "/dashboard/overview",
    });
  };

  const handleSeed = async () => {
    setSeedStatus("loading");
    try {
      const res = await fetch("/api/demo/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSeedStatus("success");
        showSuccessToast("Demo data seeded successfully.");
      } else {
        setSeedStatus("error");
        showAlertToast(data.error || "Seed failed.");
      }
    } catch {
      setSeedStatus("error");
      showAlertToast("Seed request failed.");
    }
  };

  const handleReset = async () => {
    if (
      !window.confirm(
        "Reset demo database? This will delete all seeded data and recreate it.",
      )
    )
      return;
    setSeedStatus("loading");
    try {
      const res = await fetch("/api/demo/reset", { method: "POST" });
      const data = await res.json();
      if (res.ok) {
        setSeedStatus("success");
        showSuccessToast("Demo database reset successfully.");
      } else {
        setSeedStatus("error");
        showAlertToast(data.error || "Reset failed.");
      }
    } catch {
      setSeedStatus("error");
      showAlertToast("Reset request failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white dark:bg-editorial-dark-bg border-2 border-black dark:border-white rounded-none shadow-none space-y-6 text-left">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto border-2 border-black">
          <Sparkles className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-serif font-black text-black dark:text-white tracking-tight uppercase">
          {activeMode === "login"
            ? "Accredit Your Wisdom"
            : "Assemble Your Ledger"}
        </h2>
      </div>

      <div className="flex p-1 bg-neutral-100 dark:bg-neutral-900 border-2 border-black rounded-none">
        {["login", "register"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setActiveMode(m)}
            className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
              activeMode === m
                ? "bg-black text-white dark:bg-white dark:text-black border border-black"
                : "text-neutral-500 hover:text-black dark:hover:text-white"
            }`}
          >
            {m === "login" ? "Sign In" : "Register"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {activeMode === "register" && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-editorial-text dark:text-white block">
              Full Name
            </label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="text"
                placeholder="Marcus Aurelius"
                className="w-full pl-9 pr-3 py-2 border-2 border-black bg-editorial-bg dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
                {...register("name", {
                  required:
                    activeMode === "register" ? "Full name is required" : false,
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-editorial-text dark:text-white block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="email"
              placeholder="emperor@rome.com"
              className="w-full pl-9 pr-3 py-2 border-2 border-black bg-editorial-card dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-dark-text focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Invalid email address",
                },
              })}
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {activeMode === "register" && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-editorial-text dark:text-white block">
              Photo URL
            </label>
            <div className="relative">
              <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-9 pr-3 py-2 border-2 border-black bg-editorial-card dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
                {...register("photoURL")}
              />
            </div>
          </div>
        )}

        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-editorial-text dark:text-white block">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 border-2 border-black bg-editorial-card dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-editorial-text dark:text-editorial-dark-text focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              {...register("password", {
                required: "Password is required",
                validate:
                  activeMode === "register"
                    ? {
                        minLength: (v) =>
                          v.length >= 6 || "Minimum 6 characters",
                        uppercase: (v) =>
                          /[A-Z]/.test(v) || "Must contain an uppercase letter",
                        lowercase: (v) =>
                          /[a-z]/.test(v) || "Must contain a lowercase letter",
                      }
                    : undefined,
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
          {activeMode === "register" && (
            <div className="bg-editorial-card dark:bg-neutral-900 p-3 rounded-none text-[10px] text-neutral-500 space-y-1 border border-black/30 mt-1">
              <p className="font-bold text-editorial-text dark:text-white uppercase tracking-wider">
                Security Requirements:
              </p>
              {[
                {
                  ok: password.length >= 6,
                  label: "At least 6 characters long",
                },
                {
                  ok: /[A-Z]/.test(password),
                  label: "Includes an UPPERCASE letter",
                },
                {
                  ok: /[a-z]/.test(password),
                  label: "Includes a lowercase letter",
                },
              ].map(({ ok, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 font-bold uppercase tracking-wider"
                >
                  <span
                    className={`font-mono text-xs ${ok ? "text-emerald-600" : "text-neutral-400"}`}
                  >
                    {ok ? "[✓]" : "[•]"}
                  </span>
                  <span>{label}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading || isSubmitting
            ? "Authenticating..."
            : activeMode === "login"
              ? "Access Dashboard"
              : "Create Account"}
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="relative text-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-black dark:border-white/20" />
        </div>
        <span className="relative bg-editorial-bg dark:bg-editorial-dark-card px-3 text-[9px] text-neutral-400 uppercase tracking-widest font-black">
          Verify Identity Gateway
        </span>
      </div>

      <button
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="currentColor"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="currentColor"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"
            fill="currentColor"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="currentColor"
          />
        </svg>
        Authenticate via Google
      </button>

      {/* Demo portals */}
      <div className="bg-editorial-card dark:bg-neutral-900/50 p-4 border-2 border-dashed border-black/40 dark:border-white/40 rounded-none">
        <p className="font-black text-black dark:text-white flex items-center gap-1 mb-2 uppercase tracking-widest text-[10px]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Instant Evaluator Portals (1-click)
        </p>
        <p className="text-[10px] text-neutral-500 mb-3 leading-relaxed font-serif italic">
          Select any preset keyholder block to mount a test session:
        </p>
        <div className="space-y-2">
          {DEMO_ACCOUNTS.map((acc) => (
            <div
              key={acc.email}
              onClick={() => handleDemoLogin(acc)}
              className="p-2.5 rounded-none bg-white dark:bg-neutral-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border border-black dark:border-white flex items-center justify-between cursor-pointer group transition-all text-[11px]"
            >
              <div className="text-left font-mono">
                <span className="font-serif font-bold text-black dark:text-white group-hover:text-white dark:group-hover:text-black block">
                  {acc.name}
                </span>
                <span className="text-[10px] text-neutral-400 block truncate max-w-42.5 font-sans group-hover:text-neutral-300 dark:group-hover:text-neutral-700">
                  {acc.email}
                </span>
              </div>
              <span className="px-2 py-0.5 border border-black dark:border-white bg-black text-white group-hover:bg-white group-hover:text-black dark:bg-white dark:text-black dark:group-hover:bg-black dark:group-hover:text-white text-[9px] uppercase font-black tracking-widest">
                {acc.role}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Demo data controls */}
      <div className="bg-editorial-card dark:bg-neutral-900/30 p-4 border-2 border-dashed border-black/20 dark:border-white/20 rounded-none">
        <p className="font-black text-black dark:text-white flex items-center gap-1 mb-3 uppercase tracking-widest text-[10px]">
          <Database className="w-4 h-4 text-blue-500" />
          Demo Data Controls
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleSeed}
            disabled={seedStatus === "loading"}
            className="flex-1 py-2 border-2 border-black dark:border-white text-[10px] font-black uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            <Database className="w-3 h-3" />
            Seed Data
          </button>
          <button
            onClick={handleReset}
            disabled={seedStatus === "loading"}
            className="flex-1 py-2 border-2 border-rose-500 text-[10px] font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 hover:bg-rose-600 hover:text-white hover:border-rose-600 transition-colors disabled:opacity-40 flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-3 h-3" />
            Reset DB
          </button>
        </div>
        {seedStatus === "loading" && (
          <p className="text-[10px] text-neutral-400 mt-2 font-mono">
            Processing...
          </p>
        )}
        {seedStatus === "success" && (
          <p className="text-[10px] text-emerald-600 mt-2 font-mono">
            [✓] Done
          </p>
        )}
        {seedStatus === "error" && (
          <p className="text-[10px] text-red-500 mt-2 font-mono">
            [✗] Failed — are you signed in as admin?
          </p>
        )}
      </div>
    </div>
  );
};

const LoginPage = () => (
  <Suspense>
    <LoginPageContent />
  </Suspense>
);

export default LoginPage;
