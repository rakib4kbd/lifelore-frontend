import FeaturedLifeLessons from "@/components/Home/FeatureLifeLessonsSection/FeaturedLifeLessons";
import MostSavedLessonSection from "@/components/Home/MostSavedLessonSection/MostSavedLessonSection";
import Slider from "@/components/Home/SliderSection/Slider";
import WhyChooseLifelore from "@/components/Home/WhyChooseLifeloreSection/WhyChooseLifelore";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const { user } =
    (await auth.api.getSession({ headers: await headers() })) || {};
  return (
    <div className="flex flex-col mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 my-10 space-y-16 pb-16">
      <Slider />
      <WhyChooseLifelore />
      <FeaturedLifeLessons user={user} />
      <MostSavedLessonSection />
    </div>
  );
}
