"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="container max-w-screen-xl mx-auto px-4 py-20">
      <Card className="relative overflow-hidden bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/10 dark:to-primary/5 border border-primary/30">
        {/* Decorative SVG */}
        <svg
          className="absolute right-[-200px] top-[90px] h-[300px] w-[500px] opacity-10 md:block hidden"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="100" cy="100" r="100" fill="#6366F1" />
        </svg>

        <CardContent className="relative z-10 flex flex-col md:items-start items-center justify-between p-6 md:p-8 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground font-mono tracking-tight [word-spacing:0.02rem]">
              Ready to elevate your content strategy?
            </h2>
            <p className="mt-3 text-muted-foreground md:max-w-md">
              Start using{" "}
              <span className="text-primary font-medium">Resonatr</span> today
              and take full control of your growth journey.
            </p>
          </div>

          <Button>
            <Link href={"/register"}>Get Started</Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
