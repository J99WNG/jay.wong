import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Collaborations from "@/components/sections/Collaborations";
import Work from "@/components/sections/Work";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
        <Hero />
        <About />
        <Collaborations />
        <Work />
        <Contact />
    </main>
  );
}
