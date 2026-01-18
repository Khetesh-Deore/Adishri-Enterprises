// HomePage - Landing page with Hero section
import { HeroSlider, ProductCollection, IndustriesServed, ClientLogos, CoreValues } from "../views/components";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      {/* <StatsCounter /> */}
      <ProductCollection />
      <IndustriesServed />
      <ClientLogos />
      {/* <NewsSection /> */}
      <CoreValues />
    </>
  );
}
