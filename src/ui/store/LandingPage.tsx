import ContactSection from "./sections/ContactSection";
import FeaturedProductsSection from "./sections/FeaturedProductsSection";
import SectionFour from "./sections/SectionFour";
import SectionOne from "./sections/SectionOne";
import SectionThree from "./sections/SectionThree";
import SectionTwo from "./sections/SectionTwo";

export default function LandingPage() {
    return (
        <>
            <FeaturedProductsSection />
            <SectionOne />
            <SectionTwo />
            <SectionThree />
            <SectionFour />
            <ContactSection />
        </>
    )
}
