import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import CallToActionSection from "@/components/CallToActionSection";
import PackagesSection from "@/components/PackagesSection";
import ReservationFormSection from "@/components/ReservationFormSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ReservationFormSection />
      <FeaturesSection />
      <PackagesSection />
      <CallToActionSection />
      <Footer />
    </div>
  );
}
