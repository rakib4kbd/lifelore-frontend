import Slider from "@/components/Home/SliderSection/Slider";
import WhyChooseLifelore from "@/components/Home/WhyChooseLifeloreSection/WhyChooseLifelore";

export default function Home() {
  return (
    <div className="flex flex-col mx-auto max-w-7xl my-10">
      <Slider />
      <WhyChooseLifelore />
    </div>
  );
}
