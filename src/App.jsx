import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import SpotlightSection from "./components/SpotlightSection";
import Services from "./components/Services";
import Gallery from "./components/Gallery";
import Schedule from "./components/Schedule";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <SpotlightSection />
        <Services />
        <Gallery />
        <Schedule />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
