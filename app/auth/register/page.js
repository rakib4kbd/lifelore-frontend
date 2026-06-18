"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Lock, UserIcon, Sparkles, Mail } from "lucide-react";
import { ShieldCheck } from "lucide-react";
import { Camera } from "lucide-react";
import { authClient, signIn, signUp } from "@/lib/auth-client";

const LoginPage = () => {
  const demoAccounts = [
    {
      name: "Global Admin",
      email: "admin@gmail.com",
      pass: "Admin123!",
      role: "ADMIN CONSOL ⭐",
    },
    {
      name: "Premium Member",
      email: "premium@gmail.com",
      pass: "Premium123!",
      role: "PREMIUM MEMBER ⭐",
    },
    {
      name: "Free Tier Blogger",
      email: "free@gmail.com",
      pass: "Free123!",
      role: "FREE BLOGGER",
    },
  ];

  const handleDemoLogin = async (acc) => {
    setLoading(true);
    try {
      const { data, error } = await signIn.email({
        email: acc.email,
        password: acc.pass,
      });

      // if (data.user.role === "admin") {
      //   navigateTo("admin-dashboard");
      // } else {
      //   navigateTo("dashboard");
      // }
    } catch (e) {
      showToast(e.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const [mode, setMode] = useState("register");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      photoURL: "",
    },
  });

  const password = watch("password", "");

  const onSubmit = async (formData) => {
    setLoading(true);

    console.log("Form Data:", formData);
    const { name, email, password, photoURL } = formData;

    if (mode === "login") {
      // login logic
      // await signIn(data.email, data.password)
      const { data, error } = await signIn.email({
        email: email,
        password: password,
      });
      if (error) {
        console.error(error);
      }
    } else {
      const { data, error } = await signUp.email({
        name: name,
        email: email,
        password: password,
        image: photoURL,
        // callbackURL: "/dashboard",
      });
      if (error) {
        console.error(error);
      }
    }

    setLoading(false);
  };

  const handleGoogleLogin = () => {
    signIn.social({
      provider: "google",
      // callbackURL: callbackUrl,
    });
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 sm:p-8 bg-white dark:bg-[#121212] border-2 border-black dark:border-white rounded-none shadow-none space-y-6 text-left">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-black text-white dark:bg-white dark:text-black flex items-center justify-center mx-auto border-2 border-black">
          <Sparkles className="w-5 h-5" />
        </div>

        <h2 className="text-2xl font-serif font-black text-black dark:text-white tracking-tight uppercase">
          {mode === "login" ? "Accredit Your Wisdom" : "Assemble Your Ledger"}
        </h2>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-neutral-100 dark:bg-neutral-900 border-2 border-black rounded-none">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
            mode === "login"
              ? "bg-black text-white dark:bg-white dark:text-black shadow-none border border-black"
              : "text-neutral-500 hover:text-black dark:hover:text-white"
          }`}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 py-2 text-center text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer rounded-none ${
            mode === "register"
              ? "bg-black text-white dark:bg-white dark:text-black shadow-none border border-black"
              : "text-neutral-500 hover:text-black dark:hover:text-white"
          }`}
        >
          Register
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {mode === "register" && (
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] dark:text-white block">
              Full Name
            </label>

            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

              <input
                type="text"
                placeholder="Marcus Aurelius"
                className="w-full pl-9 pr-3 py-2 border-2 border-black bg-[#FAF9F6] dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
                {...register("name", {
                  required:
                    mode === "register" ? "Full name is required" : false,
                })}
              />
            </div>

            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>
        )}

        {/* Email */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] dark:text-white block">
            Email Address
          </label>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

            <input
              type="email"
              placeholder="emperor@rome.com"
              className="w-full pl-9 pr-3 py-2 border-2 border-black bg-[#FAF9F6] dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
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

        {/* Photo URL */}
        {mode === "register" && (
          <div className="relative">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] dark:text-white block">
              Photo URL
            </label>
            <div className="relative">
              <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                className="w-full pl-9 pr-3 py-2 border-2 border-black bg-[#FAF9F6] dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
                {...register("photoURL")}
              />
            </div>
          </div>
        )}

        {/* Password */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-[#121212] dark:text-white block">
            Password
          </label>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />

            <input
              type="password"
              placeholder="••••••••"
              className="w-full pl-9 pr-3 py-2 border-2 border-black bg-[#FAF9F6] dark:bg-neutral-900 text-xs font-bold uppercase tracking-wider text-black dark:text-white focus:outline-none focus:border-black rounded-none placeholder:text-neutral-400"
              {...register("password", {
                required: "Password is required",

                validate:
                  mode === "register"
                    ? {
                        minLength: (value) =>
                          value.length >= 6 || "Minimum 6 characters",

                        uppercase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Must contain an uppercase letter",

                        lowercase: (value) =>
                          /[a-z]/.test(value) ||
                          "Must contain a lowercase letter",
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

          {mode === "register" && (
            <div className="bg-[#F9F7F2] dark:bg-neutral-900 p-3 rounded-none text-[10px] text-neutral-500 space-y-1 border border-black/30">
              <p className="font-bold text-[#121212] dark:text-white uppercase tracking-wider">
                Security Requirements:
              </p>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <span
                  className={`font-mono text-xs ${password.length >= 6 ? "text-emerald-600" : "text-neutral-400"}`}
                >
                  {password.length >= 6 ? "[✓]" : "[•]"}
                </span>
                <span>At least 6 characters long</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <span
                  className={`font-mono text-xs ${/[A-Z]/.test(password) ? "text-emerald-600" : "text-neutral-400"}`}
                >
                  {/[A-Z]/.test(password) ? "[✓]" : "[•]"}
                </span>
                <span>Includes an UPPERCASE letter</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider">
                <span
                  className={`font-mono text-xs ${/[a-z]/.test(password) ? "text-emerald-600" : "text-neutral-400"}`}
                >
                  {/[a-z]/.test(password) ? "[✓]" : "[•]"}
                </span>
                <span>Includes a lowercase letter</span>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || isSubmitting}
          className="w-full py-3 border-2 border-black dark:border-white bg-black hover:bg-white text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-xs font-black uppercase tracking-widest rounded-none transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading || isSubmitting
            ? "Authenticating..."
            : mode === "login"
              ? "Access Dashboard"
              : "Create Account"}

          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      {/* HORIZONTAL SEPARATOR */}
      <div className="relative text-center my-4">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t-2 border-black dark:border-white/20" />
        </div>
        <span className="relative bg-white dark:bg-[#121212] px-3 text-[9px] text-neutral-400 uppercase tracking-widest font-black">
          Verify Identity Gateway
        </span>
      </div>

      {/* FEDERATED SIGN-IN BUTTON */}
      <button
        onClick={() => {
          handleGoogleLogin();
        }}
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
            strokeLinecap="round"
          />
        </svg>
        Authenticate via Google
      </button>

      {/* Preset Admin/Demo Portals (Save time for grading) */}
      <div className="bg-[#F9F7F2] dark:bg-neutral-900/50 p-4 border-2 border-dashed border-black/40 dark:border-white/40 text-xs rounded-none">
        <p className="font-black text-black dark:text-white flex items-center gap-1 mb-2 uppercase tracking-widest text-[10px]">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          Instant Evaluator Portals (1-click)
        </p>
        <p className="text-[10px] text-neutral-500 mb-3 leading-relaxed font-serif italic">
          Bypass registry and authentication directly. Select any preset
          keyholder block to mount test sessions:
        </p>

        <div className="space-y-2">
          {demoAccounts.map((acc) => (
            <div
              key={acc.email}
              onClick={() => {
                handleDemoLogin(acc);
              }}
              className="p-2.5 rounded-none bg-white dark:bg-[#121212] hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border border-black flex items-center justify-between cursor-pointer group transition-all text-[11px]"
            >
              <div className="text-left font-mono">
                <span className="font-serif font-bold text-black border-b border-black/20 group-hover:border-white dark:text-white block">
                  {acc.name}
                </span>
                <span className="text-[10px] text-neutral-400 block truncate max-w-[170px] font-sans group-hover:text-neutral-300">
                  {acc.email}
                </span>
              </div>

              <div className="text-right">
                <span className="px-2 py-0.5 border border-black bg-black text-white group-hover:bg-white group-hover:text-black dark:bg-white dark:text-black dark:group-hover:bg-black dark:group-hover:text-white text-[9px] uppercase font-black tracking-widest">
                  {acc.role}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
