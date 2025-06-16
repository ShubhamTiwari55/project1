import HeroSection from './Components/HeroSection';
import FeaturesSection from './Components/FeaturesSection';
import HowItWorks from './Components/HowItWorks';
import CTASection from './Components/CTASection';
import Footer from './Components/Footer';
import Navbar from './Components/Navbar';

export default function Home() {
  return (
    <div className="scroll-smooth">
      <Navbar/>
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <CTASection />
      <Footer />
    </div>
  );
}
