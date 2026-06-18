"use client";
import { Compass } from "lucide-react";
import { Bookmark } from "lucide-react";
import { Users } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import { motion } from "motion/react";
import React from "react";

const WhyChooseLifelore = () => {
  // Benefit card declarations
  const benefits = [
    {
      id: 1,
      title: "Preserve Wisdom",
      desc: "Prevent personal insights and hard-won reflections from dissolving into temporary memory loss.",
      icon: <BrainCircuit className="w-6 h-6 text-indigo-500" />,
    },
    {
      id: 2,
      title: "Curated Categorization",
      desc: "Sort your logs by distinct emotional states (e.g. Gratitude, Sadness) so they align with your mood in real-time.",
      icon: <Compass className="w-6 h-6 text-emerald-500" />,
    },
    {
      id: 3,
      title: "Crowdsourced Mentor Pool",
      desc: "Unlock lessons published by global philosophers, teachers, and veteran builders to bypass severe common mistakes.",
      icon: <Users className="w-6 h-6 text-sky-500" />,
    },
    {
      id: 4,
      title: "Confidentiality Guards",
      desc: "Keep records completely public to enlighten others, or standard private so only your account can see.",
      icon: <Bookmark className="w-6 h-6 text-amber-500" />,
    },
  ];
  return (
    <>
      {/* 2. WHY LEARNING FROM LIFE MATTERS (STATIC ANIMATED BENEFITS) */}
      <section className="space-y-8 my-20">
        <div className="text-left border-b-2 border-black dark:border-white/50 pb-4 max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white font-serif">
            The Philosophy of Preserved Wisdom
          </h2>
          <p className="text-neutral-650 dark:text-neutral-300 text-sm mt-2 leading-relaxed">
            We spend years committing costly mistakes and refining our actions,
            just to forget them as details fade. Lifelore safeguards experience
            from memory decay.
          </p>
        </div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-none bg-[#F9F7F2] dark:bg-[#181816] border-2 border-black dark:border-white/70 shadow-none transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 flex items-center justify-start text-black dark:text-white">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-bold text-black dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

export default WhyChooseLifelore;
