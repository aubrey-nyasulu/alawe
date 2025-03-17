import FeaturedProductsSection from "./sections/FeaturedProductsSection"
import AboutUsSection from "./sections/AboutUsSection"
import BulkDiscounts from "./sections/BulkDiscounts"
import WhyUsSection from "./sections/WhyUsSection"
import HeroSection from "./sections/HeroSection"

export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <FeaturedProductsSection />
            <BulkDiscounts />
            <WhyUsSection />
            <AboutUsSection />
        </>
    )
}
