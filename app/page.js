import { Herosection } from "@/components/HeroSection";
import { Stat } from "@/components/StatSection";
import Featuredarticles from "@/components/Featuredarticles";
export default function Home(){
  return(

    <div>
      <Herosection/>
      <Stat/>
      <Featuredarticles/>
    </div>

  );
}