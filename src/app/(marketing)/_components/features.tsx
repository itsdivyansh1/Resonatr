import FeaturesGrid from "@/components/features-grid";

const FeatureSection = () => {
  return (
    <section className="px-4 py-20 max-w-screen-xl mx-auto">
      <h2 className="text-center text-3xl font-bold mb-10 text-foreground">
        Powerful Features
      </h2>
      <FeaturesGrid />
    </section>
  );
};

export default FeatureSection;
