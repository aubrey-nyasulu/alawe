import ContactSection from "./sections/ContactSection";
import FeaturedProductsSection from "./sections/FeaturedProductsSection";
import BulkDiscounts from "./sections/BulkDiscounts";
import AboutUsSection from "./sections/AboutUsSection";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";
import WhyUsSection from "./sections/WhyUsSection";
import Hero from "./components/Hero";

export default function LandingPage() {
    return (
        <>
            <Hero />
            <FeaturedProductsSection />
            <BulkDiscounts />
            <WhyUsSection />
            <AboutUsSection />
            {/* <SectionTwo />
            <SectionThree />
            <ContactSection /> */}
        </>
    )
}
