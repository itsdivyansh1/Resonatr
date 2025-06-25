import FeaturesGrid from "@/components/features-grid";

const FeatureSection = () => {
  return (
    <section className="container px-4 mt-4 md:mt-16 max-w-screen-xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-10 text-foreground font-mono">
        Powerful Features
      </h2>
      <FeaturesGrid />
    </section>
  );
};

export default FeatureSection;
