import { Button } from "@/components/ui/button";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { FlickeringGrid } from "@/components/ui/flickering-grid";

const HeroSection = async () => {
  return (
    <section className="py-20 sm:py-24 relative w-full h-[calc(100vh-64px)]">
      <FlickeringGrid
        className="absolute inset-0 -z-1 -top-1/5 md:-top-1/6 [mask-image:radial-gradient(240px_circle_at_center,white,transparent)] md:[mask-image:radial-gradient(550px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.4}
        flickerChance={0.1}
      />
      <div className="container mx-auto px-4 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* Brand Name */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans ">
            <PointerHighlight
              rectangleClassName="bg-primary/20 dark:bg-primary/20 border border-primary/40 dark:border-primary/40 px-2 py-1 rounded-md"
              pointerClassName="text-primary h-3 w-3"
              containerClassName="inline-block mx-1"
            >
              <span className="relative z-10">Resonatr</span>
            </PointerHighlight>
          </h1>

          {/* Tagline */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight font-mono">
            <span className="md:whitespace-nowrap">
              Create Smarter. <span className="inline-block">Grow Faster.</span>
            </span>
          </h2>

          {/* Subtext */}
          <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Unify your content strategy. Get insights that grow your audience —
            all in one place.
          </p>

          {/* CTA Button */}
          <Button asChild size="lg" className="mt-4 sm:mt-6 group">
            <Link href="/register">
              Get started
              <ArrowRightIcon
                className="ms-2 transition-transform duration-200 group-hover:translate-x-1"
                size={18}
                aria-hidden="true"
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
