"use client";

import Link from "next/link";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenuLink
      asChild
      className={cn(
        "py-1.5 font-medium",
        isActive && "md:border-b-2 md:border-primary md:bg-secondary"
      )}
    >
      <Link href={href}>{label}</Link>
    </NavigationMenuLink>
  );
};

export default NavLink;
