import Link from "next/link";

const menuLinks = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "/features" },
      { label: "Pricing", href: "/pricing" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="border-t border-border bg-background text-muted-foreground py-10">
      <div className="container max-w-screen-xl mx-auto px-4 flex flex-col gap-8 md:flex-row md:justify-between">
        {/* Left Side */}
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-foreground">Resonatr</h2>
          <p className="max-w-sm text-sm">
            Analyze, organize, and optimize your content strategy across all
            your platforms.
          </p>
        </div>

        {/* Right Side (Links) */}
        <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-3">
          {menuLinks.map((section) => (
            <div key={section.title}>
              <h3 className="mb-2 font-medium text-foreground">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="hover:underline font-medium"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} Resonatr. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
