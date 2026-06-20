"use client";
import { ChevronLeft } from "lucide-react";
import { Sparkles } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      title: "Preserve Your Hard-Won Wisdom",
      subtitle:
        "Every mistake is a template. Every triumph is a roadmap. Store your deepest personal realizations and growth moments in a custom digital journal built to span generations.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800",
      accent:
        "bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 border-indigo-200/50",
      cta: "Record Your First Lesson",
      navigation: "/dashboard/add-lesson",
    },
    {
      title: "Learn Mutual Ethics from the Crowd",
      subtitle:
        "Wisdom shouldn't be learned the hard way twice. Access our collaborative public archives of relationships, mindset shifts, and work rules, completely categorized by emotional resonance.",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
      accent:
        "bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 border-emerald-200/50",
      cta: "Explore Public Archives",
      navigation: "/lessons",
    },
    {
      title: "Unlock Advanced Mental Models",
      subtitle:
        "Upgrade to premium to access deeply analytical journals written by veteran mentors, or record confidential private insights complete with unlimited emotional tones.",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      accent:
        "bg-amber-600/10 text-amber-600 dark:text-amber-400 border-amber-200/50",
      cta: "See Pricing Schemes",
      navigation: "/pricing",
    },
  ];

  useEffect(() => {
    // Slider auto rotation
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#121212] p-8 sm:p-12 border-2 border-black dark:border-white/50 rounded-none shadow-none">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
        {/* Slide Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-black uppercase tracking-widest bg-black text-white dark:bg-white dark:text-black border border-black dark:border-white w-max">
            <Sparkles className="w-3 h-3" />
            DIGITAL COGNITION JOURNAL
          </div>

          <motion.h1
            key={currentSlide + "title"}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-7xl font-serif text-black dark:text-white leading-[0.9] tracking-tight mb-4"
          >
            {slides[currentSlide].title}
          </motion.h1>

          <motion.p
            key={currentSlide + "sub"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-700 dark:text-neutral-300 text-base sm:text-lg font-serif italic max-w-xl leading-relaxed"
          >
            &quot;{slides[currentSlide].subtitle}&quot;
          </motion.p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href={slides[currentSlide].navigation}
              className="px-6 py-3 border-2 border-black dark:border-white bg-black hover:bg-transparent text-white hover:text-black dark:bg-white dark:hover:bg-transparent dark:text-black dark:hover:text-white text-[11px] uppercase tracking-widest font-black transition-colors flex items-center gap-2 cursor-pointer rounded-none"
            >
              {slides[currentSlide].cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/lessons"
              className="px-5 py-3 border-2 border-neutral-300 dark:border-neutral-700 hover:border-black dark:hover:border-white bg-transparent text-neutral-800 dark:text-neutral-200 text-[11px] uppercase tracking-widest font-bold transition-colors cursor-pointer rounded-none"
            >
              Inspect Public Library
            </Link>
          </div>
        </div>

        {/* Slide Image Mockup */}
        <div className="lg:col-span-5 relative h-64 sm:h-80 md:h-[350px] rounded-none overflow-hidden border-2 border-black dark:border-white">
          <motion.img
            key={currentSlide + "img"}
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            src={slides[currentSlide].image}
            alt="Slide illustration"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-black/10 dark:bg-[#000000]/20 blend-overlay" />

          {/* Quick tag overlays */}
          <div className="absolute bottom-4 left-4 right-4 p-4 rounded-none bg-[#FAF9F6] dark:bg-[#181816] border border-black dark:border-white text-black dark:text-white">
            <p className="text-[9px] font-mono tracking-widest text-neutral-550 dark:text-neutral-400 uppercase">
              wisdom archive capsule
            </p>
            <p className="text-sm font-serif font-bold italic mt-0.5 truncate">
              {slides[currentSlide].title}
            </p>
          </div>
        </div>
      </div>

      {/* Carousel Indicators / Nav */}
      <div className="absolute bottom-4 right-6 sm:right-12 z-20 flex items-center gap-2">
        <button
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length,
            )
          }
          className="p-1.5 rounded-none bg-[#FAF9F6] dark:bg-[#181816] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white shrink-0 border border-black dark:border-white transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div className="flex gap-1.5 px-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 transition-all border border-black dark:border-white rounded-none ${
                currentSlide === idx
                  ? "w-6 bg-black dark:bg-white"
                  : "w-2 bg-transparent"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="p-1.5 rounded-none bg-[#FAF9F6] dark:bg-[#181816] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black text-black dark:text-white shrink-0 border border-black dark:border-white transition-colors cursor-pointer"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

export default Slider;
